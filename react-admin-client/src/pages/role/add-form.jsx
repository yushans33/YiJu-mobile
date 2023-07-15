import React, { Component } from 'react'
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'
/* 添加角色表单 */
export default class AddForm extends Component {
    formRef = React.createRef()
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }
    // updateParentId = () => {
    //     setTimeout(() => { // 不然会取不到this.formRef.current的值报错
    //         // 防止出先下一次弹窗的输入框的值还是上次的,异步动态更新状态
    //         this.formRef.current.setFieldsValue({
    //             parentId: this.props.parentId

    //         })


    //     })
    // }
    componentWillMount() {
        //将form对象通过setForm函数传递给父组件
        this.props.setForm(this.formRef)
    }
    // componentWillUpdate() {
    //     //parentId一更新重新render
    //     this.updateParentId()
    // }
    render() {


        return (
            <Form
                ref={this.formRef}
            >
                <Form.Item name='roleName'
                    label='角色名称'
                    initialValue=''
                    rules={[
                        { required: true, message: '角色名称必须输入' }
                    ]}
                >
                    <Input placeholder='请输入角色名称' />
                </Form.Item>
            </Form>
        )
    }
}
