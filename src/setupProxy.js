const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app){
	app.use(
    	"/api",
      	createProxyMiddleware({
        	target: 'https://www.chungbuk.go.kr/openapi-json/pubdata/pubMapForest.do',
          	changeOrigin: true,
          	pathRewrite: {
            	'^/api': ''
            }
        })
    )
}