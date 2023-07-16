const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(

        createProxyMiddleware(
            '/api',
            { //遇见/api前缀的请求，就会触发该代理配置
                //'api=http://localhost:4000/api'会默认加一个api所以需要路径重定向，接口补一个/api
                target: 'http://localhost:4000', //请求转发给谁,访问域名
                changeOrigin: true,//控制服务器收到的请求头中Host的值，允许跨域
                pathRewrite: { '^/api': '' } //重写请求路径(必须)，开头是/api用空格代替
            }),

    );

    //马蜂窝：https://m.mafengwo.cn/?category=get_info_flow_list&page=1
    app.use("/foo", createProxyMiddleware({
        target: "https://m.mafengwo.cn?category=get_info_flow_list&page=1", //访问域名 
        changeOrigin: true, //允许跨域  true允许
        pathRewrite: {//路径重定向  开头是/api的替换地址空 
            '^/foo': ''
        }
    })
    )

    //游天下 http://m.youtx.com/Ajax/GetWapAD.ashx?callback=1
    app.use("/boo", createProxyMiddleware({
        target: "http://m.youtx.com", //访问域名 有相对路径
        changeOrigin: true,
        pathRewrite: {
            '^/boo': ''
        }
    })
    );
}