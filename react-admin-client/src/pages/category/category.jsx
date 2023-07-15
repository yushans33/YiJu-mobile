/* 分类管理路由 */
import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api/index'
import AddForm from './add-from'
import UpdateForm from './update-from'

export default class Category extends Component {
    state = {
        loading: false,//是否正在获取数据中
        categorys: [],//一级分类列表
        subCategorys: [],//二级分类列表
        parentId: '0', // 当前需要显示的分类列表的父分类ID
        parentName: '', // 当前需要显示的分类列表的父分类名称
        showStatus: 0//标识是否显示添加/更新分类的显示框 0：都不显示 1：显示添加 2：显示更新
    }
    /* 初始化Table的所以列的数组 */
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span >
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.getSubCategorys(category)}>查看子分类</LinkButton> : null}
                    </span>

                ),
            }
        ];
    }

    /*   异步获取一级/二级分类列表显示 */
    getGategorys = async (parentId) => {
        // 在发请求前, 显示loading
        this.setState({ loading: true })
        //传参就获取传参的一级列表，没有传参默认从state里面获取
        parentId = parentId || this.state.parentId
        // 发异步ajax请求, 获取数据
        const result = await reqCategorys(parentId)
        // 在请求完成后, 隐藏loading
        this.setState({ loading: false })
        const categorys = result.data
        if (result.status === 0) {
            if (parentId === '0') {
                this.setState({ categorys })
            } else {
                this.setState({ subCategorys: categorys })
            }

        } else {
            message.error('获取分类列表失败')
        }
    }

    getSubCategorys = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            console.log('parentId', this.state.parentId)
            this.getGategorys()
        })
        // console.log('parentId', this.state.parentId)---'0'
        // this.getGategorys()
    }
    getFirstCategorys = () => {
        //更新返回会第一类表的数据状态
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }
    /* 隐藏添加/更新分类的显示框 */
    handleCancel = () => {
        // 清除输入数据
        // this.formRef.current.resetFields()
        this.setState({ showStatus: 0 })
    }
    /* 显示添加分类显示框 */
    showAdd = () => {
        this.setState({ showStatus: 1 })
    }

    /* 添加分类 */
    addCategorys = async () => {
        // 进行表单验证, 只有通过了才处理
        try {
            const values = await this.formRef.current.validateFields()
            console.log('addCategorys')
            // 1.隐藏更新显示框
            this.setState({ showStatus: 0 })
            //2.发请求更新数据      
            // const { categoryName, parentId } = this.formRef.current.getFieldValue()
            const { categoryName, parentId } = values
            // 清除输入数据
            this.formRef.current.resetFields()
            const result = await reqAddCategory(categoryName, parentId)
            if (result.status === 0) {
                //添加的分类是当前列表下的分类
                if (parentId === this.state.parentId) {
                    //3.重新显示当前列表,在同一列表下添加需要重新显示，不然显示也看不到，浪费请求
                    //查看的话点击自然会请求显示
                    this.getGategorys()
                } else if (parentId === '0') {//在二级列表添加一级列表数据，返回到一级列表没有显示，没有发请求获取
                    //所以需要重新更新一级列表但是不需要显示
                    //这里更新了一级列表，但是state里面的parentId没有变，所以不会重新render
                    this.getGategorys('0')
                }

            }
        } catch (err) {
            message.error(err)
        }


    }

    /* 显示更新分类显示框 */
    showUpdate = (category) => {
        //保存获取点击的对象，用于显示框默认显示点击对象的分类名称
        this.category = category
        //更新状态
        this.setState({ showStatus: 2 })
    }


    /* 更新分类 */
    updateCategorys = async () => {
        try {
            const values = await this.formRef.current.validateFields()
            console.log('updateCategorys')
            // 1.隐藏更新显示框
            this.setState({ showStatus: 0 })
            //2.发请求更新数据
            const categoryId = this.category._id
            // const categoryName = this.formRef.current.getFieldValue('categoryName')
            const { categoryName } = values
            // 清除输入数据 这边不清除也可以？？？
            this.formRef.current.resetFields()
            const result = await reqUpdateCategory({ categoryId, categoryName })
            if (result.status === 0) {
                //3.重新显示列表
                this.getGategorys()
            }
        } catch (err) {
            message.error(err)
        }




    }




    /*
     为第一次render()准备数据
      */
    componentWillMount() {
        this.initColumns()
    }

    /*
    执行异步任务: 发异步ajax请求
     */
    componentDidMount() {
        this.getGategorys()
    }


    render() {
        const { categorys, parentId, parentName, subCategorys, loading, showStatus } = this.state
        const category = this.category || {}//初始渲染时没有点击修改分类，是空对象，后面传参是会报错
        const title = parentName === '' ? '一级分类列表' : (
            <span>
                < LinkButton onClick={this.getFirstCategorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ marginRight: 10 }} />
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        )
        return (

            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
                <Modal title="添加分类"
                    open={showStatus === 1}
                    onOk={this.addCategorys}
                    onCancel={this.handleCancel}>
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        parentName={parentName}
                        setForm={form => this.formRef = form}
                    />

                </Modal>
                <Modal title="更新分类"
                    open={showStatus === 2}
                    onOk={this.updateCategorys}
                    onCancel={this.handleCancel}>
                    <UpdateForm
                        categoryName={category.name}
                        key={category._id}
                        setForm={form => this.formRef = form}
                    />
                </Modal>
            </Card>

        )
    }
}
