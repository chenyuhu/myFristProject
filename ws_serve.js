// 1.引入ws模块
const ws=  require("ws");
// 2.创建ws服务器并且指定端口为9001
let serve = new ws.Server({port:9001});
// 3.绑定事件 connection  客户端连接事件
serve.on("connection",(socket)=>{
//    4.服务器不停向客户端发送数据  定时器
    let timer = setInterval(()=>{
        socket.send("123")
    },1000);
//    5.服务器接收客户端数据
    socket.on("message",()=>{

    });
//    6.如果客户端发来的断开连接的请求 停止定时器
    socket.on("close",()=>{
        clearInterval(timer)
    })
});
