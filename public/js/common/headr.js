//构造函数
function head() { 
    this.createDom();
    this.regModel();
    this.logModel();
    this.loginout();
    this.logincheck();
    this.zhiwei();
    // this.positioncheck();
 }
 //头部结构模板
 head.template=` <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                    <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand position" href="#">职位管理系统</a>
                    </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/index.html">首页</a></li>
                        <li><a href="#" class="head_position">职位管理</a></li>
                    
                    </ul>
                
                    <ul class="nav navbar-nav navbar-right login-head">
                        <li data-toggle="modal" data-target="#logmyModal"><a href="#">登录</a></li>
                        <li data-toggle="modal" data-target="#regmyModal"><a href="#">注册</a></li>
                    </ul> 
                    <ul class="nav navbar-nav navbar-right hide login-success">
                        <li><a href="#">欢迎登录</a></li>
                        <li class="duichu"><a href="#">退出登录</a></li>
                    </ul>
                </div>
            </div>
</nav>`;

//原型继承
$.extend(head.prototype,{
    //创建头部DOM
    createDom:function () { 
        $(head.template).appendTo(".header");
     },
     //创建注册页面
     regModel:function(){
        new regModel();
     },
     //创建登录页面
     logModel:function () {
         new logModel();
       },
       //退出登录
    loginout:function () {
        $(".duichu").on("click",function () {
            $.get("/api/users/loginout",function (data) { 
                if(data.res_code===0){
                    $(".login-success").addClass("hide");
                    $(".login-head").show();
                    location="/index.html";
                }
             },"json");
          });
      },
      //判断是否登录
      logincheck:function () { 
            $.get("/api/users/check",function (data) {  
                if(data.res_code===0){
                    $(".login-success").removeClass("hide").prev("ul").hide();
                    $(".login-success a:first").text("欢迎你："+data.res_body);
                    // $(".head_error").addClass("hide");
                }else{
                    // $(".head_error").removeClass("hide");
                };
            },"json");
       },
       //点击职位管理判断是否登录
       zhiwei:function () {
            $(".head_position").on("click",function () { 
                $.get("/api/users/check",function (data) {  
                    if(data.res_code===0){//已登录
                       location="/html/position.html";
                    }else{
                        $(".head_error").removeClass("hide");
                    };
                },"json");
            });
         }
});
