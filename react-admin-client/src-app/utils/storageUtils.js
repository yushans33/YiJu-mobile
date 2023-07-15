/*
进行local数据存储管理的工具模块
 */
import store from "store" //跨浏览器存储，针对所以情况；localStorage有些浏览器不兼容
const USER_KEY = 'user_key'
const userMessage = {
    /* 保存user */
    saveUser(user) {
        //                            json格式的字符串  对象
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY, user)
    },

    /* 读取user */
    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    /* 删除user */
    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}
export default userMessage