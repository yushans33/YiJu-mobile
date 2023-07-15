/* 权限角色管理路由 */
import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/contants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api/index'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'
import { customHistory } from '../../utils/history'
export default class Role extends Component {
    authRef = React.createRef()
    state = {
        roles: [],//角色列表
        role: {},//点击获取的角色
        isShowAdd: false,//是否显示添加角色框
        isShowAuth: false//是否显示设置角色 权限框
    }


    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ]
    }
    // 获取角色列表
    getRoles = async () => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({ roles })
        }
    }
    onRow = (role) => {
        return {
            onClick: (event) => {// 点击行
                // console.log(role)
                // alert('得到role')
                this.setState({ role })
            },

        }
    }
    //添加角色
    addRole = async () => {
        //表单验证获取数据
        try {
            const values = await this.formRef.current.validateFields()
            //隐藏添加框
            this.setState({ isShowAdd: false })
            const { roleName } = values
            //清除表单内的数据
            this.formRef.current.resetFields()
            //发送添加角色请求
            const result = await reqAddRole(roleName)
            if (result.status === 0) {
                message.success('角色添加成功！')
                // this.getRoles()
                // 新产生的角色
                const role = result.data
                // 更新roles状态
                /*const roles = this.state.roles
                roles.push(role)
                this.setState({
                  roles
                })*/

                // 更新roles状态: 基于原本状态数据更新
                this.setState(state => ({
                    roles: [...state.roles, role]
                }))


            } else {
                message.error('角色添加失败！')
            }
        } catch (err) {
            message.error(err)
        }

        //更新或者显示数据
    }


    // 更新角色
    updateRole = async () => {
        //隐藏更新角色框
        this.setState({ isShowAuth: false })
        //获得角色数据
        const { role } = this.state
        //得到最新的menus
        console.log('---', this.authRef)
        const menus = this.authRef.current.getMenus()
        role.menus = menus
        role.auth_name = memoryUtils.user.username
        role.auth_time = Date.now()
        //请求更新角色
        const result = await reqUpdateRole(role)
        if (result.status === 0) {

            //更新roles列表
            // this.getRoles()
            //因为role是role是里面的元素menus改变了，role也改变，roles也可以跟着改变
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {}
                storageUtils.removeUser()
                customHistory.replace('/login')
                message.success('更新当前用户角色成功,请重新登入！')
            } else {
                message.success('更新角色成功！')
                this.setState({ roles: [...this.state.roles] })
            }

        } else {
            message.error('更新角色失败！')
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, role, isShowAdd, isShowAuth } = this.state
        const title = (
            <span>
                <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>  &nbsp;&nbsp;
                <Button type='primary' disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
            </span>
        )


        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    bordered
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => this.setState({ role })
                    }}
                    onRow={this.onRow}
                />
                <Modal title="添加角色"
                    open={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({ isShowAdd: false })
                        this.formRef.current.resetFields()
                    }
                    }>
                    <AddForm
                        setForm={form => this.formRef = form}
                    />

                </Modal>
                <Modal title="设置角色权限"
                    open={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => this.setState({ isShowAuth: false })}>
                    <AuthForm role={role} ref={this.authRef} />

                </Modal>
            </Card>
        )
    }
}
