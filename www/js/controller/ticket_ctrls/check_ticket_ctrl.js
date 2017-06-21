starter_controllers
.controller('check_ticket_ctrl', function ($scope,$state,ls,$ionicPopup) {
	$scope.tools = {
		do_refresh:function(){
			$scope.list.refresh();
			$scope.$broadcast('scroll.refreshComplete');
		},
		router:function(url){
			$state.go(url);
		},
		wait:function(wait){
			if(wait==true){
				$('#wait').show();
			}else {
				$('#wait').hide();
			}
		}
	}

	$scope.$on("$ionicView.beforeEnter",function(){//每次进入页面前判断是否登录
		$scope.tools.do_refresh();
	});
	/*
	order 状态 1刚创建/未付款 2已付款/订单有效 3订单已取消/过期/退款等
	ticket 状态 1刚创建/未付款/无效票 2已付款/有效票 3已验票/无效票 4取消票/订单取消
	*/

	$scope.list = {
		lists : [],
		page:1,
		allPage:1,
		refresh:function(){
			this.page = 1;
			this.lists = [];
			this.getList();
		},
		getMore:function(){
			this.page ++;
			this.getList();
		},
		getList:function(){
			var api = ls.get('base_url') + '/Api/UserBus/myOrders?page='+this.page;
			$scope.tools.wait(true);
			var that = this;
			$.ajax({
				url:api,
				type:'get',
				success:function(res){
					$scope.tools.wait(false);
					if(!ls.checkRes(res))return;
					that.allPage = res.totalPage;
					for(var i=0;i<res.data.length;i++){
						var l = res.data[i];
						if(l.status == '1'){
							l.carType = "待付款";
						}
						if(l.status == '2'){
							l.carType = '已付款';
						}
						if(l.status == '3'){
							l.carType = '已验票';
						}

						$scope.list.lists.push(l)
					}
					
				},
				error:function(err){
					$scope.tools.wait(false);
					$ionicPopup.alert({
						title:"注意",
						template:"<div align='cneter'>网络错误，请重试</div>"
					})
				}
			})
		},
		checkDetail:function(id,price){
			$state.go('ticket_tab.check_ticket_detail',{orderId:id,price:price});
		}
	}


	$scope.tools.do_refresh();
})