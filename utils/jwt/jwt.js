// 引入模块依赖
import jwt from 'jsonwebtoken'
import * as path from 'path';
import * as fs from 'fs';

// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;
  }

  //生成token
  generateToken() {
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync('utils/jwt/pem/private_key.pem');//私钥 可以自己生成
    let token = jwt.sign({
      data,
      exp: created + 60 * 30,
    }, cert, {algorithm: 'RS256'});
    return token;
  }

  // 校验token
  verifyToken() {
    let token = this.data;
    let cert = fs.readFileSync('utils/jwt/pem/public_key.pem');//公钥 可以自己生成
    let res;
    try {
      let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
      let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = {
          type: 'success',
          data: result.data || {}
        }
      }
    } catch (e) {
      res = {
        type: 'err',
        data: e
      }
    }
    return res;
  }
}

export default Jwt;
