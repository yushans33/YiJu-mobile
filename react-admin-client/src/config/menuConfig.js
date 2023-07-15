import { AppstoreOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'


function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type, };
}
export const items = [
    getItem(<Link to='/home'>首页</Link>, '/home', <PieChartOutlined />),
    getItem('商品', '/products', <AppstoreOutlined />, [
        getItem(<Link to='/category'>品类管理</Link>, '/category', <AppstoreOutlined />),
        getItem(<Link to='/product'>商品管理</Link>, '/product', <AppstoreOutlined />),
    ]),
    getItem(<Link to='/user'>用户管理</Link>, '/user', <PieChartOutlined />),
    getItem(<Link to='/role'>角色管理</Link>, '/role', <PieChartOutlined />),
    getItem('图形图表', '/charts', <AppstoreOutlined />, [
        getItem(<Link to='/charts/bar'>柱状图</Link>, '/charts/bar', <AppstoreOutlined />),
        getItem(<Link to='/charts/line'>折现图</Link>, '/charts/line', <AppstoreOutlined />),
        getItem(<Link to='/charts/pie'>饼图</Link>, '/charts/pie', <AppstoreOutlined />),
    ]),
];
export const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: (< AppstoreOutlined />), // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '商品',
        key: '/products',
        icon: (< AppstoreOutlined />),
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/category',
                icon: (< PieChartOutlined />)
            },
            {
                title: '商品管理',
                key: '/product',
                icon: (< PieChartOutlined />)
            },
        ]
    },

    {
        title: '用户管理',
        key: '/user',
        icon: (< PieChartOutlined />)
    },
    {
        title: '角色管理',
        key: '/role',
        icon: (< PieChartOutlined />),
    },

    {
        title: '图形图表',
        key: '/charts',
        icon: (< PieChartOutlined />),
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: (< PieChartOutlined />)
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: (< PieChartOutlined />)
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: (< PieChartOutlined />)
            },
        ]
    },

    {
        title: '订单管理',
        key: '/order',
        icon: (< PieChartOutlined />),
    },
]



