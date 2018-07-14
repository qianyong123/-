//引入模块
const UserModels=require("../models/UserModels");

const Usercontrollers={
    // 登录函数
    login:function (req,res,next) { 
        //获取post请求的参数
        const {username,password}=req.body;
        //根据前端的数据查询数据库里面有没有这数据
        // console.log("用户密码："+username,password);
		UserModels.loginfind({username,password},(data)=>{
            // console.log(data);
            if(data.length===1){//成功
                 req.session.loginUser=data[0].username;
                res.json({res_code:1,res_error :"",res_body :{username:data[0].username}});
            }else{//失败
                // console.log(00);
                res.json({res_code:0,res_error:"",res_body :{}});
            }
		},(err)=>{
            res.json({
                res_code:-1,
                res_error:"err",
                res_body:{}
            });
        });
     },
    //注册函数
    register:function (req,res,next) {  
        //获得get请求的参数
        // const {username,password,email}=req.query;
        //获取post请求的参数
        const {username,password,email}=req.body;
        // res.send({username,password,email});
        //将数据保存到数据库
        UserModels.save({username,password,email},(msg)=>{
            res.json({
                res_code:0,
                res_error:"",
                res_body:msg
            });
        },(err)=>{
            res.json({
                res_code:-1,
                res_error:"err",
                res_body:{}
            });
        });
    },

    //判断是否登录
    logincheck:function (req,res,next) {  
        var user=req.session.loginUser;
        if(user){
            res.json({
                res_code:0,
                res_error:"",
                res_body:user
            });
        }else{
            res.json({
                res_code:-1,
                res_error:"",
                res_body:{}
            });
        }
    },
    //退出登录
    loginout:function (req,res,nxet) { 
        req.session=null;
        res.json({
            res_code:0,
            res_error:"",
            res_body:{}
        });
     },
     //失去焦点查询
     blur:function (req,res,next) {  
         const {username}=req.query;
         UserModels.regblur({username},(data)=>{
            if(data.length>=1){
                res.json({
                    res_code:1,
                    res_error:"",
                    res_body:{username:data[0].username}
                });
            }else{
                res.json({
                    res_code:0,
                    res_error:"",
                    res_body:{}
                });
            }
         },(err)=>{
            res.json({
                res_code:-1,
                res_error:"",
                res_body:{}
            });
         })
     }
     
}
//到处模块
module.exports=Usercontrollers;