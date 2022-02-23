import ws from "nodejs-websocket"

console.log("开始建立连接...")
export let connMap = new Map()

export let webServer = () => {
  // 初始化
  let server = ws.createServer((conn) => {
    // 接收消息
    conn.on("text", function (str) {
      let {type, id, uid, sid, msg} = JSON.parse(str)
      console.log('接收到了---' + type)
      if (type === 'login') {
        conn.userid = id
      }
      if (type === 'msg') {
        senMsg(sid, msg)
      }
    })
    conn.on("close", function (code, reason) {
      console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
      console.log("异常关闭", code)
    });
  }).listen(8001)
  console.log("WebSocket建立完毕")
  return server
}

let server = webServer()


function senMsg(sid, msg) {
  server.connections.forEach(function (conn) {
    if (conn.userid === sid) {
      conn.send(JSON.stringify({msg}))
    }
  })
}



