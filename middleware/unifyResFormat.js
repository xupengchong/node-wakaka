/**
 * 通用返回数据
 * @param req
 * @param res 要返回的数据
 * @param next 继续执行
 */
export default (req, res, next) => {
  /**
   *
   * @param data 返回数据
   * @param code 返回状态码
   * @param message 提示
   * @returns {{code, data, message}}
   */
  res.setResData = (data, code, message) => {
    let res = {}
    if (code === 200) {
      res = {
        data,
        code,
        message
      }
    } else {
      res = {
        code,
        message
      }
    }
    return res
  };
  next()
}

