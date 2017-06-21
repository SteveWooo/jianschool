starter_controllers
.controller('index-detail_ctrl', function($scope ,ls ,$window,$http,$ionicPopup,$state,foods_list){
	$scope.doRefresh = function(){
	    $scope.$broadcast('scroll.refreshComplete');
	    $('#add_more_foods_in_detail').html('查看更多');
	}
	$scope.add_foods=function(){
		$('#add_more_foods_in_detail').html('已无更多');
	}
	$scope.submit_foods=function(){
		$ionicPopup.alert({
			title:"注意",
			template:"<div align='center'>确定提交订单？</div>",
			buttons:[{
				text:"确定",
				type:"button-positive",
				onTap:function(){
					var name = "测试外卖"+foods_list.show_list().length;
					var time = new Date();
					foods_list.add_foods(time,name);
					console.log(foods_list.show_list());
					$ionicPopup.alert({
						title:"成功！",
						template:"<div align='center'>提交成功</div>"
					})
					$state.go("food_tab.index");
					// $window.location.reload();
					$state.go("food_tab.my_list");
					
				}
			},{
				text:"取消",
				type:"button",
			}]
		})
	}

	var badge_style = ["badge","badge-double"]
	var init_list=function(){
		$scope.foods_index_list = foods_list.show_index_list();
		$scope.foods_index_list.total = 0;
		$scope.foods_index_list.total_value = 0;
		$scope.foods_index_list.badge_style = badge_style[0];
		for(i in $scope.foods_index_list){
			$scope.foods_index_list[i].count = 0;
			$scope.foods_index_list[i].add_count=function(){
				if(this.count>=40)return;
				this.count++;
				$scope.foods_index_list.total++;
				$scope.foods_index_list.total_value+=parseFloat(this.price);
				if($scope.foods_index_list.total>=10)$scope.foods_index_list.badge_style = badge_style[1];
			}
			$scope.foods_index_list[i].minus_count=function(){
				this.count--;
				$scope.foods_index_list.total--;
				$scope.foods_index_list.total_value-=parseFloat(this.price);
				if($scope.foods_index_list.total<10)$scope.foods_index_list.badge_style = badge_style[0];
			}
		}
	}
	init_list();

})