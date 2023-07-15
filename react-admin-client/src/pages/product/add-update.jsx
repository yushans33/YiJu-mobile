import React, { Component } from 'react'
import { Card, Button, Form, Input, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { customHistory } from '../../utils/history'
import { reqCategorys, reqAddOrupdateProduct } from '../../api/index'
import PictureWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
/* product的添加更新组件 */
const { Item } = Form
const { TextArea } = Input
export default class ProductAddUpdate extends Component {
    state = {
        options: []
    }
    formRef = React.createRef()
    imgsRef = React.createRef()
    detailRef = React.createRef()
    //自定义验证价格
    validatePrice = (rule, value) => {
        if (value * 1 < 0) { //验证不通过
            return Promise.resolve(new Error('价格必须大于0'))
        } else { //验证通过
            return Promise.resolve()
        }
    }
    //表单验证提交
    submit = async () => {
        // 进行表单验证, 如果通过了, 才发送请求
        try {
            const values = await this.formRef.current.validateFields()
            //1.收集数据，封装product对象
            const { name, desc, price, categoryIds } = values
            let pCategoryId, categoryId
            if (categoryIds.length === 1) {
                pCategoryId = '0'
                categoryId = categoryIds[0]
            } else {
                pCategoryId = categoryIds[0]
                categoryId = categoryIds[1]
            }
            const imgs = this.imgsRef.current.getImgs()
            const detail = this.detailRef.current.getDetail()
            const product = { name, desc, price, pCategoryId, categoryId, imgs, detail }
            //如果是更新向product对象添加_id
            if (this.isUpdate) {
                product._id = this.product._id
            }
            //2.发送请求添加/更新数据
            const result = await reqAddOrupdateProduct(product)
            // 3. 根据结果提示
            if (result.status === 0) {
                message.success(`${this.isUpdate ? '更新' : '添加'}商品成功！`)
                customHistory.back()
            } else {
                message.error(`${this.isUpdate ? '更新' : '添加'}商品失败！`)
            }
        } catch (err) {
            console.log(err)
        }

    }
    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map((c) => (
            {
                value: c._id,
                label: c.name,
                isLeaf: false,//默认都有子叶子
            }
        ))

        //修改商品的话初始就要显示二级商品列表，不然只显示一级分类商品
        const { isUpdate, product } = this
        const { pCategoryId } = product
        if (isUpdate && pCategoryId !== '0') {
            const subCategorys = await this.getCategorys(pCategoryId)
            const childOptions = subCategorys.map((c) => (
                {
                    value: c._id,
                    label: c.name,
                    isLeaf: true,//默认是子叶
                }
            ))
            //将二级列表关联到相对应的一级分类商品
            const targetOption = options.find(option => option.value === pCategoryId)
            targetOption.children = childOptions
        }


        //更新options
        this.setState({ options })
    }
    //异步获取一级/二级分类列表, 并显示 
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        // console.log(result)
        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') { //得到一级列表 
                this.initOptions(categorys)
            } else {//获得二级列表
                return categorys
            }

        }
    }
    componentDidMount() {
        this.getCategorys('0')
    }
    componentWillMount() {
        //点击修改也会跳转到此页面,会传过来一个对应的product
        const product = customHistory.location.state
        //将传过来的值转换为标识，没有值则为false显示的添加商品
        this.isUpdate = !!product
        //点击修改页面会显示商品信息，点击添加商品则不显示
        this.product = product || {}
    }
    /*
 用点击一级分类商品去加载下一级列表的回调函数
  */
    loadData = async (selectedOptions) => {
        // 得到选择的option对象
        const targetOption = selectedOptions[0];
        // load options lazily
        // 根据选中的分类, 请求获取二级分类列表
        const subcategorys = await this.getCategorys(targetOption.value)
        if (subcategorys && subcategorys.length > 0) { //是二级列表
            const childOptions = subcategorys.map(c => (
                {
                    value: c._id,
                    label: c.name,
                    isLeaf: true,//二级列表默认是叶子
                }
            ))
            //将二级options关联到当前options
            targetOption.children = childOptions
        } else {
            targetOption.isLeaf = true
        }
        //更新列表
        this.setState({ options: [...this.state.options] })
    }
    render() {
        const { options } = this.state
        const { isUpdate, product } = this
        const { pCategoryId, categoryId, imgs, detail } = product
        const categoryIds = []
        if (isUpdate) {
            if (pCategoryId === '0') {//商品是一级分类商品
                categoryIds.push(categoryId)
            } else {//商品 是二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }


        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined style={{ fontSize: 20 }}
                        onClick={() => customHistory.back()}
                    />
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )
        //指定Item布局的配置对象
        const formItemLayout = {

            wrapperCol: { span: 12, },//指定右侧包裹的宽度
        };
        return (

            < Card title={title}>
                <Form  {...formItemLayout}
                    ref={this.formRef} //定义form
                >
                    <Item label="商品名称"
                        name='name'
                        initialValue={product.name}
                        rules={[
                            { required: true, message: '商品名称必须输入' }
                        ]}
                    >
                        <Input placeholder='请输入商品名称' />
                    </Item>
                    <Item label="商品描述"
                        name='desc'
                        initialValue={product.desc}
                        rules={[
                            { required: true, message: '商品描述必须输入' }
                        ]}>
                        <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Item>
                    <Item label="商品价格"
                        name='price'
                        initialValue={product.price}
                        rules={[
                            { required: true, message: '商品价格必须输入' },
                            { validator: this.validatePrice }
                        ]}>
                        <Input placeholder='请输入商品价格' addonAfter="元" />
                    </Item>
                    <Item label="商品分类"
                        name='categoryIds'
                        initialValue={categoryIds}
                        rules={[
                            { required: true, message: '商品名称必须输入' },
                        ]}
                    >
                        <Cascader options={options} loadData={this.loadData} />
                    </Item>
                    <Item label="商品图片">
                        <PictureWall ref={this.imgsRef} imgs={imgs} />
                    </Item>
                    <Item label="商品详情" wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={this.detailRef} detail={detail} />
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */