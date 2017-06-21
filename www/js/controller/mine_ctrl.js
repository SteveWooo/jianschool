var get_urlencoded_request = function(url,method,data){//封装request
  var req = {
     method: method,
     url: url,
     headers: {
       'Content-Type': "application/x-www-form-urlencoded",
     },
     //
     transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
     },
     //魔法
     data:data
  }
  return req;
}

starter_controllers
.controller('mine_ctrl', function($cordovaAppVersion,$ionicPopover,$http,$scope,$window,Mine,ls,$state,$ionicHistory,$ionicPopup,$ionicActionSheet,$cordovaImagePicker,Camera) {
  if(ionic.Platform.isIOS()){
    $scope.isIOS = true;
    console.log('ios')
  }

  $scope.isTeacher = function(){
    return ls.getObject('login_msg_client').teacher == '1';
  }

  $scope.page_state = ls.get("logined_client");//1：已登录 0：未登录 2：注册中 3：实名认证中
  console.log(ls.get("logined_client"));
  if(ls.get("logined_client")==1){
    Mine.get_mine();
  }
  $scope.mine = Mine.show();
  $scope.change_state=function(state){
    $scope.page_state = state;
  }

  $scope.about_us=function(){
    $ionicPopup.alert({
      title:"<b>关于我们</b>",
      template:"<div align='center' >\
        <img src='img/qq.jpg' style='width:100%;margin-left:0em'>\
        <p>↑QQ群：538564638↑</p> \
        <p>您的建议将是我们进步的动力</p>\
      </div>"
    })
  }

  var upgrade=function(v,url){
    $cordovaAppVersion.getVersionNumber().then(function (version) {
      if(v !== version){
        $ionicPopup.alert({
          title:"新版本发现:"+v,
          template:"<div align='center'>当前版本:"+version+"，是否安装新版本？</div>",
          buttons:[
            {
              text:"取消",
              type:"button",
              onTap:function(){
                return;
              }
            },
            {
              text:"确定",
              type:"button-positive",
              onTap:function(){
                window.open(url, '_system', 'location=yes');
              }
            }
          ]
        })
      }else {
        $ionicPopup.alert({
          title:"无新版本",
          template:"<div align='center'>当前版本:"+version+"</div>",
          buttons:[
            {
              text:"确定",
              type:"button-positive",
              onTap:function(){
                
              }
            }
          ]
        })
      }
    });
  }
  $scope.check_upgrade=function(){
    var req = get_urlencoded_request(ls.get("base_url")+"/Api/Common/checkVersion","get");
    $http(req).then(function(response){
      console.log(response);
      upgrade(response.data.version,response.data.download_url);
    },function(error){
      $ionicPopup.alert({
        title:"错误！",
        template:"<div align='center'>网络异常，请检查后再试</div>",
        buttons:[{
          text:"确定",
          type:"button-positive",
          onTap:function(){
            return;
          }
        }]
      })
    })
  }

  /*
    index of this js file:
    some tnormal tools,
    login & logout,
    register,
    verified
  */
  if(ls.get("last_mobile").length == 11){
    $scope.phone_login = ls.get("last_mobile");
  }
  $scope.log_out = function(){
    var logout = function(){
      ls.set("logined_client",0);
      ls.setObject("login_msg_client",null);
      var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/logout","get");
      $http(req).then(function(response){
        $ionicPopup.alert({
          title:"成功",
          template:"<div align='center'>登出成功</div>",
          buttons:[
            {
              text:"确定",
              type:"button-positive",
              onTap:function(){
                //window.location.reload();
                $scope.page_state = 0;
              }
            }
          ]
        })
      },function(response){
        warning_alert(response.stateText);
      });
    }
    $ionicPopup.alert({
       title: '注意！',
       template: '<div align="center">确定退出登录？</div>',
       buttons:[{
        text:"确定",
        type:"button-positive",
        onTap:function(){
          ls.set("last_mobile",ls.getObject("login_msg_client").mobile);
          $scope.phone_login = ls.get("last_mobile");
          logout();
        }
       },{
        text:"取消",
        onTap:function(){
          return;
        }
       }]
     });
    
  }

  //normal alert
  $scope.waiting = false;
  var warning_alert=function(content){
    $ionicPopup.alert({
      title:"警告！",
      template:"<div align='center'>"+content+"</div>"
    })
  } 
  var success_alert=function(content){
    $ionicPopup.alert({
      title:"成功",
      template:"<div align='center'>"+content+"</div>"
    })
  } 

  //登录注册
  $scope.login=function(){
    //..login
    var scope = get_scope('#login_page');
    var msg = {
      mobile:scope.phone_login,
      password:scope.password_login
    }
    if(msg.mobile == null){
      warning_alert("请输入手机号！");
      return ;
    }
    if(msg.password == null){
      warning_alert("请输入密码！");
      return;
    }
    var req = get_urlencoded_request(
        ls.get("base_url")+"/Api/User/login",
        "POST",
        msg
      );
    $scope.waiting = true;
    $http(req).then(function(response){
      $scope.waiting = false;
      if(response.data.error <0 ){
        $ionicPopup.alert({
          title:"注意！",
          template:"<div align='center'>"+response.data.msg+"</div>"
        })
        return ;
      }
      console.log(response);
      if(response.data.code == 1){
        $scope.waiting = false;
        var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/getPersonalInfo","Get");
        $http(req).then(function(response1){
          console.log(response1);
          if(response1.data.error < 0){
            $ionicPopup.alert({
              title:"注意！",
              template:"<div align='center'>"+response1.data.msg+"【请重试】</div>"
            })
            return ;
          }
          ls.setObject("login_msg_client",response1.data);
          if(response1.data.verified == '0'){
            $ionicPopup.alert({
              title:"成功",
              template:"<div align='center'>登录成功，请前往实名认证</div>",
              buttons:[
              {
                text:"确定",
                type:"button-positive",
                onTap:function(e){
                  ls.set("logined_client",3);
                  $scope.page_state = 3;
                }
              }
              ]
            })
          }else{
            $ionicPopup.alert({
              title:"成功",
              template:"<div align='center'>登陆成功</div>",
              buttons:[
                {
                  text:"确定",
                  type:"button-positive",
                  onTap:function(e){
                    ls.set("logined_client",1);
                    $scope.page_state = 1;
                    $state.go("tab.account");
                    Mine.get_mine();
                  }
                }
              ]
            })
          }
        })
      }
    },function(response1){
      console.log(response1);
      $scope.waiting = false;
      warning_alert("网络连接错误，请稍后重试");
    })
    //
  }



//--------------------------------------register--------------------------------------
  $scope.to_register=function(){
    $state.go("tab.account-register");
  }

  //获取验证码
  $('#unable_click_second').hide();
  $scope.unable_click_second = 59;
  $scope.get_phone_auth=function(){
    var mobile = get_scope('#account-register').mobile_register;
    if(mobile == null||mobile.length!=11||mobile.substring(0,1)!=1){
      $ionicPopup.alert({
         title: '警告！',
         template: '<div align="center">手机号码不正确</div>'
       });
      return ;
    }
    var req = get_urlencoded_request(
        ls.get("base_url")+"/Api/User/getMobileCode",
        'POST',
        {mobile: mobile}
      );
    $http(req).then(function success(response){
        if(response.data.error == -1){
            $ionicPopup.alert({
             title: '警告！',
             template: '<div align="center">'+response.data.msg+'</div>'
           });
          return;
        }
        count_backwards();
      },function error(response){
        console.log(response);
        $ionicPopup.alert({
           title: '警告！',
           template: '<div align="center">网络错误,请检查后重试</div>'
         });
        return ;
      })
   //-------------------------------巴拉拉jquery黑暗魔法-----------------
    var count_backwards = function(){
      $('#able_click_auth').hide();
      $('#unable_click_second').show();
      
      var interval = setInterval(function(){
        if($scope.unable_click_second<0){
          $('#unable_click_second').hide();
          $('#able_click_auth').show();
          $scope.unable_click_second = 59;
          $('#unable_click_second').html(60);
          clearInterval(interval);
        }
        else 
          $('#unable_click_second').html($scope.unable_click_second --);
      },1000)                                                               
    }
    //--------------------------------------------------------------------
  }

 $scope.passwordChange=function(){
   $state.go('tab.account-passwordChange');
 }

 $scope.passwordForget=function(){
    $state.go('tab.account-passwordForget');
 }
//submit register
  $scope.submit_register=function(){

    var scope = get_scope('#account-register');
    var password_check = scope.password_register_check;
    var msg = {
      mobile:scope.mobile_register,
      code:scope.auth_register,
      password:scope.password_register
    };
    //检验真理的时刻---------------------------------------------------
    if(msg.mobile == null||
      msg.code == null||
      msg.password == null){
      warning_alert("信息填写不完整！");
      return ;
    }

    if(msg.password.length<6||msg.password.length>16){
      warning_alert("密码长度必须在6-16之间");
      return;
    }

    if(msg.password!=password_check){
      warning_alert("两次密码不一样！");
      return;
    }

    if(msg.mobile.length!=11||msg.code.length<4||msg.code.length>8){
      warning_alert("信息填写错误！");
      return ;
    }
    //------------------------------------------------------------------
    var req = get_urlencoded_request(
      ls.get("base_url")+"/Api/User/register",
      'POST',
      msg
    );

    $scope.waiting = true;
    $http(req).then(function success(response){
      $scope.waiting = false;
      if(response.data.error < 0){
        warning_alert(response.data.msg);
        return;
      }
      var login_msg = {
        have_checked : false,
        msg : msg
      }
      //login once
      var testLogin=function(){
        var req = get_urlencoded_request(
          ls.get("base_url")+"/Api/User/login",
          'POST',
          {mobile:msg.mobile,password:msg.password}
        );
        $http(req).then(function(res){
          console.log(res);
        },function(error){
          $ionicPopup.alert({
           title: '警告！',
           template: '<div align="center">网络错误,请检查后重试</div>'
         });
          return ;
        })
      }
      testLogin();
      success_alert("注册成功,请登录！");
      $scope.page_state = 0;
      ls.set("logined_client",0);
      ls.set("last_mobile",msg.mobile);
      $('#login_mobile').html(msg.mobile);
      $scope.phone_login = ls.get("last_mobile");
      $state.go("tab.account");
    },function error(response){
      console.log(response);
      $scope.waiting = false;
      $ionicPopup.alert({
         title: '警告！',
         template: '<div align="center">网络错误,请检查后重试</div>'
       });
      return ;
    })
  }


//-----------------------verified--------------------------------------
  var template = "";

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $ionicPopover.fromTemplateUrl('choice_popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event,index) {
    $scope.popover_list_show = index;
    $scope.popover_list = ls.getObject("verified_item");
    $scope.popover.show($event);
  };

  $scope.select_school_popover=function(index){
    $scope.popover_school_index = index;
    $scope.school_verified = $scope.popover_list[index].name;
    $scope.verified_msg.school_id = $scope.popover_list[index].id;
    $scope.major_list = $scope.popover_list[$scope.popover_school_index].majors;
  }
  $scope.select_major_popover=function(index){
    $scope.major_verified = $scope.major_list[index].name;
    $scope.verified_msg.major_id = $scope.major_list[index].id;
  }
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  $scope.$on('popover.hidden', function() {
  });
  $scope.$on('popover.removed', function() {
  });

  $scope.verified_msg = new Object();
  $scope.school_verified = "点击选择学校";
  $scope.major_verified = "点击选择专业";
  $scope.popover_list_show = 0;//0 school;1 major
  $scope.popover_list;$scope.popover_school_index;$scope.major_list;//学校列表&学校index&专业列表
  $scope.to_verified = function(){
    var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/getSchoolsInfo","get");
    $http(req).then(function(response){
      console.log(response);
      ls.setObject("verified_item",response.data);
      $state.go("tab.account-personalCheck");
    },function(response){
      $ionicPopup.alert({
         title: '警告！',
         template: '<div align="center">网络错误,请检查后重试</div>'
       });
    })
    
  }
  $scope.to_teacher_verified = function(){
    $state.go("tab.account-teacherCheck");
  }
  $scope.verified_msg.gender = null;
  $scope.choose_gender=function(){
    var sheet = $ionicActionSheet.show({
      buttons:[
        {text:"<div align='center'><strong>男</strong></div>" },
        {text:"<div align='center'><b>女</b></div>"}
      ],
      titleText: '<div align="center">请选择性别</div>',
      cancelText: '取消',
      buttonClicked:function(index){
        if(index == 0){
          $scope.gender_verified = "男",
          $scope.verified_msg.gender = '1';
          sheet();
          return;
        }
        $scope.gender_verified = "女",
        $scope.verified_msg.gender = '2';    
        sheet();
      }
    })
  }

  $scope.submit_verified = function(){
    var scope = get_scope("#account-verified");
    if($scope.verified_msg.school_id == null||$scope.verified_msg.major_id == null){
      warning_alert("漏选学校或专业啦");
      return;
    }
    $scope.verified_msg.student_id = scope.student_id_verified;
    $scope.verified_msg.realname = scope.realname_verified;
    $scope.verified_msg.idcard = scope.idcard_verified;
    for(var msg in $scope.verified_msg){
      if($scope.verified_msg[msg] == ""||$scope.verified_msg[msg] == null){
        warning_alert("漏填信息啦");
        return;
      }
    }
    $scope.verified_msg.teacher = 0;//学生是0
    var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/verify","POST",$scope.verified_msg);
    $http(req).then(function(response){
      if(response.data.error < 0){
        warning_alert(response.data.msg);
      }else {
        var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/getPersonalInfo","get");
        $http(req).then(function(response){
          if(response.data.error<0){
              warning_alert(response.data.msg);
              return;
            }
          ls.setObject("login_msg_client",response.data);
        },function(){
          warning_alert("网络异常，请稍后再试");
        })
        
        $ionicPopup.alert({
          title:"成功",
          template:"<div align='center'>实名认证成功！</div>",
          buttons:[
            {
              type:"button-positive",
              text:"确定",
              onTap:function(){
                ls.set("logined_client",1);
                $scope.page_state = 1;
                $state.go('tab.account');
                window.location.href="index.html#/tab/consult";
                window.location.reload();
              }
            }
          ]
        })
      }
    },function(response){
      warning_alert(response.stateText);
    })
  }



//another
  $scope.getPhoto = function() {//相机
     Camera.getPicture().then(function(imageURL) {
        Mine.change_msg("portrait",imageURL);
      }, function(err) {
        console.err(err);
        alert("图片获取失败");
      });
    };

    /*
      此方法照抄 勿动
    */
   $scope.pickImage = function () {  //相册
      var options = {  
          maximumImagesCount: 1,  
          width: 800,  
          height: 800,  
          quality: 80  
      };  
        
      $cordovaImagePicker.getPictures(options)  
          .then(function (results) {  
              Mine.change_msg("portrait",results[0]);
          }, function (error) {  
              // error getting photos 
              alert("图片获取失败");
          });  
      }

  $scope.show_img_choose = function(){
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<div align="center">拍照上传</div>' },
         { text: '<div align="center">本地图片</div>' }
       ],
       // destructiveText: '<div align="center">取消</div>',
       titleText: '选择照片上传方式',
       cancelText: '取消',
       cancel: function() {
            // add cancel code..
            return;
       },
       buttonClicked: function(index) {
         switch(index){
           case 0:
           $scope.getPhoto();
           break;
           case 1:
           $scope.pickImage();
           break;
         }
         return true;
       },
       destructiveButtonClicked:function(){
        hideSheet();
       }
     });
   };

  $scope.submit_change = function(change_msg){
    switch(change_msg){
      case 'nick':
        var nick_temp = angular.element(document.querySelector('#nick_change_page')).scope().msg_temp;
        var reg = /\s/g;
        if(nick_temp==null||reg.test(nick_temp) === true||nick_temp.length>=15||nick_temp.length===0){
           var alertPopup = $ionicPopup.alert({
             title: '错误',
             template: '输入非法字符'
           });
           alertPopup.then(function(res) {
             
           });
          return ;
        }
        if(Mine.change_msg(change_msg,nick_temp)===false){
           var alertPopup = $ionicPopup.alert({
             title: '错误',
             template: '修改失败，请重试'
           });
           alertPopup.then(function(res) {
             
           });
          return;
        }
      break;

      case 'sign':
        var sign_temp = angular.element(document.querySelector('#nick_change_page')).scope().msg_temp;
        var reg = /\s/g;
        if(reg.test(sign_temp) === true||sign_temp.length>=30||sign_temp.length===0){
           var alertPopup = $ionicPopup.alert({
             title: '错误',
             template: '输入非法字符'
           });
           alertPopup.then(function(res) {
             
           });
          return ;
        }
        if(Mine.change_msg(change_msg,sign_temp)===false){
           var alertPopup = $ionicPopup.alert({
             title: '错误',
             template: '修改失败，请重试'
           });
           alertPopup.then(function(res) {
             
           });
          return;
        }
      break;

      case "portrait":


      break;
    }
  	
  	$ionicHistory.goBack();
  }
})

