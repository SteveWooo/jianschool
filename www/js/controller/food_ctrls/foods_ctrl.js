starter_controllers
.controller('foods_ctrl', function($scope ,ls,$ionicPopup ,$window,$http,$state){

    $scope.doRefresh = function(){
	    $scope.$broadcast('scroll.refreshComplete');
	    $('#add_more_foods').html('查看更多');
	}

	$scope.test=function(){
		$ionicPopup.alert({
			title:"注意！",
			template:"<div align='center'>店铺尚未开张！</div>"
		})
	}

	$scope.add_foods=function(){
		$('#add_more_foods').html('已无更多');
	}

	$scope.tab_go=function(){
		$state.go("food_tab.index-detail");
	}
})