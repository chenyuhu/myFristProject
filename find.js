const express= require("express");
const pool=require("../pool");
let router = express.Router();
//    获得朋友圈的信息
    router.get("/msg",(req,res)=>{
        let uid = req.query.uid;
        let msg = [];
        let num = 0;
        let sql = `select f_id from friend where uid=?`;
        pool.query(sql,[uid],(err,result)=>{
            if(err) throw  err;
            let arr = result;
            arr.push({f_id:uid});
            for(let i = 0;i<arr.length;i++){
                let sql = `select um_messages,um_time,(select uName from users where uid = ?) as uName from moments where uid = ?`;
                pool.query(sql,[arr[i].f_id,arr[i].f_id],(err,result)=>{
                    if(err) throw  err;
                    if(result.length !=0){
                        msg.push(result[0]);
                    }else{
                        num += 1;
                    }
                    if(msg.length + num == arr.length){
                        res.send({code:1,msg});
                    }
                })
            }
        })
    });
module.exports=router;