.controller('password_forget_ctrl',function($scope,$http,$ionicPopup,ls,$state){
  $scope.waiting = false;
  var init=function(){
    $('#get_code_time').hide();
  }
  init();

  var ion_alert=function(content){
    $ionicPopup.alert({
      title:"注意",
      template:"<div align='center'>"+content+"</div>"
    })
  }

  $scope.submit=function(){
    var mobile = $('#mobile').val();
    var password = $('#password').val();
    var passwordCheck = $('#password_check').val();
    var auth_code = $('#auth_code').val();
    if(auth_code.length != 6){
      ion_alert("请输入正确验证码");
      return;
    }
    console.log(password);
    console.log(passwordCheck);
    if(password!=passwordCheck){
      ion_alert("两次密码不一样！");
      return;
    }
    if(password.length<6||password.length>16){
      ion_alert("密码长度必须在6-16之间");
      return;
    }
    submit_http(mobile,auth_code,password);
  }
  var submit_http=function(mobile,auth,new_password){
    $scope.waiting = true;
    var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/forgetPwd",
      "POST",
      {mobile:mobile,code:auth,password:new_password});
    $http(req).then(function(response){
      $scope.waiting = false;
      if(response.data.error<0){
        ion_alert(response.data.msg);
        return;
      }
      ion_alert(response.data.msg);
      window.location.href="index.html#/tab/account";
    },function(error){
      ion_alert("网络连接错误，请稍后重试");
      $scope.waiting = false;
    })
  }

  $scope.get_phone_auth=function(){
    var mobile = $('#mobile').val();
    if(mobile.length!=11){
      ion_alert("手机号错误！");
      return;
    }
    $('#get_code_button').hide();
    $('#get_code_time').show();
    get_phone_auth_http(mobile);
  }
  
  var get_phone_auth_http=function(_mobile){
    var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/getMobileCode",
      "POST",
      {mobile:_mobile});
    $scope.waiting = true;
    $http(req).then(function(response){
      $scope.waiting = false;
      console.log(response)
      if(response.data.error!=null){
        ion_alert(response.data.msg);
        return;
      }
      timeLess();
    },function(error){
      ion_alert("网络连接错误，请稍后重试");
      $scope.waiting = false;
    })
  }
  var allTime = 60;
  var timeLess=function(){
    var time = allTime;
    $('#get_code_time').html(time);
    var interval = setInterval(function(){
        if(time<=0){
          $('#get_code_time').hide();
          $('#get_code_button').show();
          time = allTime;
          clearInterval(interval);
        }
        else {
          time -- ;
          $('#get_code_time').html(time);
        }
    },1000);
  } 
})

