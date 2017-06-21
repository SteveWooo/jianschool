// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('repair', ['ionic','locals', 'ngCordova','repair.controllers', 'repair.services'])

.run(function($ionicPlatform,$window,ls,$ionicPopover) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(ls.getObject("login_msg_client") == null){
      ls.set("logined_client",0);//1:已登录 0:未登录 3:实名认证 2:注册中
      $window.location.href="index.html#/tab/account";
    }

    if(ls.getObject("login_msg_client")!=null&&ls.getObject("login_msg_client").verified == '0'){
      ls.set("logined_client",3);
      $window.location.href="index.html#/tab/account";
    }
    
    if(ls.getObject("login_msg_client")!=null&&ls.getObject("login_msg_client").verified == '1'){
      ls.set("logined_client",1);
    }
    console.log(ls.getObject("login_msg_client"))

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $ionicPlatform.registerBackButtonAction(function (event) {

        // navigator.app.backHistory();
        //navigator.app.backHistory();
    }, 100);
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$compileProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  $ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');        

  $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');

  $ionicConfigProvider.views.maxCache(30);

  

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates_repair/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.myrepair', {
    url: '/myrepair',
    views: {
      'tab-myrepair': {
        templateUrl: 'templates_repair/tab-myrepair.html',
        controller: 'mine_repair_ctrl'
      }
    }
  })

  // .state('repair-detail', {
  //   url: '/repair_detail:repair_id',
  //   views: {
  //     'repair-detail': {
  //       templateUrl: 'repair_detail.html',
  //       controller: 'repair_detail_ctrl'
  //     }
  //   }
  // })

  .state('tab.newrepair', {
    url: '/newrepair',
    views: {
      'tab-newrepair': {
        templateUrl: 'templates_repair/tab-newrepair.html',
        controller: 'repair_ctrl'
      }
    }
  });

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'tools_ctrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'mine_ctrl'
  //     }
  //   }
  // })

  // .state('tab.account-detail', {
  //   url: '/account/detail',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account-detail.html',
  //       controller: 'mine_ctrl'
  //     }
  //   }
  // })

  // .state('tab.account-detail-nick', {
  //   url: '/account/detail/nick',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account-nick.html',
  //       controller: 'mine_ctrl'
  //     }
  //   }
  // })

  // .state('tab.account-detail-sign', {
  //   url: '/account/detail/sign',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account-sign.html',
  //       controller: 'mine_ctrl'
  //     }
  //   }
  // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/myrepair');

})
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])
;
