const  express=require("express");
const  pool = require("../pool");
let router = express.Router();

//获取好友列表
router.get("/list",(req,res)=>{
    let arr=[];
    let arr1=[];
    let uid=req.query.uid;
    let sql=`SELECT fid,f_id from friend where uid=?`;
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw  err;
        if(result.length == 0){
            res.send({code:0,msg:'您还没有好友！快去添加好友吧！'});
        }else {
            for(let i=0;i<result.length;i++){
                let item = result[i];
                arr[i]=item.f_id;
            }
            for(let  j in arr){
                let  fid=arr[j];
                let sql=`
                select uName,u_rName,uLoginID,uPortrait,uAge,uSex,uBirthday,uPhone,uEmail,u_Sign,uIntro,uid,
                (select fName from friend where f_id=? and uid=? limit 1) as fName,
                (select u_userStateID from users where uid=?) as u_userStateID,
                (select fg_id from friend where uid=? and f_id=?) as fg_id,
                (select ft_id from friend where  uid=? and f_id=?) as ft_id          
                 from users where uid=?`;
                pool.query(sql,[fid,uid,fid,uid,fid,uid,fid,fid],(err,result)=>{
                    if(err) throw err;
                    arr1.push(result);
                    if(arr1.length ==arr.length){
                        res.send({code:1,msg:arr1});
                    }
                })
            };
        }
    })
});
//获取好友的分组
router.get("/getGroup",(req,res)=>{
    let uid = req.query.uid;
    let sql=`select fg_name,fg_id from friendgroup where uid = ?`;
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw  err;
        result.unshift({fg_name:"我的好友",fg_id:1});
        res.send({code:1,msg:result});
    })
});
//搜索好友
router.get('/search',(req,res)=>{
    // let uName=req.query.uName;
    /**用户名，或者用户id*/
    let uName =`%${req.query.uName}%`;
    let sql = `
        select uName,uLoginID,uPortrait,u_Sign,uIntro,uid from users where uName like ? or uLoginID like ?
    `;
    pool.query(sql,[uName,uName],(err,result)=>{
        if(err) throw err;
        if(result.length !=0){
            res.send({code:1,msg:result});
        }else{
            res.send({code:0,msg:"未找到该用户"});
        }
    })
});
//添加好友
router.post("/add",(req,res)=>{
    //需要知道好友的昵称、ID 其余默认为默认值
    let fName=req.body.fName;
    let uid=req.body.uid;
    let f_id=req.body.f_id;
    let fg_id=req.body.fg_id;
    let ft_id=req.body.ft_id;
    if(ft_id==null) ft_id = 4;
    if(fg_id == null) fg_id = 1;
    if(fName == null){
        let sql=`select uName from users where uid=?`;
        pool.query(sql,[f_id],(err,result)=>{
            if(err)throw  err;
            fName=result[0].uName;
            let sql =`select f_id from friend where uid=? and f_id=?`;
            pool.query(sql,[uid,f_id],(err,result)=>{
                if(err) throw  err;
                if (result.length ==0){
                    let sql=`INSERT INTO friend(fid,fName,ft_id,fg_id,f_id,uid) VALUES(null,?,?,?,?,?)`;
                    pool.query(sql,[fName,ft_id,fg_id,f_id,uid],(err,result)=>{
                        if(err) throw err;
                        res.send({code:1,msg:result});
                    });
                }else{
                    res.send({code:0,msg:'该用已存在'})
                }
            });

        })
    }

});
//设置修改好友的属性 即是否为特别关心
router.post("/line",(req,res)=>{
    let uid = req.body.uid;
    let f_id=req.body.f_id;
    let ft_id=req.body.ft_id;
    // update 表名称 set 表头='修改名称' where 限制条件  修改某一列的表头
    let sql= `update friend set ft_id=? where uid=? and f_id=?`;
    pool.query(sql,[ft_id,uid,f_id],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:"修改成功"});
    })

});
//设置添加好友分组名称
router.post("/setGroup",(req,res)=>{
    let uid=req.body.uid;
    let fg_name=req.body.fg_name;
    let sql=`INSERT INTO friendgroup(fg_id,fg_name,uid) VALUES(null,?,?)`;
    pool.query(sql,[fg_name,uid],(err,result)=>{
        if(err) throw  err;
        res.send({code:1,msg:"修改成功"});
    })
});
//设置好友的分组的id
router.post("/fgroup",(req,res)=>{
    let uid=req.body.uid;
    let f_id=req.body.f_id;
    let fg_id=req.body.fg_id;
    let sql=`update friend set fg_id=? where uid=? and f_id=?`;
    pool.query(sql,[fg_id,uid,f_id],(err,result)=>{
        if(err)throw err;
        res.send({code:1,msg:"修改完成"})
    })
});
//获取好友的详细信息
router.get("/detail",(req,res)=>{
    let uid=req.query.uid;
    let UID=req.query.UID;
    let sql = `select uName,uLoginID,uEmail,uPortrait,uSex,uIntro,
                    (select fName from friend where f_id=? and uid=? limit 1) as fName from users where uid = ?`;
    pool.query(sql,[uid,UID,uid],(err,result)=>{
        if(err) throw  err;
        if(result.length == 0){
            res.send({code:0,msg:'没有该用户'});
        }else{
            res.send({code:1,msg:result});
        }
    })
});
// 设置好友的备注
router.post('/setRemarks',(req,res)=>{
    let uid=req.body.uid;
    let f_id =req.body.f_id;
    let fName = req.body.fName;
    let sql =  `update friend set fName=? where uid=? and f_id=?`;
    pool.query(sql,[fName,uid,f_id],(err,result)=>{
        if(err) throw err;
        res.send({code:1});
    })
});
module.exports=router;