import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd';
import PropTypes from 'prop-types'
import { items } from '../../config/menuConfig'
const { Item } = Form
const { TreeNode } = Tree
/* 更新角色权限 */
export default class AuthForm extends Component {
    static propTypes = {
        role: PropTypes.object
    }

    constructor(props) {
        super(props)
        // 根据传入角色的menus生成初始状态
        const { menus } = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }
    getMenus = () => this.state.checkedKeys
    // getTreeNodes = (items) => {
    //     return items.reduce((pre, item) => {
    //         if (!item.children) {
    //             pre.push(
    //                 {
    //                     title: item.label,
    //                     key: item.key,
    //                 }
    //             )
    //         } else {

    //             pre.push(
    //                 {
    //                     title: item.label,
    //                     key: item.key,
    //                     children: [this.getTreeNodes(item.children)]
    //                 }
    //             )

    //         }

    //         return pre
    //     }, [])

    // }
    getTreeNodes = (items) => {
        return items.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.label} key={item.key} >
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }
    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    componentWillMount() {
        //获得树节点
        // const treeNode = this.getTreeNodes(items)
        // this.treeNodes = [{
        //     title: '平台权限',
        //     key: 'all',
        //     children: treeNode
        // }]
        this.treeNodes = this.getTreeNodes(items)
    }
    //，第一次会根据传入的role更新menus,但当父组件role选择角色改变时，子组件的menus不会改变，改变menus也只有在电机checkkeys才会改变
    //因为关掉显示界面组件生命周期并没有死忙只是隐藏，所以选中其他role仅仅是将原来的显示框显示
    /* 当组件接收到新属性时自动调用，父组件重新渲染或者props改变 ，初始不会调用*/
    componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus
        this.setState({ checkedKeys: menus })
        // this.state.checkedKeys=menus 平时在事件回调函数里更新状态不能这样写
        // 这里可以写是因为 componentWillReceiveProps本来就在render之前执行，可以给定初始状态
    }

    render() {
        const { role } = this.props
        const { checkedKeys } = this.state
        // console.log(this.treeNodes)
        return (
            <Form>
                <Item label='角色名称'>
                    <Input value={role.name} />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                // treeData={this.treeNodes}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
