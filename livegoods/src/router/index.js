// 定义路由走向
import About from '../pages/about/About'
import Home from '../pages/home/Home'
import Life from '../pages/life/Life'
import Shop from '../pages/shop/Shop'
import Layout from '../pages/Layout'
import City from '../pages/city/City'
import Classmate from '../pages/classmate/Classmate'
import Community from '../pages/community/Community'
import Search from '../pages/search/Search'
import HouseDetail from '../pages/houseDetail/HouseDetail'
import Login from '../pages/login/Login'
import Comment from '../pages/comment/Comment'

//路由配置
const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/life',
                element: <Life />
            },
            {
                path: '/shop',
                element: <Shop />
            },
        ]
    },

    {
        path: '/city',
        element: <City />
    },
    {
        path: '/classmate',
        element: <Classmate />
    },
    {
        path: '/community',
        element: <Community />
    },

    {
        path: '/search',
        element: <Search />
    },
    {
        //不是点击什么都可以进入详情页面，则加标识
        path: '/detail/:id',
        element: <HouseDetail />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/comment',
        element: <Comment />
    }



]
export default routes