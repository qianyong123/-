var express = require('express');
var router = express.Router();
var positionControllers=require("../controllers/positionControllers");

//配置文件上传
var multer=require('multer');
//配置磁盘存储
var storage=multer.diskStorage({
    //保存到磁盘的目标位置
    destination:function (req,file,cd) { 
        cd(null,'./public/upload');//将文件保存到public下面的img子目录中
     },
     //配置保存文件的文件名规则
     filename:function (req,file,cd) {  
         // baidu_jgylogo3.gif
        // "logo-193284793287.gif"  193284793287表示当前上传图片的时间
        cd(null,file.fieldname + '-'+ Date.now() + file.originalname.slice(file.originalname.lastIndexOf(".")))

     }
});
//创建上传实例
var upload=multer({storage:storage});
//路由：post方式请求/add资源，添加职位
router.post("/add",upload.single("logo"),positionControllers.add);
//查询数据分页
router.get("/list",positionControllers.list);
//修改数据
router.post("/updete",upload.single("logo"),positionControllers.updete);
//删除一行数据
router.get("/delete",positionControllers.delete);
//查询数据库所有数据
router.get("/select",positionControllers.select);
module.exports = router;