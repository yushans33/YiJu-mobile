import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';
import items from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils'

/* 左侧导航组件 */

/*
判断当前登陆用户对item是否有权限
*/
export default class LeftNav extends Component {
    getMenuNodes = (items) => {
        /*
             1. 如果当前用户是admin
             2. 如果当前item是首页 公开的
             3. 当前用户有此item的权限: key有没有menus中
        */

        const username = memoryUtils.user.username
        if (username === 'jingli') {
            return items
        } else {
            return items.forEach((item, index) => {
                const { key } = item
                const menus = memoryUtils.user.role.menus
                if (key !== '首页' && menus.indexOf(key) === -1) {
                    items.splice(index, 1)
                } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
                    item.children.forEach((child, index) => {
                        if (menus.indexOf(child.key) === -1) {
                            item.children.splice(index, 1)
                        }
                    })

                }

            }

            )
        }


    }




    // componentWillMount() {
    //     this.menuNodes = this.getMenuNodes(items)

    // }

    render() {
        // console.log(window.location.pathname)
        // const { menuNodes } = this
        // console.log('menuNode', menuNodes)
        let path = window.location.pathname
        if (path.indexOf('/product') === 0) {//当前请求的是商品或者其子路由
            path = '/product'
        }
        // console.log('render', path)
        let openKey = ''
        items.map(item => {
            if (item.children) {
                // let cItem = item.children.find(cItem => cItem.key === path)
                //如果商品的子路由/product/detail刷新之后不会选中,不匹配
                let cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem) openKey = item.key
            }
            return openKey

        })
        return (
            <div className='left-nav'>
                <Link to="/" className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    /* 默认显示我请求当前路径所对应的菜单项 */

                    defaultSelectedKeys={path === '/' ? ['/home'] : [path]}
                    /* 存在的缺点是先请求根路径为localhost：3000  默认选中home菜单项
                    因为 <Route path="/" element={<Home />} />
                    获取的path先为'/'在更新为'/home',leftnav页面有更新
                    而defaultSelectedKeys默认选中一次
                    */
                    // selectedKeys={[path]}---效果不对，改用自己判断
                    //有子菜单项就展开菜单项,openKey是父菜单的key 
                    defaultOpenKeys={[openKey]}

                    mode="inline"
                    theme="dark"
                    items={items}
                />
            </div>
        )
    }
}
