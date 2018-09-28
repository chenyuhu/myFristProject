const express= require("express");
const pool=require("../pool");
let router = express.Router();
//忘记密码
router.post("/forgetPwd",(req,res)=>{
    let uPhone=req.body.uPhone;
    let uName=req.body.uName;
    let uPwd=req.body.uPwd;
    let sql=`select * from users where uPhone=? and uName=? or uLoginID=?`;
    pool.query(sql,[uPhone,uName,uName],(err,result)=>{
        if(err) throw err;
        if(result.length != 0){
            let sql =  `update users set uPwd=md5(?) where uPhone=? and uName=? or uLoginID=?`;
            pool.query(sql,[uPwd,uPhone,uName,uName],(err,result)=>{
                if(err)throw err;
                res.send({code:1});
            })
        }else{
            res.send({code:0});
        }
    })
});
//黑名单
router.get("/blacklist",(req,res)=>{
    let uid = req.query.uid;
    let ft_id=req.query.ft_id;
    let arr=[];
    let arr1=[];
    let sql=`select f_id from friend where uid=? and ft_id=?`;
    pool.query(sql,[uid,ft_id],(err,result)=>{
        if(err) throw err;
        if(result.length !=0){
            arr = result;
            for(let i=0;i<arr.length;i++){
                let sql=`select uid,uName,uLoginID,uPortrait from users where uid= ?`;
                pool.query(sql,[arr[i].f_id],(err,result)=>{
                    if(err)throw err;
                    arr1.push(result);
                    if(arr1.length == arr.length){
                        res.send({code:1,msg:arr1});
                    }
                })
            }
        }else{
           res.send({code:1})
        }

    });
});
//移除黑名单
router.get("/removeBlacklist",(req,res)=>{
    let uid=req.query.uid;
    let f_id=req.query.f_id;
    let sql=`update friend set ft_id=? where uid=? and f_id=?`;
    pool.query(sql,[4,uid,f_id],(err,result)=>{
        if(err) throw err;
        res.send({code:1})
    })
});

module.exports=router;