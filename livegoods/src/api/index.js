//网络请求的方法
import axios from 'axios'
import base from './base'

const api = {
    // 轮播接口 定义一个方法
    getBanner() {
        return axios.get(base.banner)
    },
    //定义一个热门房源的接口
    getHotHouse() {
        return axios.get(base.hotHouse)
    },
    //定义一个城市选择的接口
    getCitys() {
        return axios.get(base.citys)
    },
    //房源搜索接口city value page
    getSearch(params) {
        return axios.get(base.search, { params })
    },
    //房源详情接口 id
    getDetail(params) {
        return axios.get(base.houseInfo, { params })
    },
    //评论信息接口
    getComment(params) {
        return axios.get(base.commit, { params })
    },
    //商城评价---个人中心
    getShopComment(params) {
        return axios.get(base.shopComment, { params })
    },
    //热销单品
    getHotProduct(params) {
        return axios.get(base.hotProduct, { params })
    },
    //家庭常用
    getFamily(params) {
        return axios.get(base.houseGoods, { params })
    },
    //m马蜂窝
    getMa(){
        return axios.get(base.mafeng)
    },
    //游天下
    getYou(){
        return axios.get(base.you)
    }



}
export default api;