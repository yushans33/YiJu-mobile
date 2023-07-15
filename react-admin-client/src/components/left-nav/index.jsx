import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';
import { menuList } from '../../config/menuConfig';
import { customHistory } from '../../utils/history';
// import memoryUtils from '../../utils/memoryUtils'
import { connect } from 'react-redux';
import { setHeadTitle } from '../../redux/actions';


const SubMenu = Menu.SubMenu;

/* 左侧导航组件 */

class LeftNav extends Component {
    /*
  判断当前登陆用户对item是否有权限
   */
    hasAuth = (item) => {
        const { key, isPublic } = item

        const menus = this.props.user.role.menus
        const username = this.props.user.username
        /*
        1. 如果当前用户是admin
        2. 如果当前item是公开的
        3. 当前用户有此item的权限: key有没有menus中
         */
        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true
        } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }

        return false
    }

    /*
  根据menu的数据数组生成对应的标签数组
  使用map() + 递归调用
  */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            /*
              {
                title: '首页', // 菜单标题名称
                key: '/home', // 对应的path
                icon: 'home', // 图标名称
                children: [], // 可能有, 也可能没有
              }
      
              <Menu.Item key="/home">
                <Link to='/home'>
                  <Icon type="pie-chart"/>
                  <span>首页</span>
                </Link>
              </Menu.Item>
      
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="mail"/>
                    <span>商品</span>
                  </span>
                }
              >
                <Menu.Item/>
                <Menu.Item/>
              </SubMenu>
            */
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                {item.icon}
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }

        })
    }

    /*
    根据menu的数据数组生成对应的标签数组
    使用reduce() + 递归调用
    */
    getMenuNodes = (menuList) => {
        // 得到当前请求的路由路径
        const path = customHistory.location.pathname

        return menuList.reduce((pre, item) => {

            // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (this.hasAuth(item)) {


                // 向pre添加<Menu.Item>
                if (!item.children) {
                    // 判断item是否是当前对应的item
                    if (item.key === path || path.indexOf(item.key) === 0) {
                        // 更新redux中的headerTitle状态
                        this.props.setHeadTitle(item.title)
                    }

                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        this.openKey = item.key
                    }


                    // 向pre添加<SubMenu>
                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    ))
                }
            }

            return pre
        }, [])
    }

    /*
 在第一次render()之前执行一次
 为第一个render()准备数据(必须同步的)
  */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }


    render() {
        // console.log(window.location.pathname)
        // const { menuNodes } = this
        // console.log('menuNode', menuNodes)
        let path = window.location.pathname
        if (path.indexOf('/product') === 0) {//当前请求的是商品或者其子路由
            path = '/product'
        }
        // console.log('render', path)
        const openKey = this.openKey

        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >

                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { setHeadTitle }
)(LeftNav)


// export default class LeftNav extends Component {
//     getMenuNodes = (items) => {
//         /*
//              1. 如果当前用户是admin
//              2. 如果当前item是首页 公开的
//              3. 当前用户有此item的权限: key有没有menus中
//         */

//         const username = memoryUtils.user.username
//         if (username === 'jingli') {
//             return items
//         } else {
//             return items.forEach((item, index) => {
//                 const { key } = item
//                 const menus = memoryUtils.user.role.menus
//                 if (key !== '首页' && menus.indexOf(key) === -1) {
//                     items.splice(index, 1)
//                 } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
//                     item.children.forEach((child, index) => {
//                         if (menus.indexOf(child.key) === -1) {
//                             item.children.splice(index, 1)
//                         }
//                     })

//                 }

//             }

//             )
//         }


//     }




//     // componentWillMount() {
//     //     this.menuNodes = this.getMenuNodes(items)

//     // }

//     render() {
//         // console.log(window.location.pathname)
//         // const { menuNodes } = this
//         // console.log('menuNode', menuNodes)
//         let path = window.location.pathname
//         if (path.indexOf('/product') === 0) {//当前请求的是商品或者其子路由
//             path = '/product'
//         }
//         // console.log('render', path)
//         let openKey = ''
//         items.map(item => {
//             if (item.children) {
//                 // let cItem = item.children.find(cItem => cItem.key === path)
//                 //如果商品的子路由/product/detail刷新之后不会选中,不匹配
//                 let cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
//                 if (cItem) openKey = item.key
//             }
//             return openKey

//         })
//         return (
//             <div className='left-nav'>
//                 <Link to="/" className='left-nav-header'>
//                     <img src={logo} alt="logo" />
//                     <h1>硅谷后台</h1>
//                 </Link>

//                 <Menu
//                     /* 默认显示我请求当前路径所对应的菜单项 */

//                     defaultSelectedKeys={path === '/' ? ['/home'] : [path]}
//                     /* 存在的缺点是先请求根路径为localhost：3000  默认选中home菜单项
//                     因为 <Route path="/" element={<Home />} />
//                     获取的path先为'/'在更新为'/home',leftnav页面有更新
//                     而defaultSelectedKeys默认选中一次
//                     */
//                     // selectedKeys={[path]}---效果不对，改用自己判断
//                     //有子菜单项就展开菜单项,openKey是父菜单的key
//                     defaultOpenKeys={[openKey]}

//                     mode="inline"
//                     theme="dark"
//                     items={items}
//                 />
//             </div>
//         )
//     }
// }
