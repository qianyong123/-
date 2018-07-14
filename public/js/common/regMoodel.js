//创建构造函数
function regModel() { 
    this.createDom();
    this.addListener();
 }

//创建模板
regModel.template=` <div class="modal fade" id="regmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="regmyModalLabel">用户注册</h4>
            </div>
            <div class="modal-body">
            <div class="alert alert-success hide reg_seccess" role="alert">用户可以注册</div>
            <div class="alert alert-danger hide reg_error" role="alert">用户已存在</div>
                <form class="reg-form">
                    <div class="form-group">
                        <label for="regusername">用户名</label>
                        <input type="text" class="form-control" name="username" id="regusername" placeholder="请输入用户名">
                    </div>
                    <div class="form-group">
                        <label for="regpassword">密码</label>
                        <input type="password" class="form-control" name="password" id="regpassword" placeholder="请输入密码">
                    </div>
                    <div class="form-group">
                            <label for="quepassword">确认密码</label>
                            <input type="text" class="form-control" id="quepassword" placeholder="确认密码">
                        </div>
                        <div class="form-group">
                            <label for="regemaill">邮箱</label>
                            <input type="text" class="form-control" name="email" id="regemaill" placeholder="请输入emaill">
                        </div>
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="regbtn">注册</button>
            </div>
          </div>
        </div>
    </div>`;

 $.extend(regModel.prototype,{
     //创建DOM元素
     createDom:function () { 
        $(regModel.template).appendTo("body");
      },
    //   用户注册
      addListener:function () {
          $("#regbtn").on("click",$.proxy(this.handleRegidter,this));
           //失去焦点验证
          $("#regusername").on("blur",this.blur);
        },
       //处理用户注册的事件方法
       handleRegidter:function () {  
           //异步ajax将注册用户信息保存到服务器
           $.post("/api/users/register",$(".reg-form").serialize(),function (data) { 
                if(data.res_code===0){//成功
                    $("#regmyModal").modal("hide");
                }else{
                    $("#res_error").removeClass("hide").text("用户注册失败");
                }
                console.log(data.res_body); 
            },"json");
             
       },
       //失去焦点验证
       blur:function () { 
           var username=$("#regusername").val();
           $.get("/api/users/blur",{username},function (data) { 
                if(data.res_code===1){//已存在
                    // console.log(data);     
                   $(".reg_error").removeClass("hide");
                   $(".reg_seccess").addClass("hide");
                }else{
                    $(".reg_error").addClass("hide");
                    $(".reg_seccess").removeClass("hide");
                }
            },"json");
        }
 });