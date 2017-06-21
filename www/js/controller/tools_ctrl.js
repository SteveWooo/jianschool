starter_controllers
.controller('tools_ctrl', function($state,$scope, Slide_tools,$window,$ionicPopup,ls) {
  //轮播的
  $scope.my_slide_reside = 5000;//轮播间隔
  $scope.slide_imgs = Slide_tools.show_slide_imgs();
  //九宫格的
  $scope.all_tools = Slide_tools.show_all_tools();
  $scope.all_tools.row = [
  {0:$scope.all_tools[0],1:$scope.all_tools[1],2:$scope.all_tools[2]},
  {0:$scope.all_tools[3],1:$scope.all_tools[4],2:$scope.all_tools[5]},
  {0:$scope.all_tools[6],1:$scope.all_tools[7],2:$scope.all_tools[8]}
  ];

  
  for(i=0;i<9;i++){
    if($scope.all_tools[i].action == '#')continue;
    $scope.all_tools[i].img_style = "img-touch-end";
  }

  $scope.onload_div = 0;
  $scope.onload_div_plus=function(){
    $scope.onload_div++;
  }

  $scope.check_tools_in = function(action,state){
    if(ls.getObject('login_msg_client') == null){
      var alertPopup = $ionicPopup.alert({
        title: '注意',
        template: '<div align="center">请先登录！</div>'
      });
      return;
    }

    if(ls.getObject('login_msg_client').verified == '0'){
      var alertPopup = $ionicPopup.alert({
        title: '注意',
        template: '<div align="center">请先实名认证！</div>'
      });
      return;
    }

    if(action == '@'){
      var alertPopup = $ionicPopup.alert({
        title: '抱歉',
        template: '<div align="center">功能尚未开放！</div>'
      });
      return;
    }
    if(action == '*'){
      var alertPopup = $ionicPopup.alert({
        title: '抱歉',
        template: '<div align="center">等上面的功能都开放了<br>我们再谈谈这个按钮的功能吧<br>b(^▽^)d</div>'
      });
      return ;
    }
    if(state == ""||state == undefined){
      return;
    }


    

    // $window.location.href=action;
    $state.go(state);

  }

})
//-------↓巴拉拉能量 勿动--------------------------------
.directive('myTouchstart', [function() {
  return function(scope, element, attr) {
    element.on('touchstart', function(event) {
        scope.$apply(function() { 
          scope.$eval(attr.myTouchstart); 
            //console.log(angular.element(document.querySelector('#index_tools_panel')).scope());
          var temp_scope = angular.element(document.querySelector('#index_tools_panel')).scope();
          temp_scope.all_tools[attr.myTouchstart].img_style="img-touch-start";
        });
    });
  };
}])
.directive('myTouchend', [function() {
  return function(scope, element, attr) {
    element.on('touchend', function(event) {
          scope.$apply(function() { 
          scope.$eval(attr.myTouchend); 
          var temp_scope = angular.element(document.querySelector('#index_tools_panel')).scope();
          temp_scope.all_tools[attr.myTouchend].img_style="img-touch-end";
          if(temp_scope.all_tools[attr.myTouchend].action == '@'){
            return ;
          }
          if(temp_scope.all_tools[attr.myTouchend].action == "*"){
            //..
            return;
          }
          // window.location.href = temp_scope.all_tools[attr.myTouchend].action;
        });
    });
  };
}])

.controller('tools_detail_ctrl', function($scope, $stateParams, News) {
  $scope.news = News.show_tools_detail_news($stateParams.detail_id);
  $('#doc').html($scope.news.content);
})