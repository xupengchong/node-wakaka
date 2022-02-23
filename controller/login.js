import {userF, findMenu} from '../middleware/mysql/login.js';
import JwtUtil from '../utils/jwt/jwt.js'
// import {userInfo} from "../middleware/websocket.js"

// 用户信息
const infoMsg = () => {
  return new Promise(async (r, j) => {
    const menu = await findMenu()

    let data = {menu, info: ''}
    r(data)
  })
}
// 登录
export const login = async (req, res) => {
  let {name, password} = req.body
  let user = await userF(name, password)  // 查询登录
  // console.log(user, 31)
  // 返回 参数
  if (user.length) {
    // 登陆成功，添加token验证
    let _id = user[0].id.toString();  /// jwt有错误等待解决
    // 将用户id传入并生成token
    let jwt = new JwtUtil(_id);
    // 生成 返回给客户端的 token
    let token = jwt.generateToken();
    let infoData = null
    // if (userInfo) {
    // 获取用户 菜单 及 权限
    infoData = await infoMsg()
    // } else {
    //   // userInfo为null  userInfo未赋值
    //   let dataOrigin = res.setResData({}, 500, "websocket初始化失败")
    //   res.json(dataOrigin)
    // }
    let dataOrigin = res.setResData({token, ...infoData}, 200, "登录成功")
    // userInfo.send(JSON.stringify({...infoData, type: 1}))
    res.json(dataOrigin)
  } else {
    let dataOrigin = res.setResData({}, 401, "用户名或密码错误")
    res.json(dataOrigin)
  }

}



