function position(){
    this.crateDom();
    this.addListener();
    this.position();
    this.updete();
    this.select();
}

$.extend(position.prototype,{
    crateDom:function(){
        //创建头部对象
        new head();
        //设置管理系统的class名字
        $(".navbar-collapse ul:first li:last").addClass("active").siblings().removeClass("active");
    },
    // 添加事件监听
    addListener:function(){
        //点击添加
        $("#inbtn").on("click",$.proxy(this.addfunction,this));
        //存下外面的额this
        const that=this;
        //获取当前点击的页码
        $(".page-list").on("click",".li",function(){
            var curr=$(this).find("a").text();
            //调用listpage查询
            that.listpage(curr);
            $(this).addClass("active").siblings().removeClass("active");
            // console.log(11);
        });
    },
    //添加数据
    addfunction:function () { 
        // console.log(21)
        //创建formData对象
        var formData=new FormData($(".addform").get(0));
        //用ajax请求向服务器发送数据，包括图形等
        $.ajax({
            type:"post",    //要上传资源 请求方式必须是post请求
            url:"/api/positions/add",
            dataType:"json",    //返回是json数据
            data:formData,  //要上传的数据
            processData:false,  //不需要将上传的数据转换成字符串
            contentType:false,   //不需要设置contentType头
            success:(data)=>{
                if(data.res_code===0){//成功
                    $("#tianmyModal").modal("hide");
                    $(".selet_error").addClass("hide");
                    // console.log(data);
                    this.listpage(1);
                    this.select();
                }else{//失败
                    $(".selet_error").removeClass("hide");
                    $(".selet_error").text("添加失败:"+data.res_error);
                }
              }
        });
     },
     //登录显示数据
     position:function () { 
        $.get("/api/users/check",(data)=>{ 
            if(data.res_code===-1){
                location="/index.html";
            }  else{
                this.listpage(1);
            } 
         },"json");
      },
     //按页查询数据并渲染
     listpage:function (curr) { 
         // 如果没有页码，默认查询第1页
		    curr= curr || 1;
            //get查询
            $.get("/api/positions/list",{pageIndex:curr},(data)=> {
                if(data.res_code===0){
                    const html=template("position_list",{list:data.res_body});
                    // console.log(data);
                    $(".table-list tbody").html(html);
                    $("tbody td").css({
                        "height": 68+"px",
                        "line-height":68+"px",
                        "padding":0
                    });
                    //删除
                    this.delete();
                   //渲染修改模态框的数据
                   this.positionupdete();
                }else{
                    alert("查询失败");
                }
              },"json");
            //   console.log(88)
      },
     //修改数据
     updete:function () { 
         $("#upbtn").on("click", ()=> { 
                    //创建formData对象
                var formData=new FormData($(".upform").get(0));
                //用ajax请求向服务器发送数据，包括图形等
                $.ajax({
                    type:"post",    //要上传资源 请求方式必须是post请求
                    url:"/api/positions/updete",
                    dataType:"json",    //返回是json数据
                    data:formData,  //要上传的数据
                    processData:false,  //不需要将上传的数据转换成字符串
                    contentType:false,   //不需要设置contentType头
                    success:(data)=>{
                        if(data.res_code===0){//成功
                            $("#upmyModal").modal("hide");
                            this.listpage(1);
                            $(".upform").trigger("reset");//重置表单
                            // location.reload();
                            $(".up_error").addClass("hide");
                        }else{
                            $(".up_error").removeClass("hide");
                            $(".up_error").text("用户修改失败："+data.res_error);
                        }
                        // console.log(data);
                        
                    }
                });          
          });
      },
      //把页面数据显示到模态框
      positionupdete:function () { 
             //把页面数据显示到模态框
             $(".updete").on("click",function () { 
                //获取这行的数据
                var position=$(this).parents("tr").find(".position").text(),
                    company=$(this).parents("tr").find(".company").text(),
                    jingyan=$(this).parents("tr").find(".jingyan").text(),
                    leixing=$(this).parents("tr").find(".leixing").text(),
                    didian=$(this).parents("tr").find(".didian").text(),
                    salary=$(this).parents("tr").find(".salary").text(),
                    logo=$(this).parents("tr").find(".logo img").attr("src"),
                    id=$(this).parents("tr").data("id");
                    // console.log(id);
                // console.log(position,company,jingyan,leixing,didian,salary,logo);
                //   $("#uplogo").val(logo);
                //渲染模态框的数据
                  $("#upposition").val(position);
                  $("#upcompany").val(company);
                  $("#upgongjingye").val(jingyan);
                  $("#upleixing").val(leixing);
                  $("#updidian").val(didian);
                  $("#upxinzhi").val(salary); 
                  $("#upid").val(id);
                  $(".logo_exist").val(logo);
                //   console.log(logo);               
             });
       },
      //删除数据
      delete:function () { 
          var that=this;
            $(".delete").on("click",function () { 
                 var id= $(this).parents("tr").data("id");
                 var tr=$(this).parents("tr");
                $.get("/api/positions/delete",{id},function (data) { 
                    if(data.res_code===0){
                        // console.log(data);
                        tr.remove();
                        that.select();
                        that.listpage();
                    }
                 },"json");
            });
       },
       //查询全部数据
       select:function () { 
           $.get("/api/positions/select",(data)=>{
                var len=data.res_body.length;
                var li=Math.ceil(len/5);
                
                var html="";
                for(let i=1;i<=li;i++){
                        html+=` <li class="li"><a href="#">${i}</a></li>`
                };
                //    console.log(html);
                $(".fengye").html(html);
                $(".fengye li:first").addClass("active");
                var li1=`<li class="leftye">
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>`;
                var li2=`<li class="rightye">
                <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
                    </li>`;
                    if(len!=0){
                        $(".fengye").prepend(li1);
                        $(".fengye").append(li2);
                    }
                
                this.clickye();
             });
        },
        //点击翻页
        clickye:function () { 
            var that=this;
            //向后翻页
            $(".leftye").click(function () {  
                var index=$(this).parents(".fengye").find(".active").text();
                if(index!=1){
                    $(this).siblings(".li").eq(index-2)
                    .addClass("active").siblings().removeClass("active"); 
                    // console.log(index);s
                    that.listpage(index-1);
                }
                  
             });
             //向前翻页
             $(".rightye").click(function () { 
                var index=$(this).parents(".fengye").find(".active").text();
                 var lis=$(this).siblings(".li").length;
                    $(this).siblings(".li").eq(index)
                    .addClass("active").siblings().removeClass("active"); 
                var page=Number(index)+1;
                if(page<lis+1){
                    that.listpage(page);
                }
                ;
                // console.log(page);
             });
         }
});

new position();