//引入mongoose模块
 const mongoose=require("mongoose");
 //连接数据库
 mongoose.connect("mongodb://localhost:27017/position_add");
 //保存职位是的集合结构
 const schema=mongoose.Schema({
     logo:String,
     position:String,
     company:String,
     jingyan:String,
     leixing:String,
     didian:String,
     salary:Number
 });

 //生成数据库的文档模型
 const position=mongoose.model("position",schema);

 const positionModel={
     //保存职位数据到数据库
     save:function(positioninfo,success,error){
        //文档
         const pos=new position(positioninfo);
         //保存
          pos.save((err,data)=>{
            if(err){
                error(err);
                return;
            }
            success(data);
          });
     },
     //按页查询
     pagefind:function (pageIndex,success,error) { 
         //每页显示文档的的数量
         const pageSize=5;
         // 跳过 (pageIndex - 1) * pageSize 条文档数据，限定查询 pageSize 条文档数据
         position.find()
                        .sort({_id:-1})
                        .limit(pageSize)
                        .skip((pageIndex-1)*pageSize)
                        .then(success,error);
      },
      //修改
      positionupdete:function (upindex,success,error) { 
            const id=upindex[0];//修改条件
            const name=upindex[1];//修改的数据
            // console.log(upindex);
            position.update(id,name).then(success,error);
       },
       //删除
       positiondelete:function(idindex,success,error){
            position.deleteOne(idindex).then(success,error);
       },
       //查询全部数据
       positionselect:function (success,error) { 
           position.find().then(success,error);
        }
 }
 

 module.exports=positionModel;
