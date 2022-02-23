import {sqlQuery} from './db.js';
// 获取登录信息
export const userF = (name, password) => {
  return new Promise((r, j) => {
    sqlQuery({
      sql: `SELECT * FROM wkk_users where name = "${name}" and password = "${password}"`,
      handler: (res) => {
        r(res)
      }
    })
  })
}
// 获取菜单信息
export const findMenu = () => {
  return new Promise((r, j) => {
    sqlQuery({
      sql: `SELECT * FROM wkk_menu`,
      handler: (res) => {
        let data = menuTree(res)
        r(data)
      }
    })
  })
}
// 生成菜单树结构
const menuTree = (data) => {
  // 统一返回代码格式
  data.map(v => {
    let {icon, roles, title} = v
    v.meta = {icon: icon ? icon : "", roles: roles ? roles.split(',') : [], title}
    delete v.icon
    delete v.roles
    delete v.title
  })
  let menu = data.filter(v => v.parentId === 0)
  if (menu.length > 0) {
    menudata(menu)
  }

  function menudata(menu) {
    menu.forEach((v, i) => {

      data.forEach((v2, i2) => {

        if (v.id === v2.parentId) {
          if (v.children) {
            v.children.push(v2)
          } else {
            v.children = [v2]
          }
        }
      })
    })
  }

  return menu

}
