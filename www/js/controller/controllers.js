var starter_controllers = angular.module('starter.controllers', [])

//工具方法
var get_file_request = function(url,method,data){
  var req = {
     method: method,
     url: url,
     headers: {
       'Content-Type': "multipart/form-data",
       'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'X-Requested-With' 
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
var get_urlencoded_request = function(url,method,data){//封装request
  var req = {
     method: method,
     url: url,
     headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'X-Requested-With' 
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

var get_scope = function(id){
  return angular.element(document.querySelector(id)).scope();
}

starter_controllers
.controller('DashboardController', function ($scope) {                          
  $scope.dashboard = {swiper: false, slider: false, activeIndexView: 0};
  $scope.view_page = "中山大学南方学院";
  $scope.$watch('dashboard.slider', function (swiper) {
      if (swiper) {
          $scope.swiper = swiper;

          swiper.on('onSlideChangeStart', function (swiper) {
              if(!$scope.$$phase) {
                  $scope.$apply(function () {
                       $scope.dashboard.activeIndexView = swiper.snapIndex;   
                  	   $scope.view_page = $scope.dashboard.activeIndexView;
                  }); 
              } else {
                  $scope.dashboard.activeIndexView = swiper.snapIndex;
              }
				
          });
      }
  });
  
  $scope.dashboard.slideTo = function (indexSlide) {
    $scope.swiper.slideTo(indexSlide);
  };
});
// .controller('DashCtrl', function($scope,ls,$ionicActionSheet,$ionicBackdrop, $timeout, $rootScope,News) {
//   $scope.news_title;
//   $scope.save = function(){
//     console.log(angular.element(document.querySelector('#content')).scope().name);
//     ls.set("name",angular.element(document.querySelector('#content')).scope().name);
//   }
//   $scope.show = function(){
//     console.log(ls.get('name'));
//     alert(ls.get('name'));
//   }
//   $scope.news = News.all();

//   $scope.news_title = angular.element(document.querySelector('#content')).scope().news_title;
//   $scope.add_news = function(){
//     News.add(angular.element(document.querySelector('#content')).scope().news_title);
//   }
// })

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
//   $scope.doRefresh = function(){
//     alert(123);
//     $scope.$broadcast('scroll.refreshComplete');
//   }
// });
