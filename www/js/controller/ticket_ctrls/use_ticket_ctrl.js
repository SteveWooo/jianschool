starter_controllers
.controller('use_ticket_ctrl', function ($scope, $state, ls, $ionicPopup) {
	$scope.tools = {
		do_refresh:function(){
			$scope.list.refresh();
		},
		router:function(url){
			$state.go(url);
		}
	}

	$scope.$on("$ionicView.beforeEnter",function(){//每次进入页面前判断是否登录
		$scope.tools.do_refresh();
	});

	$scope.list = {
		lists : [],
		total : 1,
		allPage : 2,
		listObj:function(conf){//new object
			this.conf = conf;
		},
		refresh:function(){
			this.lists = [];
			this.total = 1;
			this.getList();
			$scope.$broadcast('scroll.refreshComplete');
		},
		getMore:function(){
			this.total +=1 ;
			this.getList();
		},
		getList:function(){
			var api = ls.get('base_url') + '/Api/UserBus/myTickets?page='+this.total;
			var that = this;
			$.ajax({
				url:api,
				type:'get',
				success:function(res){
					if(!ls.checkRes(res))return ;
					that.allPage = res.totalPage;
					for(var i=0;i<res.data.length;i++){
						var d = res.data[i];
						d.carType = res.data[i].status == '2'?'待使用':'已使用';
						if(res.data[i].status == '1'){
							d.carType = '未生效'
						}
						if(res.data[i].status == '2'){
							d.carType = '待使用'
						}
						if(res.data[i].status == '3'){
							d.carType = '已使用'
						}
						that.lists.push(d);
					}
				},
				error:function(){
					$ionicPopup.alert({
						title:"注意",
						template:"<div align='cneter'>网络错误，请重试</div>"
					})
				}
			})
		},
		checkDetail:function(id){
			$state.go('ticket_tab.use_ticket_scan',{ticketId:id});
		}
	}

	$scope.tools.do_refresh();

})