.controller("password_change_ctrl",function($scope,$http,$ionicPopup,ls,$state){
  var init=function(){
    $scope.waiting = false;
  }
  init();

  var ion_alert=function(content){
    $ionicPopup.alert({
      title:"注意",
      template:"<div align='center'>"+content+"</div>"
    })
  }

  $scope.submit=function(){
    var old_password = $('#old_password').val();
    var password = $('#password').val();
    var passwordCheck = $('#password_check').val();
    var mobile = ls.getObject("login_msg_client").mobile;
    if(old_password.length === 0){
      ion_alert("请输入密码");
      return;
    }
    if(password!==passwordCheck){
      ion_alert("两次密码不一样！");
      return;
    }
    if(password.length<6||password.length>16){
      ion_alert("密码长度限制为6-16位");
      return;
    }
    submit_http(mobile,old_password,password);
  }
  var submit_http=function(mobile,old_password,new_password){
    $scope.waiting = true;
    var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/changePwd",
      "POST",
      { 
        mobile:mobile,
        oldPassword:old_password,
        newPassword:new_password
      });
    $http(req).then(function(response){
      $scope.waiting = false;
      ion_alert(response.data.msg);
      if(response.data.error<0){
        return;
      }
      $state.go("tab.account");
    },function(error){
      $scope.waiting = false;
      ion_alert("网络连接错误，请稍后重试");
    })
  }
})

