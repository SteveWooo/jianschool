starter_controllers
.controller('check_ticket_detail_ctrl', function ($scope,$state,ls,$ionicPopup,$ionicHistory) {
	$scope.tools = {
		do_refresh:function(){
			$scope.$broadcast('scroll.refreshComplete');
		},
		router:function(url){
			$state.go(url);
		}
	}

	$scope.order = {
		price:$state.params.price,
		order_id:$state.params.orderId,
		pay:function(){
			var api = ls.get('base_url') + '/Api/UserBus/payOrder';
			$.ajax({
				url:api,
				type:'post',
				data:{
					order_id:$scope.order.order_id,
					payment_method:'nfu_card'
				},
				success:function(res){
					if(!ls.checkRes(res))return;
					if(res.code == 1){
						$ionicPopup.alert({
							title:"成功",
							template:"<div align='center'>支付成功</div>",
							buttons:[{
								text:'确定',
								type:"button-positive",
								onTap:function(){
									$ionicHistory.goBack();
								}
							}]
						})
					}
				},
				error:function(res){
					$ionicPopup.alert({
						title:"注意",
						template:"<div align='center'>网络错误，请重试</div>"
					})
				}
			})
		},
		submit:function(){
			$ionicPopup.alert({
				title:"注意",
				template:"<div align='center'>是否确定支付？</div>",
				buttons:[
					{
						text:'确定',
						type:'button-positive',
						onTap:function(){
							$scope.order.pay();
						}
					},
					{
						text:'取消',
						onTap:function(){
							return;
						}
					}
				]
			})
		}
	}

})