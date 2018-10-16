const express = require("express");
const pool = require("../pool");
let router = express.Router();
// 获得消息列表
router.get("/msg",(req,res)=>{
    let uid = req.query.uid;
    let send=0;
    let arr = [];
    let sql = 'select m_fromUserID as id,m_id,(select fName from friend where uid = ? and f_id = m_fromUserID) as fName,m_status,(select uPortrait from users where uid  = m_fromUserID) as uPortrait from messages where m_toUserID = ? order by m_id desc';
    pool.query(sql,[uid,uid],(err,result)=>{
        if(err)throw err;
        send += 50;
        arr=arr.concat(result);
        if(send == 100){
            res.send({code:1,msg:arr})
        }
    });
    let sl = 'select  m_toUserID as id,m_id,(select fName from friend where uid = ? and f_id = m_toUserID) as fName,m_status,(select uPortrait from users where uid  = m_toUserID) as uPortrait from messages where m_fromUserID = ? order by m_id desc';
    pool.query(sl,[uid,uid],(err,result)=>{
        if(err)throw err;
        send += 50;
        arr=arr.concat(result);
        if(send == 100){
            res.send({code:1,msg:arr})
        }
    })
});

// 使所有消息变为已阅读
router.get("/read",(req,res)=>{
    let uid = req.query.uid;
    let fid = req.query.fid;
    let sql = 'update messages set m_status = 1 where  m_toUserID = ? and m_fromUserID = ?';
    pool.query(sql,[uid,fid],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:result})
    })
});
// 获得消息的详情
router.get("/details",(req,res)=>{
    let uid = req.query.uid;
    let fid = req.query.fid;
    let send =0;
    let arr=[];
    let sq = `select * from messages where m_toUserID = ? and m_fromUserID = ? `;
    pool.query(sq,[fid,uid],(err,result)=>{
        if(err)throw err;
        if(result.length == 0){
            pool.query(sq,[uid,fid],(err,result)=>{
                if(err)throw err;
                if(result.length == 0){
                    let sql = 'select fName from friend where uid = ? and f_id = ?';
                    pool.query(sql,[uid,fid],(err,result)=>{
                        if(err)throw err;
                        res.send({code:1,msg:result});
                    })
                }
            });
        }else{
            let sql =  'select m_fromUserID,m_postMessages,m_id,m_time,(select fName from friend where uid = ? and f_id = ?) as fName,(select uPortrait from users where uid  = ?) as uPortrait from messages where m_toUserID = ? and m_fromUserID = ?';
            pool.query(sql,[uid,fid,fid,uid,fid],(err,result)=>{
                if(err)throw err;
                send +=50;
                arr = arr.concat(result);
                if(send ==100){
                    res.send({code:1,msg:arr})
                }
            });
            let sl = 'select (select fName from friend where uid = ? and f_id = ?) as fName,m_fromUserID,m_postMessages,m_id,m_time,(select uPortrait from users where uid  = ?) as uPortrait from messages where m_toUserID = ? and m_fromUserID = ?';
            pool.query(sl,[uid,fid,uid,fid,uid],(err,result)=>{
                if(err)throw err;
                send +=50;
                arr = arr.concat(result);
                if(send ==100){
                    res.send({code:1,msg:arr})
                }
            })
        }
    });
});

// 获得自己发送的消息
// router.get("/send",(req,res)=>{
//     let uid = req.query.uid;
//     let fid = req.query.fid;
//     let sql = 'select m_postMessages,m_id,m_time,(select uPortrait from users where uid  = ?) as uPortrait from messages where m_toUserID = ? and m_fromUserID = ?';
//     pool.query(sql,[uid,fid,uid],(err,result)=>{
//         if(err)throw err;
//         res.send({code:1,msg:result})
//     })
// });
// 发送消息
router.post("/sendMsg",(req,res)=>{
    let uid = req.body.uid;
    let fid = req.body.fid;
    let message = req.body.msg;
    let sql = 'insert into messages(m_id,m_time,m_postMessages,m_toUserID,m_fromUserID,m_status,m_mTypeID) values(null,now(),?,?,?,0,1); ';
    pool.query(sql,[message,fid,uid],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:result})
    })
});
module.exports = router;
