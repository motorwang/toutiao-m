module.exports = {
    lintOnSave: false,
    
    devServer: {
        proxy: {
            '/api': {
                target: 'http://ttapi.research.itcast.cn/',
                // target: 'http://api-toutiao-web.itheima.net/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api/': ''
                }
            }
        }
    }
}