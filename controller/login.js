
import {sqlQuery} from '../middleware/mysql/db.js';
import JwtUtil from '../utils/jwt/jwt.js'
// 获取登录信息
let userF = (name , password)=>{
  return new Promise((r,j)=>{
    /**
     * sqlQuery 查询sql
     * @param sql 语句
     * @param handler 回调
     */
    sqlQuery({
      sql:`SELECT * FROM wkk_users where name = "${name}" and password = "${password}"`,
      handler:(res)=>{
        r(res)
      }
    })
  })
}


// 登录
export const login = async (req, res) => {
  let {name , password } = req.body
  let user = await userF(name , password)  // 查询登录
  console.log(user,31)
  // 返回 参数
  if (user.length) {
      // 登陆成功，添加token验证
      let _id = user[0].id.toString();  /// jwt有错误等待解决
      // 将用户id传入并生成token
      let jwt = new JwtUtil(_id);
      let token = jwt.generateToken();
    console.log('token:'+ token)
      // 将 token 返回给客户端
      let dataOrigin = res.setResData({token}, 200, "登录成功")
      res.json(dataOrigin)
  } else {
    let dataOrigin = res.setResData({}, 401, "用户名或密码错误")
    res.json(dataOrigin)
  }

}

// 用户信息
export const info = (req,res) => {
  const menu = [
    {
      path: '/echarts',
      meta: {title: '权限管理', icon: 'el-icon-pie-chart'},
      children: [
        {
          meta: {title: '菜单管理'},
          component: 'index',
          path: 'box456789'
        },
        {
          meta: {title: '角色管理'},
          component: 'index',
          path: 'box1'
        },
        {
          meta: {title: '用户管理'},
          component: 'index',
          path: 'box1456'
        },
      ]
    },
  ]
  // 获取登录信息匹配的项
  console.log(req.body)

  // const user = users.find(user => {
  //   return req.body.user === user.user && req.body.password === user.password
  // })
  let data = res.setResData({menu,info:''}, 200, "信息获取成功")
  res.json(data)
}