.controller('mine_teacher_ctrl',function($scope,$http,$ionicPopup,$ionicActionSheet,ls,$state){
    var warning_alert=function(content){
      $ionicPopup.alert({
        title:"警告！",
        template:"<div align='center'>"+content+"</div>"
      })
    } 
    $scope.gender_verified;
    $scope.verified_msg = {};
    $scope.choose_gender=function(){
      var sheet = $ionicActionSheet.show({
        buttons:[
          {text:"<div align='center'><strong>男</strong></div>" },
          {text:"<div align='center'><b>女</b></div>"}
        ],
        titleText: '<div align="center">请选择性别</div>',
        cancelText: '取消',
        buttonClicked:function(index){
          if(index == 0){
            $scope.gender_verified = "男",
            $scope.verified_msg.gender = '1';
            sheet();
            return;
          }
          $scope.gender_verified = "女",
          $scope.verified_msg.gender = '2';    
          sheet();
        }
      })
    }

    //submit
    $scope.submit_verified = function(){

      var submitMsg = {};
      submitMsg.gender = $scope.verified_msg.gender;
      submitMsg.job_number = $('#job_number').val();
      submitMsg.realname = $('#realname_verified').val();
      submitMsg.idcard = $('#idcard_verified').val();
      submitMsg.teacher = 1;
      submitMsg.school_id = 1;

      var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/verify","POST",submitMsg);
      console.log(req);
      $http(req).then(function(response){
        console.log(response);
        if(response.data.error < 0){
          warning_alert(response.data.msg);
        }else {
          var req = get_urlencoded_request(ls.get("base_url")+"/Api/User/getPersonalInfo","get");
          $http(req).then(function(response){
            if(response.data.error<0){
              warning_alert(response.data.msg);
              return;
            }
            ls.setObject("login_msg_client",response.data);

          },function(){
            warning_alert("网络异常，请稍后再试");
          })
          
          $ionicPopup.alert({
            title:"成功",
            template:"<div align='center'>实名认证成功！</div>",
            buttons:[
              {
                type:"button-positive",
                text:"确定",
                onTap:function(){
                  ls.set("logined_client",1);
                  $scope.page_state = 1;
                  $state.go('tab.account');


                  //

                  window.location.href="index.html#/tab/consult";
                  window.location.reload();
                }
              }
            ]
          })
        }
      },function(response){
        warning_alert(response.stateText);
      })
    

    }
})


