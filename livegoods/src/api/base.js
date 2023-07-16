const base = {
    host: "http://localhost:4000/",//基础域名
    banner: '/api/banner', //轮播接口
    hotHouse: '/api/hotHouse',//热门房源
    citys: '/api/city',//城市选择
    search: '/api/search',//房源搜索
    houseInfo: '/api/houseInfo',//房源详情介绍{id:xxx}
    commit: '/api/comment',//房源评论 {id:XXX，page}
    shopComment: '/api/shopcar',//商品评价---个人中心
    hotProduct: '/api/hotproduct',//热销单品
    houseGoods: '/api/getfa',//家庭常用
    mafeng: '/foo',//马蜂窝
    you: '/boo/Ajax/GetWapAD.ashx?callback=1',//游天下轮播接口
}
export default base;