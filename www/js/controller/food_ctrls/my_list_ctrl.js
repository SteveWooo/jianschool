starter_controllers
.controller('food_list_ctrl', function($scope ,ls ,$window,$http,foods_list){
	$scope.tab_active_array = ["active",""];
	$scope.list_show = 0;
	$scope.my_list = foods_list.show_list();
	$scope.tab_show_list=function(index){
		$scope.tab_active_array = ["",""];
		$scope.tab_active_array[index] = 'active';
		$scope.list_show = index;
		$('#add_more_list_button').html("查看更多");
	}
    $scope.doRefresh = function(){
    	$('#add_more_list_button').html("查看更多");
	    $scope.$broadcast('scroll.refreshComplete');
	}

	$scope.get_more=function(){
		$('#add_more_list_button').html("已无更多");
	}
})