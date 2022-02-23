import JwtUtil from '../utils/jwt/jwt.js'

let Public = (req, res, next) => {
  console.log(`路由执行成功啦~~~`, req.url);
  if (req.url === '/login') return next()
  let token = req.get("token")
  let jwt = new JwtUtil(token)
  let result = jwt.verifyToken()
  if (result.type !== 'err') {
    next()
  } else {
    let data = res.setResData({}, 403, "登录已超时,请重新登录")
    res.json(data)
  }

}

export default Public
