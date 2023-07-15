import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types'
const Option = Select.Option
/* 添加分类表单 */
export default class AddForm extends Component {
    formRef = React.createRef()
    static propTypes = {
        categorys: PropTypes.array.isRequired,//一级分类列表
        parentId: PropTypes.string.isRequired,//父列表的id

    }
    updateParentId = () => {
        setTimeout(() => { // 不然会取不到this.formRef.current的值报错
            // 防止出先下一次弹窗的输入框的值还是上次的,异步动态更新状态
            this.formRef.current.setFieldsValue({
                parentId: this.props.parentId

            })


        })
    }
    componentWillMount() {
        //将form对象通过setForm函数传递给父组件
        this.props.setForm(this.formRef)
    }
    componentWillUpdate() {
        //parentId一更新重新render
        this.updateParentId()
    }
    render() {
        const { categorys, parentId } = this.props
        // console.log(parentId)
        // this.updateParentId()  每次渲染都要更新
        return (
            <Form
                ref={this.formRef}
            >
                <Form.Item name='parentId'
                    initialValue={parentId}//初始默认值
                >
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                            categorys.map(c => <Option value={c._id} >{c.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item name='categoryName'
                    initialValue=''
                    rules={[
                        { required: true, message: '分类名称必须输入' }
                    ]}
                >
                    <Input placeholder='请输入分类名称' />
                </Form.Item>
            </Form>
        )
    }
}
