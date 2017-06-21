starter_controllers
.controller('buy_ticket_detail_submit_ctrl', function ($scope, $state, ls, $ionicPopup, $http, $ionicHistory) {
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
	$scope.tools = {
		do_refresh:function(){
			$scope.$broadcast('scroll.refreshComplete');
		},
		router:function(url){
			$state.go(url);
		}
	}
	$scope.detail = {
		detail:null,
		getDetail:function(params){
			if(!params.time || !params.beginPathId || !params.endPathId)return ;
			var api = ls.get('base_url') + '/Api/UserBus/getShifts?date='+params.time+
			"&start_id="+params.beginPathId+'&dest_id='+params.endPathId
			var that = this;
			$.ajax({
				url:api,
				type:'get',
				success:function(res){
					if(!ls.checkRes(res))return;
					for(var i=0;i<res.length;i++){
						if(res[i].id != params.ticketId)continue ;
						that.detail = {
							carType:"常规车",
							time:res[i].departure_time,
							beginPath:res[i].start_name,
							beginPathId:res[i].start_id,
							endPath:res[i].dest_name,
							endPathId:res[i].dest_id,
							price:res[i].price,
							lessTicket:"剩"+res[i].seat+"张",
							id:res[i].id,
							date:res[i].departure_date
						}
					}
					console.log(that.detail);
					
				},
				error:function(err){
					console.log(err);
					$ionicPopup.alert({
						title:'注意',
						template:"<div align=center>网络错误，请重试</div>"
					})
				}
			})
		},
		submit:function(params){
			var api = ls.get('base_url') + '/Api/UserBus/purchaseTicket';
			$.ajax({
				url:api,
				type:'POST',
				data:{
					shift_id:params.ticketId,
					amount:1
				},
				success:function(res){
					if(!ls.checkRes(res))return;
					$ionicPopup.alert({
						title:"成功！",
						template:"<div align='center'>订单创建成功</div>",
						buttons:[{
							text:"确定",
							type:"button-positive",
							onTap:function(){
								$ionicHistory.goBack();
							}
						}]
					})
				},
				error:function(err){
					console.log(err);
					$ionicPopup.alert({
						title:"注意",
						template:"<div align='center'>网络错误，请重试</div>"
					})
				}
			})

		},
		purchase:function(){
			var that = this;
			$ionicPopup.alert({
		    	title:"注意",
		    	template:"<div align='center'>是否提交订单？</div>",
				buttons:[{
					text:"确定",
					type:"button-positive",
					onTap:function(){
						that.submit($state.params);
					}
				},{
					text:"取消",
					onTap:function(){
						return;
					}
				}]
		    })
		}
	}
	$scope.detail.getDetail($state.params);
})