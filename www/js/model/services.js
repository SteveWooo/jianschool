var starter_services = angular.module('starter.services', [])
starter_services
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});

angular.module('locals',[])  
.factory('ls', ['$window','$http', function($window,$http) {  
   return {  
    set: function(key, value) {  
      $window.localStorage[key] = value;  
    },  
    get: function(key, defaultValue) {  
       return $window.localStorage[key] || defaultValue;  
     },  
     setObject: function(key, value) {  
       $window.localStorage[key] = JSON.stringify(value);  
     },  
     getObject: function(key) {  
      if($window.localStorage[key] == null)return null;
       return JSON.parse($window.localStorage[key]||{});  
     },
     checkError:function(err){
        
     },
     checkRes:function(res){
      console.log(res);
      if(res.error<0 || (res.data && res.data.error<0)){
        alert(res.msg || res.data.msg);
        return false;
      }
      if(res && res.error && (res.error == -998 || res.error == -999 || res.data.error == -998 || res.data.error == -999)){
        alert('登录超时，请重新登录');
        return false;
      }
      return true;
     },
     getPersonalInfo:function(){
         var _get = function(key, defaultValue) {  
           return $window.localStorage[key] || defaultValue;  
         }
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

        var req = get_urlencoded_request(_get("base_url")+"/Api/User/getPersonalInfo","get");
        $http(req).then(function(response){
          if(response.data.error<0){
            return;
          }
          $window.localStorage["login_msg_client"] = JSON.stringify(response.data);  

        },function(){
          return;
        })

     }  
   }  
 }])
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])


