const express = require("express");
const pool = require("../pool");
const  multer = require("multer");
const  fs=require("fs");
let router = express.Router();
router.get('/myBgc',(req,res)=>{
    let uid = req.query.uid;
    let sql=`select b_id,bh_bgc,bh_chatbgc,uid from background where uid = ?`;
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err;
        if(result.length !=0){
            res.send({code:1,msg:result})
        }else {
            res.send({code:0});
        }
    })
});
router.get('/list',(req,res)=>{
    let sql= `select pb_id,pb_img from pubbgc`;
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        if(result.length !=0){
            res.send({code:1,msg:result})
        }else {
            res.send({code:0});
        }
    })
});
let upload = multer({dest:"public/img/uBackground/"});
router.post("/portrait",upload.single("file"),(req,res)=>{
    let file= req.file;
    let srcFile = file.originalname;
    let len=srcFile.lastIndexOf(".");
    let suffix=srcFile.slice(len);
    let newFileName=`public/img/uBackground/${new Date().getTime()}${Math.floor(Math.random()*9999)}${suffix}`;
    fs.renameSync(file.path,newFileName);
    let uid=req.body.uid;
    let name = req.body.name;
    let fileName=newFileName.slice(6);
    let sql=`update background set ?=? where uid=?`;
    pool.query(sql,[name,fileName,uid],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:fileName})
    });
});
module.exports = router;