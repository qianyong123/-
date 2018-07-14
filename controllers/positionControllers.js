const positionModels=require("../models/positionModels");

const positionControllers={
    add:function (req,res,next) { 
        // res.send("jjl");
        // 获取请求职位里面的信息
        const {position,company,jingyan,leixing,didian,salary}=req.body;
		// console.log("上传文件：" + req.file.filename);
		let logo="";
		if(req.file){//有上传的文件
			logo="/upload/"+req.file.filename;
		}
        // 将数据保存到数据库
		positionModels.save({logo,position,company,jingyan,leixing,didian,salary}, (data)=>{
			res.json({
				res_code : 0,
				res_error : "",
				res_body : data
			});
		}, (err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	},
	//get查询数据库的信息
	list:function (req,res,next) { 
		//从请求中获取查询页码
		const {pageIndex}=req.query;
		//按页查询数据
		positionModels.pagefind(pageIndex,(data)=>{
			res.json({
				res_code : 0,
				res_error : "",
				res_body : data
			});
		},(err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	 },
	 //修改数据
     updete:function (req,res,next) { 
        // 获取请求职位里面的信息
		const {id,position,company,jingyan,leixing,didian,salary,logo_exist}=req.body;
		//logo
		let logo=null;
		if(req.file){//有上传的文件
			logo="/upload/"+req.file.filename;
		}else{
			logo=logo_exist;
		}
        positionModels.positionupdete([{_id:id},{logo,position,company,jingyan,leixing,didian,salary}],(data)=>{
			res.json({
				res_code : 0,
				res_error : "",
				res_body : data
			});
		},(err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	  },
		  // 删除数据
	  delete:function (req,res,next) { 
		  const {id}=req.query;
		  positionModels.positiondelete({_id:id},(data)=>{
			res.json({
				res_code : 0,
				res_error : "",
				res_body : data
			});
		  },(err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		  });
	   },
	   //查询全部数据
	   select:function (req,res,next) { 
			positionModels.positionselect((data)=>{
				res.json({
					res_code : 0,
					res_error : "",
					res_body : data
				});
			},(err)=>{
				res.json({
					res_code : -1,
					res_error : err,
					res_body : {}
				});
			});
	    }
    
}

//导出模块
 module.exports=positionControllers;