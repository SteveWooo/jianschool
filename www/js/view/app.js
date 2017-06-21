// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','locals', 'ngCordova','starter.controllers', 'starter.services'])

.run(function($ionicPlatform,ls,$window,$cordovaAppVersion,$http, $ionicPopup ,$ionicHistory, $rootScope, $location) {
  ls.set("base_url","http://jianxiaoyuan.com:9999");
  ls.set("cdn_path","/Public/Upload/");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // window.plugins.jPushPlugin.init();
    //ls.set("base_url","http://test.jianxiaoyuan.com");
    
    ls.set("cdn_path","/Public/Upload/");
    if(ls.get("first_login_client") == null){
      //$window.location.reload();
      ls.set("first_login_client",1);
    }
    ls.set("last_mobile","0");
    if(ls.getObject("login_msg_client") == null){
      ls.set("logined_client",0);//1:已登录 0:未登录 3:实名认证 2:注册中
    }

    if(ls.getObject("login_msg_client")!=null&&ls.getObject("login_msg_client").verified == '0'){
      ls.set("logined_client",3);
    }
    
    if(ls.getObject("login_msg_client")!=null&&ls.getObject("login_msg_client").verified == '1'){
      ls.set("logined_client",1);
    }
    //ls.set("login_msg_client",null)
    ls.set("first_in_repair",1);

    //checkVersion
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

    var upgrade=function(v,url,notice){
       $cordovaAppVersion.getVersionNumber().then(function (version){
          if(v !== version){
            $ionicPopup.alert({
              title:"新版本发现:"+v,
              template:"<div align='center'>当前版本:"+version+"，是否安装新版本？<br>"+notice+"</div>",
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
          }
       })
    }
    
    var checkVersion=function(){
      var req = get_urlencoded_request(ls.get("base_url")+"/Api/Common/checkVersion","get");
      $http(req).then(function(response){
        // console.log(response);
        upgrade(response.data.version,response.data.download_url,response.data.notice);
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
    

    if(ionic.Platform.isAndroid()){
      checkVersion();
    }

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $ionicPlatform.registerBackButtonAction(function (event) {
      // $ionicHistory.goBack();

      if ($location.path() == '/tab/consult' || $location.path() == '/tab/tools' || $location.path() == '/tab/account' || $location.path() == '/electric_tab/electric_check' || $location.path() == '/repair_tab/myrepair') {
          if ($rootScope.backButtonPressedOnceToExit) {
              ionic.Platform.exitApp();
          } else {
              $rootScope.backButtonPressedOnceToExit = true;
              // $cordovaToast.showShortTop('再按一次退出系统');
              setTimeout(function () {
                  $rootScope.backButtonPressedOnceToExit = false;
              }, 800);
          }
      }
      // else if ($ionicHistory.backView()) {
      //     $ionicHistory.goBack();
      // } else {
      //     $rootScope.backButtonPressedOnceToExit = true;
      //     // $cordovaToast.showShortTop('再按一次退出系统');
      //     setTimeout(function () {
      //         $rootScope.backButtonPressedOnceToExit = false;
      //     }, 2000);
      // }
      else {
        $ionicHistory.goBack();
      }
      event.preventDefault();
      return false;

    },101)
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider ,$httpProvider) {

    $httpProvider.defaults.withCredentials = true;//默认保存cookie资格

    $ionicConfigProvider.platform.ios.tabs.style('standard'); 
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

    $ionicConfigProvider.platform.ios.views.transition('ios'); 
    $ionicConfigProvider.platform.android.views.transition('android');

    $ionicConfigProvider.views.maxCache(30);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('ticket_tab', {
    url: '/ticket_tab',
    abstract: true,
    templateUrl: 'tab-ticket/tabs.html'
  })

  .state('ticket_tab.buy_ticket', {
    url:'/buy_ticket',
    views: {
      'buy_ticket':{
        templateUrl:'tab-ticket/buy_ticket.html',
        controller:'buy_ticket_ctrl'
      }
    }
  })

  .state('ticket_tab.buy_ticket_detail', {
    url: '/buy_ticket/buy_ticket_detail?beginPathId&endPathId&time',
    views: {
      'buy_ticket': {
        templateUrl: 'tab-ticket/buy_ticket_detail.html',
        controller: 'buy_ticket_detail_ctrl'
      }
    }
  })

  .state('ticket_tab.buy_ticket_detail_submit', {
    url: '/buy_ticket/buy_ticket_detail_submit?ticketId&beginPathId&endPathId&time',
    views: {
      'buy_ticket': {
        templateUrl: 'tab-ticket/buy_ticket_detail_submit.html',
        controller: 'buy_ticket_detail_submit_ctrl'
      }
    }
  })


  .state('ticket_tab.use_ticket', {
    url:'/use_ticket',
    views: {
      'use_ticket':{
        templateUrl:'tab-ticket/use_ticket.html',
        controller:'use_ticket_ctrl'
      }
    }
  })

  .state('ticket_tab.use_ticket_scan', {
    url:'/use_ticket/use_ticket_scan?ticketId',
    views: {
      'use_ticket':{
        templateUrl:'tab-ticket/use_ticket_scan.html',
        controller:'use_ticket_scan_ctrl'
      }
    }
  })

  .state('ticket_tab.check_ticket', {
    url:'/check_ticket',
    views: {
      'check_ticket':{
        templateUrl:'tab-ticket/check_ticket.html',
        controller:'check_ticket_ctrl'
      }
    }
  })

  .state('ticket_tab.check_ticket_detail', {
    url:'/check_ticket/check_ticket_detail?orderId&price',
    views: {
      'check_ticket':{
        templateUrl:'tab-ticket/check_ticket_detail.html',
        controller:'check_ticket_detail_ctrl'
      }
    }
  })

  .state('electric_tab', {
    url: '/electric_tab',
    abstract: true,
    templateUrl: 'tab-electric/tabs.html'
  })

  .state('electric_tab.electric_check', {
    url: '/electric_check',
    views: {
      'electric_check': {
        templateUrl: 'tab-electric/tab-electric_check.html',
        controller: 'electric_check_ctrl'
      }
    }
  })


  .state('repair_tab', {
    url: '/repair_tab',
    abstract: true,
    templateUrl: 'tab-repair/tabs.html'
  })

  .state('repair_tab.myrepair', {
    url: '/myrepair',
    views: {
      'myrepair': {
        templateUrl: 'tab-repair/tab-myrepair.html',
        controller: 'mine_repair_ctrl'
      }
    }
  })

  .state('repair_tab.repair_detail', {
    url: '/myrepair/repair_detail',
    views: {
      'myrepair': {
        templateUrl: 'tab-repair/repair_detail.html',
        controller: 'repair_detail_ctrl'
      }
    }
  })

  .state('repair_tab.evaluate', {
    url: '/myrepair/repair_detail/evaluate',
    views: {
      'myrepair': {
        templateUrl: 'tab-repair/evaluate.html',
        controller: 'evalute_ctrl'
      }
    }
  })

  .state('repair_tab.newrepair', {
    url: '/newrepair',
    views: {
      'newrepair': {
        templateUrl: 'tab-repair/tab-newrepair.html',
        controller: 'repair_ctrl'
      }
    }
  })

  .state('food_tab', {
    url: '/food_tab',
    abstract: true,
    templateUrl: 'templates/food_tabs.html'
  })

  .state('food_tab.index', {
    url: '/index',
    views: {
      'food_tab-index': {
        templateUrl: 'templates/food_tab-index.html',
        controller: 'foods_ctrl'
      }
    }
  })

  .state('food_tab.index-detail', {
    url: '/index/index-detail',
    views: {
      'food_tab-index': {
        templateUrl: 'templates/food_tab-index-detail.html',
        controller: 'index-detail_ctrl'
      }
    }
  })

  .state('food_tab.my_list', {
    url: '/my_list',
    views: {
      'food_tab-my_list': {
        templateUrl: 'templates/food_tab-my_list.html',
        controller: 'food_list_ctrl'
      }
    }
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.consult', {
    url: '/consult',
    views: {
      'tab-consult': {
        templateUrl: 'templates/tab-consult.html',
        controller: 'consult_ctrl'
      }
    }
  })

  .state('tab.consult-detail', {
    url: '/consult/:news_id',
    views: {
      'tab-consult': {
        templateUrl: 'templates/tab-consult-detail.html',
        controller: 'consult_detail_ctrl'
      }
    }
  })

  .state('tab.tools', {
      url: '/tools',
      views: {
        'tab-tools': {
          templateUrl: 'templates/tab-tools.html',
          controller: 'tools_ctrl'
        }
      }
    })
    .state('tab.tools-detail', {
      url: '/tools/:detail_id',
      views: {
        'tab-tools': {
          templateUrl: 'templates/tab-tools-detail.html',
          controller: 'tools_detail_ctrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'mine_ctrl'
      }
    }
  })

  .state('tab.account-passwordForget', {
    url: '/account/passwordForget',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-password-forget.html',
        controller: 'password_forget_ctrl'
      }
    }
  })

  .state('tab.account-passwordChange', {
    url: '/account/passwordChange',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-password-change.html',
        controller: 'password_change_ctrl'
      }
    }
  })

  .state('tab.account-dromChange', {
    url: '/account/dromChange',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-change-drom.html',
        controller: 'drom_change_ctrl'
      }
    }
  })

  .state('tab.account-register', {
    url: '/account/register',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-register.html',
        controller: 'mine_ctrl'
      }
    }
  })

  .state('tab.account-personalCheck', {
    url: '/account/personalCheck',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-verified.html',
        controller: 'mine_ctrl'
      }
    }
  })

  .state('tab.account-teacherCheck', {
    url: '/account/teacherCheck',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-verified-teacher.html',
        controller: 'mine_teacher_ctrl'
      }
    }
  })

  .state('tab.account-detail', {
    url: '/account/detail',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-detail.html',
        controller: 'mine_ctrl'
      }
    }
  })

  .state('tab.account-detail-nick', {
    url: '/account/detail/nick',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-nick.html',
        controller: 'mine_ctrl'
      }
    }
  })

  .state('tab.account-detail-sign', {
    url: '/account/detail/sign',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-sign.html',
        controller: 'mine_ctrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/consult');

})
//巴拉能量 magi魔仙变cal 准备冲凉。。还没冲凉。。wocao ..

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])
;
