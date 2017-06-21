starter_controllers
.controller('electric_check_ctrl',function($scope, ls, $http, $ionicPopup, $state){
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

	var warning_alert=function(content){
      $ionicPopup.alert({
        title:"警告！",
        template:"<div align='center'>"+content+"</div>"
      })
    } 

    var findIdInarea = function(name){
      for(var i = 0;i<$scope.all_areas.length;i++){
        if(name === $scope.all_areas[i].name){
          return $scope.all_areas[i].id;
        }
      }
    }

    var checkLogin = function(){
    	if(ls.getObject('login_msg_client') == null){
    		return false;
    	}
    	if(ls.getObject('login_msg_client').verified == '0'){
    		return false;
    	}
    }

	var init = function(){
		if(checkLogin() === false){
			$ionicPopup.alert({
	          title:"警告！",
	          template:"<div align='center'>"+	
				"<p>请先登录或实名认证</p>"+
	          "</div>",
	          buttons:[
	            {
	              type:"button-positive",
	              text:"确定",
	              onTap:function(){
	                $state.go('tab.account');
	              }
	            }
	          ]
	        })

			return;
		}
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

	        if(ls.getObject('login_msg_client')!=null && ls.getObject('login_msg_client').room == null){
	        	$ionicPopup.alert({
	        		title:"注意",
	        		template:"<div align='center'>建议进入“个人资料”页面修改默认宿舍号，方便以后查询</div>",
	        	})
	        }
	        

	        if(ls.getObject('login_msg_client')!=null){
	        	if(ls.getObject('login_msg_client').room!=null){
	        		var msg = ls.getObject('login_msg_client');
			        var dorm = {
			        	id:msg.dormitory.id,
			        	name:msg.dormitory.name
			        }
			        $scope.all_areas.push(dorm);
			        
	        		$('#dorm_number_check').val(ls.getObject('login_msg_client').room);
	        	}
	        }

	        for(var i=0;i<response.data.length;i++){
	          if(response.data[i].public === '0'){
	            $scope.all_areas.push(response.data[i]);
	          }
	        }
	        

	      },function(error){
	        warning_alert("网络异常");
	      })
	}
	init();

	$scope.submit=function(){

		var req = get_urlencoded_request(ls.get('base_url')+"/Api/Electric/query?area_id="+findIdInarea($('#dorm_check').val())+"&room="+$('#dorm_number_check').val(),"get");
		console.log(req);

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
	          title:"获取成功",
	          template:"<div align='center'>"+	
				"可用："+response.data.available_total+"度<br/>"+
				"累计使用："+response.data.total_used+"度<br/>"+
				"<p style='color:red'>温馨提示：<br/>1、可在“个人资料”页面设置默认宿舍<br/>2、由于学校系统不稳，数据可能出现短暂延迟</p>"+
	          "</div>",
	          buttons:[
	            {
	              type:"button-positive",
	              text:"确定",
	              onTap:function(){
	                
	              }
	            }
	          ]
	        })
		},function(error){
			warning_alert("网络异常");
		})

		

	}


})