const express= require("express");
const pool=require("../pool");
const  multer = require("multer");
const  fs=require("fs");
let router = express.Router();
// 登录
router.get("/login",(req,res)=>{
    let uName=req.query.uName;
    let uPwd=req.query.uPwd;
    let sql=`select uid,uName,u_rName,uPwd,uLoginID,uPortrait,uAge,uSex,uBirthday,uPhone,uEmail,u_friendPassword,u_userStateID,u_Sign,uIntro from users where uPwd=md5(?) and  uName=? or uLoginID=?`;
    pool.query(sql,[uPwd,uName,uName],(err,result)=>{
        if(err) throw  err;
        if(result.length!=0){
            res.send({code:1,msg:result});
        }else{
            res.send({code:0,msg:"输入有误，请重新输入"});
        }
    })
});
//获得用户的信息
router.get("/msg",(req,res)=>{
    let uid=req.query.uid;
    let sql=`select uName,u_rName,uPwd,uLoginID,uPortrait,uAge,uSex,uBirthday,uPhone,uEmail,u_friendPassword,u_userStateID,u_Sign,uIntro from users where uid=?`;
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw  err;
        if(result.length!=0){
            res.send({code:1,msg:result});
        }else{
            res.send({code:0,msg:"输入有误，请重新输入"});
        }
    })
});
// 注册
    //验证用户账户是否重复
router.get("/reuLid",(req,res)=>{
    let uLoginID=req.body.uLoginID;
    let sql=`select * from users where uLoginID=?`;
    pool.query(sql,[uLoginID],(err,result)=>{
        if(err)throw err;
        if(result.length == 0){
            res.send({code:1})
        }else{
            res.send({code:0})
        }
    })
});
router.post("/signIn",(req,res)=>{
    //验证用户名是否重复
    let uName=req.body.uName;
    let uPwd=req.body.uPwd;
    let uLoginID=req.body.uLoginID;
    let uPhone=req.body.uPhone;
    let uEmail=req.body.uEmail;
    let uSex=req.body.uSex;
    let u_rName=req.body.u_rName;
    let uAge=req.body.uAge;
    let uBirthday=req.body.uBirthday;
    let uPortrait="/img/uPortrait/1.jpg";
    let sql=`select * from users where uName=?`;
    pool.query(sql,[uName,uLoginID],(err,result)=>{
        if(err) throw err;
        if(result.length == 0){
            let sql=`select * from users where uPhone=?`;
            pool.query(sql,[uPhone],(err,result)=>{
                if(err)throw err;
                if(result.length <3){
                    let sql=`INSERT INTO users(uid,uName,u_rName,uPwd,uLoginID,uPortrait,uAge,uSex,uBirthday,uPhone,uEmail) VALUES(null,?,?,md5(?),?,?,?,?,?,?,?)`;
                    pool.query(sql,[uName,u_rName,uPwd,uLoginID,uPortrait,uAge,uSex,uBirthday,uPhone,uEmail],(err,result)=>{
                        if(err) throw err;
                        res.send({code:1});
                    })
                }else{
                    res.send({code:0,msg:"该手机号已注册"})
                }
            })
        }
        else{
            res.send({code:0,msg:"该用户名已存在"})
        }
    })
});
//修改头像
let upload = multer({dest:"public/img/uPortrait/"});
router.post("/portrait",upload.single("file"),(req,res)=>{
    let file= req.file;
    let srcFile = file.originalname;
    let len=srcFile.lastIndexOf(".");
    let suffix=srcFile.slice(len);
    let newFileName=`public/img/uPortrait/${new Date().getTime()}${Math.floor(Math.random()*9999)}${suffix}`;
    fs.renameSync(file.path,newFileName);
    let uid=req.body.uid;
    let fileName=newFileName.slice(6);
    let sql=`update users set uPortrait=? where uid=?`;
    pool.query(sql,[fileName,uid],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:fileName})
    });
});
let fileUpload=multer({dest:"public/img/aboutFile/"});
router.post("/aboutImg",fileUpload.single("file"),(req,res)=>{
    let file=req.file;
    let srcFile = file.originalname;
    let len=srcFile.lastIndexOf(".");
    let suffix=srcFile.slice(len);
    let newFileName=`public/img/aboutFile/${new Date().getTime()}${Math.floor(Math.random()*9999)}${suffix}`;
    fs.renameSync(file.path,newFileName);
    let fileName=newFileName.slice(6);
    res.send({code:1,msg:fileName})
});
//修改邮箱
router.get("/cEmail",(req,res)=>{
    let uEmail = req.query.uEmail;
    let Setting="";
    if(uEmail.indexOf("@") != "-1"){
        Setting="uEmail";
    }else if(uEmail.indexOf("-") == "-1"){
        if(parseFloat(uEmail) != "NaN"){
            Setting="u_rName";
        }else{
            Setting="uPhone";
        }
    }else{
        Setting="uBirthday";
    }
    let uid = req.query.uid;
    let sql = `UPDATE users SET ${Setting}=? WHERE uid=?`;
    pool.query(sql,[uEmail,uid],(err,result)=>{
        if(err) throw  err;
        res.send({code:1});
    })
});
module.exports=router;