.controller('drom_change_ctrl',function($scope,$http,$ionicPopup,$ionicActionSheet,ls, $state, Mine, $ionicHistory){

    var warning_alert=function(content){
      $ionicPopup.alert({
        title:"警告！",
        template:"<div align='center'>"+content+"</div>"
      })
    } 


    {
      var req = get_urlencoded_request(ls.get('base_url')+'/Api/UserRepair/getAreas',"get");
      $http(req).then(function(response){
        if(response.data.error === -998 || response.data.error === -999){
          $ionicPopup.alert({
            title:"登录超时",
            template:"<div align='center'>请重新登录！</div>"
          })
          return;
        }
        if(response.data.error < 0){
          warning_alert(response.data.msg);
          return;
        }
        $scope.all_areas = [];
        for(var i=0;i<response.data.length;i++){
          if(response.data[i].public === '0'){
            $scope.all_areas.push(response.data[i]);
          }
        }

      },function(error){
        warning_alert("网络异常");
      })
    }//get areas     init



    var findIdInarea = function(name){
      for(var i = 0;i<$scope.all_areas.length;i++){
        if(name === $scope.all_areas[i].name){
          return $scope.all_areas[i].id;
        }
      }
    }

    console.log(ls.getObject('login_msg_client'));



    
    $scope.submit = function(){

      var data = {
        dormitory_id:findIdInarea($('#dorm_change').val()),
        room:$('#dorm_number').val()
      }
      console.log(data);
      var req = get_urlencoded_request(ls.get('base_url')+"/Api/User/setting","POST",data);
      $http(req).then(function(response){
        if(response.data.error === -998 || response.data.error === -999){
          $ionicPopup.alert({
            title:"登录超时",
            template:"<div align='center'>请重新登录！</div>"
          })
          return;
        }
        if(response.data.error < 0){
          warning_alert(response.data.msg);
          return;
        }
        $ionicPopup.alert({
          title:"成功",
          template:"<div align='center'>修改成功！</div>",
          buttons:[
            {
              type:"button-positive",
              text:"确定",
              onTap:function(){
                ls.getPersonalInfo();
                var obj = ls.getObject('login_msg_client');
                obj.dormitory.name = $('#dorm_change').val();
                obj.room = $('#dorm_number').val();
                ls.setObject("login_msg_client",obj);
                // window.location.href="index.html#/tab/account";
                // window.location.reload();
                $ionicHistory.goBack();
                // console.log(ls.getObject('login_msg_client'));
              }
            }
          ]
        })

      },function(error){
        warning_alert("网络异常");
      })

    }
    




})
