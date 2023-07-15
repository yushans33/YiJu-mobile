import React, { Component } from 'react'
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'
/* 添加分类表单 */
export default class UpdateForm extends Component {
    formRef = React.createRef()
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    }

    show = () => {
        setTimeout(() => { // 不然会取不到this.formRef.current的值报错
            // 防止出先下一次弹窗的输入框的值还是上次的,异步更新状态
            this.formRef.current.setFieldsValue({
                categoryName: this.props.categoryName
            })


        })
    }

    componentWillMount() {
        //将form对象通过setForm函数传递给父组件
        this.props.setForm(this.formRef)
    }
    render() {
        const { categoryName, key } = this.props
        console.log(categoryName)
        this.show()
        return (
            <Form
                ref={this.formRef} //定义form
            >
                <Form.Item name='categoryName'
                    key={key}//必须加key不然初始默认值不改变，识别不了更新为那个表单的categoryName
                    initialValue={categoryName}
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
