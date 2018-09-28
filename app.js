//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
let app = express();
app.listen(3000);
/*引入路由模块*/
let login=require("./routes/login");
let friend = require("./routes/friend");
let forget =require("./routes/forget");
let find = require("./routes/find");
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
/**解决跨域请求 */
app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080","http://localhost:*","http://localhost:4200"],
    credentials:true,
}));
//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/
app.use("/login",login);
app.use("/friend",friend);
app.use("/forget",forget);
app.use("/find",find);
