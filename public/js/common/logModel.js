function logModel() { 
    this.createDom();
    this.longin();
 }

 logModel.template=`<div class="modal fade" id="logmyModal">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="logmyModalLabel">用户登录</h4>
                    </div>
                    <div class="modal-body">
                    <div class="alert alert-danger hide log_error" role="alert">用户名或密码错误</div>
                        <form class="users-login">
                            <div class="form-group">
                                <label for="logusername">用户名</label>
                                <input type="text" class="form-control" name="username" id="logusername" placeholder="请输入用户名">
                            </div>
                            <div class="form-group">
                                <label for="logpassword">密码</label>
                                <input type="password" class="form-control" name="password" id="logpassword" placeholder="请输入密码">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                    
                    <button type="button" class="btn btn-primary" id="logbtn">登录</button>
                    </div>
                </div>
                </div>
</div>`;

$.extend(logModel.prototype,{
    //创建DOM元素
    createDom:function () {  
        $(logModel.template).appendTo("body");
    },
    //登录用户
    longin:function(){
        $("#logbtn").on("click",function () { 
            // console.log(55);
              $.post("/api/users/login",$(".users-login").serialize(),function (data) { 
                    console.log(data);
                    if(data.res_code===1){//登录成功
                        $("#logmyModal").modal("hide");
                        $(".log_error").addClass("hide");
                        // $(".login-head").addClass("hide");
                        $(".login-success").removeClass("hide").prev("ul").hide();
                        $(".login-success a:first").text("欢迎你："+data.res_body.username);
                        $(".head_error").addClass("hide");
                    }else{
                        $(".log_error").removeClass("hide");
                    }
               },"json");
         });
       
    }
});