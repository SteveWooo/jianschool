starter_controllers
.controller('buy_ticket_detail_ctrl', function ($scope, $state, ls, $ionicPopup) {
	$scope.tools = {
		do_refresh:function(){
			$scope.list.refresh();
			$scope.$broadcast('scroll.refreshComplete');
		},
		router:function(url){
			$state.go(url);
		}
	}
	$scope.list = {
		lists : [],
		date:$state.params.time,
		listObj:function(conf){//new object
			this.conf = conf;
		},
		refresh:function(){
			this.lists = [];
			$scope.list.getList($state.params);
		},
		getList:function(params){
			if(!params.time || !params.beginPathId || !params.endPathId)return ;
			var api = ls.get('base_url') + '/Api/UserBus/getShifts?date='+params.time+
			"&start_id="+params.beginPathId+'&dest_id='+params.endPathId

			$.ajax({
				url:api,
				type:'get',
				success:function(res){
					if(!ls.checkRes(res))return;
					for(var i=0;i<res.length;i++){
						var l = new $scope.list.listObj({
							carType:"常规车",
							time:res[i].departure_time,
							beginPath:res[i].start_name,
							beginPathId:res[i].start_id,
							endPath:res[i].dest_name,
							endPathId:res[i].dest_id,
							price:"¥"+res[i].price,
							lessTicket:"剩"+res[i].seat+"张",
							id:res[i].id,
							date:res[i].departure_date
						})
						console.log(l);
						$scope.list.lists.push(l);
					}
					
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
		checkDetail:function(id){
			$state.go('ticket_tab.buy_ticket_detail_submit',{
				ticketId:id,
				beginPathId:$state.params.beginPathId,
				endPathId:$state.params.endPathId,
				time:$state.params.time
			})
		}
	}
	
	$scope.tools.do_refresh();

	// var l = new $scope.list.listObj({
	// 	carType:"常规车",
	// 	time:"08:00",
	// 	beginPath:"中大南方",
	// 	endPath:"中山大学",
	// 	price:"¥22",
	// 	lessTicket:"剩33张",
	// 	id:1,
	// 	date:"8月1日"
	// })
	// $scope.list.lists.push(l);
})