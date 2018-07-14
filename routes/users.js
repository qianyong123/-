var express = require('express');
var router = express.Router();
var Usercontrollers=require("../controllers/UserControllers");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 用户注册路由，使用控制器中的 register 方法
router.post("/register",Usercontrollers.register);
//用户登录路由
router.post("/login",Usercontrollers.login);
//用户是否登录路由路由
router.get("/check",Usercontrollers.logincheck);
//退出登录
router.get("/loginout",Usercontrollers.loginout);
//失去焦点验证用户是否也存在
router.get("/blur",Usercontrollers.blur);
module.exports = router;
