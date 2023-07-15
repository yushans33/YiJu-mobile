import { AppstoreOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'


function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type, };
}
const items = [
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

export default items;