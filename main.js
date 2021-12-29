import express from "express";
import router from "./router/index.js";
import resextra from "./middleware/unifyResFormat.js"


const app = express()
// 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
app.use(express.urlencoded({extended: false}))

// 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
// 默认情况下，如果不配置解析表单数据中间件，则 req.body 默认等于 undefined
app.use(express.json())

/**
 * 统一处理返回数据格式
 * @data 数据
 * @code 状态码
 * @message 返回值
 * */

app.use(resextra)
 // 跨域
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   next();
// })
app.use('/wakaka', router)

// 监听端口
app.listen(8888, () => {
  console.log('启动成功')
  console.group('127.0.0.1:8888')
})
