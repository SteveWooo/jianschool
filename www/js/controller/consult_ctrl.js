// angular.module('starter.controllers', [])
starter_controllers
.controller('consult_ctrl', function($cordovaAppVersion,$scope ,ls ,Slide_news ,News ,$ionicPopup,$window,$http) {
  $scope.pos="中山大学南方学院";//需要做长度监听 自己做$scope.check_length = function(){};
  $scope.header = "<b><img src='img/index/index-assets/adrlogo.png' style='height:40%'>&nbsp&nbsp"+$scope.pos+"</b>";
  $scope.my_slide_reside = 5000;//轮播间隔
  $scope.slide_imgs = Slide_news.all_imgs();
  var img = ["img/img_1.png","img/img_2.png","img/img_3.png","img/img_4.png","img/img_5.png"];

  var get_news=function(){
    var news = [];
    $http.get(ls.get("base_url")+"/Api/News/index")
    .then(function(response){
      if(response.data.error<0){
        $ionicPopup.alert({
          title:"注意！",
          template:"<div align='center'>"+response.data.msg+"</div>"
        })
        $scope.$broadcast('scroll.refreshComplete');
        return;
      }
      console.log(response.data)
      var img_num = 0;
      for(i=0;i<response.data.length;i++){
        var data = response.data[i];
        data.img = img[img_num];
        img_num++;
        if(img_num>4)img_num = 0;
        news.push(data);
      }

      $scope.$broadcast('scroll.refreshComplete');
      $scope.all_news = news;
      ls.setObject("all_news",news);
      News.set_news(news);
    },function(){
      $ionicPopup.alert({
        title:"注意！",
        template:"<div align='center'>网络异常，请检查后试</div>"
      })
      $scope.$broadcast('scroll.refreshComplete');
    })
  }
  get_news();

  $scope.news_page = 2;
  $scope.doRefresh = function(){
    $scope.news_page = 2;
    $('#add_new_button').html("加载更多..");
    $scope.vm.task = true;
    $scope.vm.all_task = true;
    get_news();
  }

  $scope.vm = new Object();//上拉加载
  $scope.vm.task = true;//需要处理的任务加载
  $scope.vm.all_task = true;//全部任务
  $scope.add_news = function(){
    $http.get(ls.get("base_url")+"/Api/News/index?page="+$scope.news_page)
        .then(function(response){
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('scroll.refreshComplete');
          if(response.data.error<0){
            $ionicPopup.alert({
              title:"注意！",
              template:"<div align='center'>"+response.data.msg+"</div>"
            })
            return;
          }
          console.log(response)
          if(response.data.length == 0){
            $('#add_new_button').html("已无更多");
            $scope.vm.all_task = false;
          }
          for(i=0;i<response.data.length;i++){
            var data = response.data[i]
            data.title = data.content;
            data.description = data.description;
            data.img = ls.get("base_url")+ls.get("cdn_path")+data.file.thumb+"."+data.file.ext;
            News.add_news(data);
          }
          console.log(response.data);
        },function(){
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.vm.all_task = false;
          return;
        })
        return ;
  }
})

.controller('consult_detail_ctrl',function($scope,News,ls,$stateParams){
   $scope.news = News.show_news($stateParams.news_id);
   // angular.element(document.querySelector('#consult_doc')).html($scope.news.content);
   $('#consult_doc').html($scope.news.content);
   $('#consult_detail_title').html($scope.news.title);
})