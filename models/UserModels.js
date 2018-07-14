// 用户相关的模型（主要处理数据中的CRUD操作）

//引入mongoose模块
const mongoose=require("mongoose");
//链接h51803数据库
mongoose.connect("mongodb://localhost:27017/position_add");
//数据中集合结构
const schema=mongoose.Schema({
    username:String,
    password:String,
    email:String
});

//生成数据库中创建文档的模型
const User=mongoose.model("zhuces",schema);

const UserModels={
    //保存用户信息
    save:function (userinfo,success,error) { 
        //将userinfo的用户信息保存到数据库中
        //根据数据库文档模型创建当前保存的用户文档
        const user=new User(userinfo);
        //调用save（）方法保存到数据库中
        user.save((err,userinfo)=>{
            //如果有错误，则回调error（）
            if(err){
                error(err);
                return;
            }
            //保存成功，回调success（）函数
            success(userinfo);
        });
     },

     //登录查询用户信息
     loginfind:function (loginfo,success,error) { 
        // console.log(loginfo);
        User.find(loginfo).then(success,error);
        
     },
     //失去焦点查询
     regblur:function (usernameinfo,success,error) { 
         User.find(usernameinfo).then(success,error)
      }
};
//导出模块
module.exports=UserModels;