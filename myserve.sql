SET NAMES UTF8;
DROP DATABASE IF EXISTS myServe;
CREATE DATABASE myServe CHARSET=UTF8;
USE myServe;
#5.用户状态
CREATE TABLE userState(
    us_ID  INT PRIMARY KEY AUTO_INCREMENT,#主键
    us_Name VARCHAR(10)#用户的登录状态
);
#1.用户的信息表
CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT,#主键
    uName VARCHAR(16),  #昵称
    u_rName VARCHAR(16),#真实姓名
    uLoginID VARCHAR(20),   #账号
    uPwd VARCHAR(32), #密码
    uPortrait VARCHAR(255), #头像
    uAge INT, #年龄
    uSex BIT, #性别
    uBirthday DATE,#生日
    uPhone VARCHAR(11), #手机
    uEmail VARCHAR(32), #邮箱
    u_friendPassword VARCHAR(30),#好友的验证码
    u_userStateID INT,#登录状态
    u_Sign VARCHAR(150),#个性签名
    uIntro VARCHAR(100),#个人标签
    FOREIGN KEY(u_userStateID) REFERENCES userState(us_ID)
);
#2.好友分组表
CREATE TABLE friendGroup(
    fg_id  INT PRIMARY KEY AUTO_INCREMENT,#主键
    fg_name VARCHAR(32),#分组名字
    uid INT,#用户的id
    FOREIGN KEY(uid) REFERENCES users(uid)
);
#3.好友类型  好友的特别分类 是否为特别关注
CREATE TABLE friendType(
    ft_id INT PRIMARY KEY AUTO_INCREMENT,#主键
    ft_name VARCHAR(20)#类型名称
);
#4.用户的好友表 通讯录
CREATE TABLE friend(
    fid INT PRIMARY KEY AUTO_INCREMENT,#主键
    fName VARCHAR(16),#好友的备注
    ft_id INT,#好友类型id 外键
    fg_id INT,#所属分组ID 外键
    f_id INT,#好友的id
    uid INT,#自己的id
    FOREIGN KEY(uid) REFERENCES users(uid),#外键
    FOREIGN KEY(f_id) REFERENCES users(uid), #外键
    FOREIGN KEY(ft_id) REFERENCES friendType(ft_id), #外键
    FOREIGN KEY(fg_id) REFERENCES friendGroup(fg_id)#外键
);
#6.消息类型
CREATE TABLE messagesTypeID(
    mt_id  INT PRIMARY KEY AUTO_INCREMENT,#主键
    mt_name VARCHAR(32)#类型名称
);
#7.聊天记录表
CREATE TABLE messages(
    m_id  INT PRIMARY KEY AUTO_INCREMENT,#主键
    m_postMessages VARCHAR(2048),#消息内容
    m_status BIT,#接受状态
    m_time DATETIME,#发送时间
    m_mTypeID INT,#消息类型id 外键
    m_fromUserID INT,#发送者的id 外键
    m_toUserID INT,#接受者的id 外键
    FOREIGN KEY(m_fromUserID) REFERENCES users(uid),#发送者的id 外键连接
    FOREIGN KEY(m_toUserID) REFERENCES users(uid),#接受者的id 外键连接
   FOREIGN KEY(m_mTypeID) REFERENCES messagesTypeID(mt_id)
);
#8.朋友圈
CREATE TABLE moments(
    um_id INT PRIMARY KEY AUTO_INCREMENT,#主键
    um_messages VARCHAR(500),#消息内容
    um_time DATE,#发送时间
    uid INT,#自己的id
    FOREIGN KEY(uid) REFERENCES users(uid) #外键
);
#5.添加用户状态列表
INSERT INTO userState VALUES(null,"在线");
INSERT INTO userState VALUES(null,"离线");
INSERT INTO userState VALUES(null,"隐身");
#1.添加用户表
INSERT INTO users VALUES(null,"tom","王二牛","qwer",md5('asd'),"/img/uPortrait/1.jpg","",1,"1993-5-19","13223766636","456@qq.com",md5('789'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"jerry","李二牛","aqwer",md5('asds'),"/img/uPortrait/2.jpg","",1,"1994-5-19","13423766636","454@qq.com",md5('489'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"james","赵二牛","Qqwer",md5('aQsd'),"/img/uPortrait/3.jpg","",0,"1993-6-19","13243766636","446@qq.com",md5('389'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"lee","钱二牛","Aqwer",md5('asAd'),"/img/uPortrait/4.jpg","",1,"1993-5-13","13223766336","4536@qq.com",md5('7389'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"love","孙二牛","qwwer",md5('asdw'),"/img/uPortrait/5.jpg","",0,"1996-5-19","13223766626","4562@qq.com",md5('7289'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"joke","周二牛","dqwer",md5('assd'),"/img/uPortrait/6.jpg","",1,"1998-5-19","13223766633","45d6@qq.com",md5('78d9'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"angle","吴二牛","aqwer",md5('asds'),"/img/uPortrait/1.jpg","",1,"1990-5-19","17223766636","456a@qq.com",md5('7s89'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"one","郑二牛","qawer",md5('assd'),"/img/uPortrait/1.jpg","",1,"1993-5-19","13223736636","45s6@qq.com",md5('7a89'),1,"人有我无","大牛，无敌");
INSERT INTO users VALUES(null,"dingding","冯二牛","qgwer",md5('fasd'),"/img/uPortrait/1.jpg","",1,"1993-5-19","13223766636","45h6@qq.com",md5('78f9'),1,"人有我无","大牛，无敌");
#2.添加好友分组表
INSERT INTO friendGroup VALUES(null,"我的好友",null);
INSERT INTO friendGroup VALUES(null,"家人",1);
INSERT INTO friendGroup VALUES(null,"朋友",1);
INSERT INTO friendGroup VALUES(null,"同学",1);
INSERT INTO friendGroup VALUES(null,"工友",1);
#3.添加好友类型表
INSERT INTO friendType VALUES(null,"特别关注");
INSERT INTO friendType VALUES(null,"黑名单");
INSERT INTO friendType VALUES(null,"白名单");
INSERT INTO friendType VALUES(null,"无");
#4.添加好友表，通讯录
INSERT INTO friend VALUES(null,"大舅",1,1,2,1);
INSERT INTO friend VALUES(null,"二舅",2,null,2,3);
INSERT INTO friend VALUES(null,"三舅",3,null,2,4);
INSERT INTO friend VALUES(null,"四舅",1,null,2,5);
INSERT INTO friend VALUES(null,"五舅",2,null,2,6);
INSERT INTO friend VALUES(null,"六舅",3,null,2,7);
INSERT INTO friend VALUES(null,"七舅",4,null,2,8);
INSERT INTO friend VALUES(null,"八舅",2,null,2,9);
INSERT INTO friend VALUES(null,"九舅",3,3,3,1);
INSERT INTO friend VALUES(null,"大叔",4,2,4,1);
INSERT INTO friend VALUES(null,"二叔",2,2,5,1);
INSERT INTO friend VALUES(null,"三叔",3,2,6,1);
INSERT INTO friend VALUES(null,"四叔",1,2,7,1);
INSERT INTO friend VALUES(null,"五叔",2,2,8,1);
INSERT INTO friend VALUES(null,"六叔",3,2,9,1);
INSERT INTO friend VALUES(null,"七叔",4,null,1,2);
INSERT INTO friend VALUES(null,"八叔",4,null,1,3);
INSERT INTO friend VALUES(null,"九叔",4,null,1,4);
INSERT INTO friend VALUES(null,"大妈",4,null,1,5);
INSERT INTO friend VALUES(null,"二妈",4,null,1,6);
#6.添加消息类型表
INSERT INTO  messagesTypeID VALUES(null,"文字");
INSERT INTO  messagesTypeID VALUES(null,"图片");
INSERT INTO  messagesTypeID VALUES(null,"视频");
INSERT INTO  messagesTypeID VALUES(null,"语音");
#7.添加聊天记录表
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,2,1);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,2,3);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,2,4);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,2,5);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,2,6);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,2,7);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,2,8);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,3,1);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,4,1);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,5,1);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,6,1);
INSERT INTO messages VALUES(null,"他大舅他二舅都是他舅",1,now(),1,7,1);
#8.朋友圈
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),1);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),2);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),3);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),4);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),2);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),3);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),4);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),5);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),2);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),3);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),4);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),2);
INSERT INTO moments VALUES(null,'好吧，我想有的童鞋可能会问干嘛建那么多文件夹，比如公用的方法写在一个utils.js文件里不就好了么，嗯其实也不是不可以，只是我个人比较喜欢每个文件的代码量都尽量精简一些，需要什么直接import就好而不是把所有的东西都放在一个文件里面，比如我把utils里的文件的方法都提取到一个文件里面，因为是一个团队开发，如果你写了某个新方法没有在文件开头写好注释别人就不一定知道你多加了一个方法，我上一家公司就是这样，当时是使用的ng1.0+，都是前年的事了，一个公用方法文件里放了n个人的公用方法，然后一个文件的代码量就有几千行。当时也是',now(),3);