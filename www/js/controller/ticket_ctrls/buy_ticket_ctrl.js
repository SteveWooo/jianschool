starter_controllers
.controller('buy_ticket_ctrl', function ($scope, $state, ls, $ionicPopup, $cordovaDatePicker) {
	$scope.tools = {
		do_refresh:function(){
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
	$scope.slide = {
		images:[
			"img/slide_2.jpg",
		]
	}
	$scope.path = {
		beginPath:"中大南方",
		endPath:"中大",
		postData:{
			beginPathId:null,
			endPathId:null,
			time:'2016-08-19'//**
		},
		allPath:[],
		getAllPath:function(){
			var that = this;
			var api = ls.get('base_url') + "/Api/UserBus/getDestinations";
			$scope.tools.wait(true);
			$.ajax({
				url:api,
				type:'get',
				success:function(res){
					$scope.tools.wait(false);
					if(!ls.checkRes(res))return ;
					that.allPath = res;
				},
				error:function(err){
					$scope.tools.wait(false);
					$ionicPopup.alert({
						title:"警告",
						template:"<div align='center'>网络异常，请检查后再试</div>"
					})
				}
			})
		},
		getPathId:function(name){
			for(var i in this.allPath){
				if(this.allPath[i].name == name){
					return this.allPath[i].id;
				}
			}
			return false;
		},
		beginPathOnchange:function(){
			var beginPathId = this.getPathId($('#beginPath').val());
			this.postData.beginPathId = beginPathId;
		},
		endPathOnChange:function(){
			var endPathId = this.getPathId($('#endPath').val());
			this.postData.endPathId = endPathId;
		}
	}

	$scope.date = {
		selectedDate:"请选择",
		datePick:function(){
			var that = this;
			var dat = new Date();
		  	var date_options = {
			    date: dat,
			    mode: 'date', // or 'time'
			    minDate: dat.setDate((new Date()).getDate() - 3),
			    doneButtonLabel: '完成',
			    doneButtonColor: '#000000',
			    cancelButtonLabel: '取消',
			    cancelButtonColor: '#000000'
			  };
		  	 $cordovaDatePicker.show(date_options).then(function(date){
		  	 	console.log(date);
	  	 		var dateTools = {
					date : new Date(),
					Y:function(date){
						return date.getFullYear();
					},
					M:function(date){
						return date.getMonth()+1>=10?date.getMonth()+1:'0'+(date.getMonth()+1);
					},
					D:function(date){
						return date.getDate()>=10?date.getDate():'0'+date.getDate();
					},
					getDate:function(date){
						return this.Y(date) + '-' + this.M(date) + '-' + this.D(date);
					}
				}
				that.selectedDate = dateTools.getDate(date);
		        $scope.path.postData.time = that.selectedDate;
		    });
		}
	}

	$scope.submit = {
		submit:function(){
			//TODO:获取用户选择的数据
			for(var i in $scope.path.postData){
				if($scope.path.postData[i] == null){
					$ionicPopup.alert({
						title:"注意",
						template:"<div align='center'>条件尚未选择完成</div>"
					})
					return ;
				}
			}
			$state.go('ticket_tab.buy_ticket_detail',{
				beginPathId:$scope.path.postData.beginPathId,
				endPathId:$scope.path.postData.endPathId,
				time:$scope.path.postData.time
			});
		}
	}

	$scope.path.getAllPath();
	$scope.tools.do_refresh();
})