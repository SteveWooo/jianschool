

//工具方法


var get_file_request = function(url,method,data){
  var req = {
     method: method,
     url: url,
     headers: {
       'Content-Type': "multipart/form-data"
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
var get_urlencoded_request = function(url,method,data){//封装request
  var req = {
     method: method,
     url: url,
     headers: {
       'Content-Type': "application/x-www-form-urlencoded"
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

var get_scope = function(id){
  return angular.element(document.querySelector(id)).scope();
}
starter_controllers
.controller('repair_ctrl',function($window,$state,$cordovaCamera,$ionicPopup,$scope,ls,$cordovaFileTransfer,$http,$cordovaImagePicker,$cordovaDatePicker,$stateParams,repair_form,$ionicPopover,$ionicActionSheet, $timeout){
	$scope.waiting = false;//等待动画

	repair_form.set_repair_content();
	$scope.repair_content = repair_form.get_repair_content();
	var warining_alert=function(title,template){
		$ionicPopup.alert({
			title:title,
			template:"<div align='center'>"+template+"</div>"
		})
	}
	var connection_alert=function(){
		$ionicPopup.alert({
			title:"警告",
			template:"<div align='center'>网络异常，请检查后再试</div>"
		})
	}
	  //定义一堆变量
	  $scope.reservation_date = "点击选择日期";
	  $scope.reservation_time = "default";
	  $scope.position      = "default";
	  $scope.repair_item      = "请选择";
	  $scope.repair_detail    = "";
	  $scope.file1;
	  $scope.bed_number = "default"
	  var sub_msg = new Object();
	  sub_img = new Array();

	  sub_msg.repair_content_id = "";
	  sub_msg.repair_item_id = "";

	 $scope.submit_button = true;
	 $scope.submit = function(){
	 	$('#student_submit_button').hide();
	 	$scope.submit_button = false;
	  	var scope = get_scope('#content');
	  	sub_msg.file1 = "";
	  	sub_msg.area_id = $('#repair_area').val();
	  	if((sub_msg.mobile = $('#mobile').val()) == ""){
	  		sub_msg.mobile = ls.getObject("login_msg_client").mobile;
	  	}
	  	console.log(sub_msg.mobile);
	  	sub_msg.appointment_date = $scope.reservation_date;
	  	sub_msg.appointment_id = $('#reservation_time').val();
	  	sub_msg.content = $('#repair_description').val();
	  	sub_msg.file1 = sub_img[0];
	  	sub_msg.file2 = sub_img[1] != null?sub_img[1]:null;
	  	sub_msg.file3 = sub_img[2] != null?sub_img[2]:null;
	  	var bed_number = $('#bed_number').val();
	  	var drom = $('#drom').val();
	  	if($scope.repair_public == false&&(bed_number == "default"||drom.length == 0)){
	  		$ionicPopup.alert({
  				title:"注意！",
  				template:"<div align='center'>信息尚未填写完整</div>"
  			})
  			$('#student_submit_button').show();
  			$scope.submit_button = true;
  			return;
	  	}
	  	if($scope.repair_public == false){
	  		if(drom==undefined||drom.length!=3){
		  		$ionicPopup.alert({
	  				title:"注意！",
	  				template:"<div align='center'>宿舍号填写错误</div>"
	  			})
	  			$('#student_submit_button').show();
	  			$scope.submit_button = true;
	  			return;
		  	}
		  	if(bed_number==undefined||bed_number.length!=1){
		  		$ionicPopup.alert({
	  				title:"注意！",
	  				template:"<div align='center'>宿舍信息填写错误</div>"
	  			})
	  			$('#student_submit_button').show();
	  			$scope.submit_button = true;
	  			return;
		  	}
	  	}
	  	
	  	if(sub_msg.mobile.length!=11){
	  		if(sub_msg.mobile.length<4||sub_msg.mobile.length>6){
	  			$ionicPopup.alert({
	  				title:"注意！",
	  				template:"<div align='center'>手机号填写错误</div>"
	  			})
	  			$('#student_submit_button').show();
	  			$scope.submit_button = true;
	  			return;
	  		}
	  		
	  	}
	  	// sub_msg.content = "宿舍号:"+drom+"、床位:"+bed_number+";\n"+sub_msg.content;
	  	// console.log(sub_msg);
  		if(sub_msg.area_id == "default" || sub_msg.repair_content_id == "" 
  			||sub_msg.repair_content_id == "" || sub_msg.appointment_date == "点击选择日期" || sub_msg.appointment_id == "default"
  			||sub_msg.content == ""||sub_msg.file1 == ""||sub_msg.file1 == null){
  			$ionicPopup.alert({
  				title:"注意！",
  				template:"<div align='center'>信息尚未填写完整</div>"
  			})
  			$('#student_submit_button').show();
  			$scope.submit_button = true;
  			return;
  		}
  		$scope.waiting = true;
	  	//新建文件上传选项，并设置文件key，name，type
		var options = {};
		options.fileKey="file1";
		options.fileName=sub_msg.file1.substr(sub_msg.file1.lastIndexOf('/')+1);
		$scope.file1 = sub_msg.file1;
		// options.mimeType="image/jpeg";
		//用params保存其他参数，例如昵称，年龄之类
		var params = {};
		params['area_id'] = sub_msg.area_id;
		params['mobile'] = sub_msg.mobile;
		params['appointment_date'] = sub_msg.appointment_date;
		params['appointment_id'] = sub_msg.appointment_id;
		params['content'] = sub_msg.content;
		params['repair_item_id'] = sub_msg.repair_item_id;
		params['repair_content_id'] = sub_msg.repair_content_id;
		if($scope.repair_public == false){
			params['dormitory_no'] = drom;
			params['bed_no'] = bed_number;
		}
		//把params添加到options的params中
		options.params = params;
		//新建FileTransfer对象
		var ft = new FileTransfer();
		//上传文件
		$cordovaFileTransfer.upload(
		    encodeURI(ls.get("base_url")+"/Api/UserRepair/newForm"),
		    $scope.file1,
		    options)
		.then(function(r){
			$scope.waiting = false;
	    	var resp = JSON.parse(r.response);
		    if(resp.error < 0){
		    	warining_alert("注意！",resp.msg);
		    	$('#student_submit_button').show();
		    	$scope.submit_button = true;
		    	return;
		    }
		    $ionicPopup.alert({
		    	title:"成功！",
		    	template:"<div align='center'>报修单提交成功！请等候维修人员安排</div>",
		    	buttons:[{
		    		text:"确定",
		    		type:"button-positive",
		    		onTap:function(){
		    			$state.go('repair_tab.myrepair');
		    			$('#student_submit_button').show();
		    			$scope.submit_button = true;
		    			repair_form.set_repair_content();
		    			// angular.element(document.querySelector('#my_repair')).scope().do_refresh();
		    			window.location.reload();
		    		}
		    	}]
		    })
	    },function(error){
	    	$scope.waiting = false;
	    	$scope.submit_button = true;
	    	warining_alert("失败！","上传失败，请检查网络");
	    })
	    $('#student_submit_button').show();
	 }
	  //公共区域选项的操作
	  $scope.repair_public = false;
	  $scope.repair_public_yes = "icon-radio";
	  $scope.repair_public_no = "icon-radio-h";
	  $scope.repair_public_choose_yes = function(){
	  	$scope.repair_public_yes = "icon-radio-h";
	  	$scope.repair_public_no = "icon-radio";
	  	$scope.repair_public = true;
	  	$scope.position = null;
		$scope.repair_area_view = [];
		for(i=0;i<$scope.repair_content.repair_area.length;i++){
			if($scope.repair_content.repair_area[i].public == "1"){
				$scope.repair_area_view.push($scope.repair_content.repair_area[i]);
			}
		}
	  }
	  $scope.repair_public_choose_no = function(){
	  	$scope.repair_public_yes = "icon-radio";
	  	$scope.repair_public_no = "icon-radio-h";
	  	$scope.repair_public = false;
		$scope.position = null;
		$scope.repair_area_view = [];
		for(i=0;i<$scope.repair_content.repair_area.length;i++){
			if($scope.repair_content.repair_area[i].public == "0"){
				$scope.repair_area_view.push($scope.repair_content.repair_area[i]);
			}
		}
	  }

	  //repair的popover操作

//-------------------------------勿动--------------------------------------
    var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

	  $scope.popover = $ionicPopover.fromTemplate(template, {
	    scope: $scope
	  });

	  // .fromTemplateUrl() method
	  $ionicPopover.fromTemplateUrl('choose_repair_page.html', {
	    scope: $scope
	  }).then(function(popover) {
	    $scope.popover = popover;
	  });


	  $scope.openPopover = function($event) {
	    $scope.popover.show($event);
	  };
	  $scope.closePopover = function() {
	    $scope.popover.hide();
	  };
	  //Cleanup the popover when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.popover.remove();
	  });
	  // Execute action on hide popover
	  $scope.$on('popover.hidden', function() {
	    // Execute action
	  });
	  // Execute action on remove popover
	  $scope.$on('popover.removed', function() {
	    // Execute action
	  });
//---------------------------------------------------------------------------------

	  
	  $scope.first_popover_menu = $scope.repair_content.first_menu;
	  $scope.first_popover_menu = ls.getObject("repair_item_client");
	  $scope.repair_content.repair_area = ls.getObject("repair_area_client");
	  $scope.second_popover_menu = null;
	  $scope.repair_detail = "点击选择";
	  $scope.repair_area_view = new Array();
	  for(i=0;i<$scope.repair_content.repair_area.length;i++){
	  	if($scope.repair_content.repair_area[i].public == "0"){
	  		$scope.repair_area_view.push($scope.repair_content.repair_area[i]);
	  	}
	  }

	  $scope.choose_repair_content = function(event){//打开菜单
	  	$scope.openPopover(event);
	  	// console.log($scope.first_popover_menu[0]);
	  }

	  $scope.select_first_popover = function(index,item){//一级菜单
	  	var scope = angular.element(document.querySelector('#new_repair')).scope();
	  	scope.second_popover_menu = scope.first_popover_menu[index].repair_contents;
	  	scope.repair_item = item.name;
	  	scope.repair_detail = "";
	  	sub_msg.repair_content_id = "";
	  	sub_msg.repair_item_id = item.id;
	  	$scope.popover_show_second_menu = true;
	  	$scope.popover_left_menu = "col-10";
	  }

	  $scope.popover_show_second_menu = false;
	  $scope.popover_back=function(){
	  	$scope.popover_show_second_menu = false;
	  	$scope.popover_left_menu = "";
	  }

	  $scope.select_second_popover = function(item){//二级菜单
	  	var scope = angular.element(document.querySelector('#new_repair')).scope();
	  	scope.repair_detail = item.name;
	  	sub_msg.repair_content_id = item.id;
	  }

	  $scope.submit_repair_content = function(){//确定选择菜单
	  	$scope.popover.hide();
	  	$scope.popover_back();
	  }

	  //pick date

	  
	  $scope.pick_repair_date = function(){
	  	var dat = new Date();
	  	var date_options = {
		    date: dat,
		    mode: 'date', // or 'time'
		    minDate: dat.setDate((new Date()).getDate() + 1),
		    doneButtonLabel: '完成',
		    doneButtonColor: '#000000',
		    cancelButtonLabel: '取消',
		    cancelButtonColor: '#000000'
		  };
	  	 $cordovaDatePicker.show(date_options).then(function(date){
	  	 	console.log(date);
	  	 	if(date == new Date()){
	  	 		$ionicPopup.alert({
	  	 			title:"注意",
	  	 			template:"<div align='center'>不可选择本日</div>"
	  	 		})
	  	 		repair_form.clear_repair_content_time();
	        	$scope.reservation_time = "default";
	  	 		//when ios , reload()
	  	 		return;
	  	 	}
	  	 	if(date < new Date()){
	  	 		$ionicPopup.alert({
	  	 			title:"注意",
	  	 			template:"<div align='center'>日期无效</div>"
	  	 		})
	  	 		repair_form.clear_repair_content_time();
	        	$scope.reservation_time = "default";
	  	 		//when ios , reload()
	  	 		return;
	  	 	}
	        $scope.reservation_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	        var week = "7123456".split("")[date.getDay()];
	        var req = get_urlencoded_request(ls.get("base_url")+"/Api/UserRepair/getAppointments?week="+week,"get")
	        $http(req).then(function(response){
	        	if(response.data.error === -998 || response.data.error === -999){
					$ionicPopup.alert({
						title:"登录超时",
						template:"<div align='center'>请重新登录！</div>"
					});
					return;
				}
	        	if(response.data.length<1){
	        		$ionicPopup.alert({
	        			title:"注意！",
	        			template:"此天为休息日，请重新选择日期"
	        		})
	        		repair_form.clear_repair_content_time();
	        		$scope.reservation_time = "default";
	        		return;
	        	}
	        	repair_form.clear_repair_content_time();
	        	for(i in response.data){
	        		repair_form.set_repair_content_time(response.data[i]);
	        	}
	        	
	        },function(){
	        	connection_alert();
	        })
	    });
	  }

	  //三张图片的操作


	  $scope.user_images = Array();
	  // angular.element(document.querySelector('#user_image_1')).value="123.png";
	  $scope.getPhoto = function(img_index) {//相机

		var options = {  
	      quality: 80,  
	      destinationType: Camera.DestinationType.FILE_URI,  
	      sourceType: Camera.PictureSourceType.CAMERA,  
	      // allowEdit: true,  
	      // encodingType: Camera.EncodingType.JPEG,  
	      targetWidth: 800,  
	      targetHeight: 800,  
	      // popoverOptions: CameraPopoverOptions,  
	      saveToPhotoAlbum: true  
	    };  
	  
	    $cordovaCamera.getPicture(options).then(function(imageData) {  
	      repair_form.set_img(img_index,imageData);
	      sub_img[0]=imageData;  
	    }, function(err) {  
	      // error  
	    });


	  };

		/*
			危险！远离！
		*/
	   $scope.pickImage = function (img_index) {  //相册
        var options = {  
            maximumImagesCount: 1,  
            width: 800,  
            height: 800,  
            quality: 85  
        };  
          
        $cordovaImagePicker.getPictures(options)  
            .then(function (results) {  
            	// $scope.user_images[img_index] = results[0];
                repair_form.set_img(img_index,results[0]);
                sub_img[0]=results[0];
            }, function (error) {  
                // error getting photos 
                alert("图片获取失败");
            });  
        }     

	  $scope.repair_imgs = repair_form.get_imgs();
	  $scope.repair_img_default = "img/tools/repair/img_default.png";
	  $scope.show_img_choose = function(img_index){
	  	 var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '<div align="center">拍照上传</div>' },
	       { text: '<div align="center">本地图片</div>' }
	     ],
	     // destructiveText: '<div align="center">取消</div>',
	     titleText: '选择照片上传方式',
	     cancelText: '取消',
	     cancel: function() {
	          // add cancel code..
	     },
	     buttonClicked: function(index) {
	       console.log(img_index);
	       switch(index){
	       	 case 0:
	       	 $scope.getPhoto(img_index);
	       	 break;
	       	 case 1:
	       	 $scope.pickImage(img_index);
	       	 break;
	       }
	       return true;
	     },
	     destructiveButtonClicked:function(){
	     	hideSheet();
	     }
	   });

	   // For example's sake, hide the sheet after two seconds
	   // $timeout(function() {
	   //   hideSheet();
	   // }, 2000);

	  };


})


.controller('mine_repair_ctrl',function($ionicPopup,$state,$ionicModal,$window,$scope,$ionicPopover,ls,Repair_list,$http,repair_form){
	if(ls.getObject('login_msg_client') == null||ls.getObject('login_msg_client').real_name == null){
		$ionicPopup.alert({
			title:"注意！",
			template:"<div align='center'>请先登录或实名认证</div>",
			buttons:[
				{
					text:"确定",
					type:"button-positive",
					onTap:function(e){
						$state.go('tab.account');
					}
				}
			]
		})
	}
	//上面的tab分类
	$scope.show_list = 1;//0全部 1处理中 2已完成
	$scope.tab_active_array = ['','active',''];
	$scope.tab_show_list = function(index){
		for(i=0;i<3;i++){
			$scope.tab_active_array[i] = '';
		}
		$scope.tab_active_array[index] = 'active';
		$scope.show_list = index;
	}

	var get_repair_list = function(){//后端获取维修单详情
		Repair_list.refresh();
		repair_form.set_repair_content();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.repair_list = Repair_list.show_list();
	}
	$scope.getMoreList = function(){
		Repair_list.get_list();
	}
	$scope.do_refresh=function(){
		get_repair_list();
	}
	$scope.do_refresh();
	if(ls.get("first_in_repair") == 1){		
		
		ls.set("first_in_repair",0);
	}

	//main list
	
	for(i=0;i<$scope.repair_list.length;i++){
		switch($scope.repair_list[i].state){
			case "已完成":
				$scope.repair_list[i].state_img = finished_tag;
			break

			case "处理中":
				$scope.repair_list[i].state_img = processing_tag;
			break;

			default:
				$scope.repair_list[i].state_img = handed_on_tag;
			break;
		}
	}

	//change page
	$scope.view_detail=function(id){
		ls.set("view_detail",id);
		$state.go('repair_tab.repair_detail');
	}
	
})

.controller('evalute_ctrl',function($state,$scope,$rootScope,$ionicPopup,$http,ls){
	$scope.$on('$locationChangeSuccess',function(){
		angular.element(document.querySelector('#repair_detail')).scope().$on('$ionicView.beforeLeave',function(){
	    	$rootScope.hideTabs = false;
	    })
	})

	var warining_alert=function(title,template){
		$ionicPopup.alert({
			title:title,
			template:"<div align='center'>"+template+"</div>"
		})
	}
	var connection_alert=function(){
		$ionicPopup.alert({
			title:"警告",
			template:"<div align='center'>网络异常TaT，请检查后再试</div>"
		})
	}

	$scope.repair_result_icon = ["img/tools/repair/radio_h.png","img/tools/repair/radio.png"];
	$scope.repair_result = 0;//0已维修好 1未维修好
	$scope.choose_repair_result=function(index){
		if(index === 0){
			$scope.repair_result = 0;
			$scope.repair_result_icon = ["img/tools/repair/radio_h.png","img/tools/repair/radio.png"];
			//change state
		}else {
			$scope.repair_result = 1;
			$scope.repair_result_icon = ["img/tools/repair/radio.png","img/tools/repair/radio_h.png"];
		}
	}
	//评价
	$scope.appraise_icon = ["","img/tools/repair/appraise.png","img/tools/repair/appraise_h.png","img/tools/repair/appraise.png"]
	$scope.appraise_level = 2;//1差评 2中评 3好评
	$scope.choose_appraise=function(index){
		$scope.appraise_level = index;
		$scope.appraise_icon = ["","img/tools/repair/appraise.png","img/tools/repair/appraise.png","img/tools/repair/appraise.png"];
		$scope.appraise_icon[index] = "img/tools/repair/appraise_h.png";
	}

	$scope.appraise_detail = "";
	var sub_msg = new Object();

	var submit_repair_failed = function(){
		var id = ls.get("view_detail");
		console.log(id);
		var reason = $('#can_repair_detail')[0].value;
		// var req = get_urlencoded_request(ls.get("base_url")+"/Api/UserRepair/rollback?id="+id+"&reason="+reason,"get");
		var req = get_urlencoded_request(ls.get("base_url")+"/Api/UserRepair/rollback","post",{
			id:id,
			reason:reason
		});
		$http(req).then(function(response){
			console.log(response);
			if(response.data.error === -998 || response.data.error === -999){
				$ionicPopup.alert({
					title:"登录超时",
					template:"<div align='center'>请重新登录！</div>"
				});
				return;
			}
			if(response.data.error<0){
				warining_alert("注意！",response.data.msg);
				return;
			}
			$ionicPopup.alert({
				title:"成功！",
				template:"<div align='center'>提交成功！</div>",
				buttons:[{
					text:"确定",
					type:"button-positive",
					onTap:function(){
						window.location.href="#/repair_tab/myrepair";
						window.location.reload();
					}
				}]
			})
		},function(){
			connection_alert();
		})
	}

	var submit_repair_success = function(repair_level,appraise){
		var data = {
			id:ls.get("view_detail"),
			level:repair_level,
			comment:appraise
		}
		var req = get_urlencoded_request(ls.get("base_url")+"/Api/UserRepair/confirmAndRank","post",data);
		$http(req).then(function(response){
			console.log(response);
			if(response.data.error === -998 || response.data.error === -999){
				$ionicPopup.alert({
					title:"登录超时",
					template:"<div align='center'>请重新登录！</div>"
				});
				return;
			}
			if(response.data.error<0){
				warining_alert("注意！",response.data.msg);
				return;
			}
			$ionicPopup.alert({
				title:"成功！",
				template:"<div align='center'>提交成功！</div>",
				buttons:[{
					text:"确定",
					type:"button-positive",
					onTap:function(){
						window.location.href="#/repair_tab/myrepair";
						window.location.reload();
					}
				}]
			})
		},function(){
			connection_alert();
		})
	}

	$scope.submit_second_step=function(){
		if($scope.repair_result == 1){
			$ionicPopup.alert({
				title:"注意！",
				template:"<div align='center'>确定该订单维修失败吗？确定后该订单将会重新回到处理中状态!</div>",
				buttons:[{
					text:"确定",
					type:"button-positive",
					onTap:function(){
						submit_repair_failed();
					}
				},{
					text:"取消",
					onTap:function(){
						return;
					}
				}]
			})
			return;
		}
		if($scope.repair_result == 0){
			var appraise_detail = angular.element(document.querySelector('#appraise_detail'))[0].value;
			if($scope.appraise_level != 2 && appraise_detail.length<15){
				$ionicPopup.alert({
					title:"注意！",
					template:"<div align='center'>评价字数不足！</div>"
				})
				return;
			}
			$ionicPopup.alert({
				title:"注意！",
				template:"<div align='center'>确定该订单维修完成吗？确定后将结束该订单任务</div>",
				buttons:[{
					text:"取消",
					onTap:function(){
						return;
					}
				},{
					text:"确定",
					type:"button-positive",
					onTap:function(){
						submit_repair_success($scope.appraise_level,appraise_detail);
					}
				}]
			})
			
		}
		
	}

})

.controller('repair_detail_ctrl',function($ionicScrollDelegate,$state,$rootScope,$ionicModal,$window,$http,$scope,ls,Repair_list,$stateParams,$ionicPopup){
	$scope.$on('$locationChangeSuccess',function(){
		angular.element(document.querySelector('#repair_detail')).scope().$on('$ionicView.beforeLeave',function(){
	    	$rootScope.hideTabs = false;
	    })
	})
	//-------------------img viewer--------------------------
  $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
      
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
    $scope.img_src = '';
    
    $scope.show_img = function(){
      $scope.img_src = ls.get("base_url")+ls.get("cdn_path")+$scope.repair_detail.file[0].file+"."+$scope.repair_detail.file[0].ext;
      $scope.openModal();
    }
    //---------------------------------------------------------

	var warining_alert=function(title,template){
		$ionicPopup.alert({
			title:title,
			template:"<div align='center'>"+template+"</div>"
		})
	}
	var connection_alert=function(){
		$ionicPopup.alert({
			title:"警告",
			template:"<div align='center'>网络异常TaT，请检查后再试</div>"
		})
	}

	$scope.repair_finished=function(){
		$scope.$on('$ionicView.beforeLeave', function() {
            $rootScope.hideTabs = true;
        });
		$state.go('repair_tab.evaluate');
	}
	$scope.submit_step = 1;//显示页面用
	$scope.back_url="repair.html#/tab/myrepair";
	var get_repair_form_detail=function(id){
		var req = get_urlencoded_request(ls.get("base_url")+"/Api/UserRepair/getRepairForm?id="+id,"get");
		$http(req).then(function(response){
			if(response.data.error === -998 || response.data.error === -999){
				$ionicPopup.alert({
					title:"登录超时",
					template:"<div align='center'>请重新登录！</div>"
				});
				return;
			}
			console.log(response);
			$scope.repair_detail = response.data;
			$scope.repair_detail.traces_top = response.data.repair_traces[response.data.repair_traces.length-1];
			$scope.repair_detail.traces = response.data.repair_traces;
			$scope.repair_detail.traces.pop();
			$scope.repair_detail.traces.reverse();
			
		    repair_detail_init();
		},function(){
			$ionicPopup.alert({
				title:"错误！",
				template:"<div align='center'>网络异常，请检查后再试</div>",
				buttons:[{
					text:"确定",
					type:"button-positive",
					onTap:function(){
						window.location.href="repair_detail.html";
					}
				}]
			})
		})
	}
	get_repair_form_detail(ls.get("view_detail"));
	//显示跟单信息的操作
	$scope.order_style = "order-content";
	$scope.show_all = false;
	$scope.show_all_order=function(){
		$scope.show_all = true;
		$scope.order_style = "order-content_all";
	}
	$scope.hide_all_order=function(){
		$scope.show_all = false;
		$scope.order_style = "order-content";
		$ionicScrollDelegate.scrollTop();
	}


	//最上面的状态栏
	$scope.order_state = ["","",""];
	$scope.order_state_icon = ["order-state-icon","order-state-icon","order-state-icon"];
	var get_state_icon_msg=function(){
		switch($scope.repair_detail.status){
			case "5":
			case "6":
				$scope.order_state [2] = "order-state-active";
				$scope.order_state_icon[2] = "order-state-icon-active"
			break;
			case "4":
			case "3":
				$scope.order_state [1] = "order-state-active";
				$scope.order_state_icon[1] = "order-state-icon-active"
			break;
			case "0":
			case "1":
			case "2":
				$scope.order_state [0] = "order-state-active";
				$scope.order_state_icon[0] = "order-state-icon-active"
			break;
		}
	}

	var repair_detail_init=function(){
		//跟单情况 order_trace
		$scope.order_trace = $scope.repair_detail.updated_at;
		get_state_icon_msg();
		$scope.repair_detail.img = ls.get("base_url")+ls.get("cdn_path")+$scope.repair_detail.file[0].thumb+"."+$scope.repair_detail.file[0].ext;
		$scope.repair_detail.name = ls.getObject("login_msg_client").real_name;
	}
	

	//第一个提交
	$scope.submit_first_step=function(){
		$scope.submit_step = 2;
	}

	//返回详情页面
	$scope.submit_step_back=function(){
		$scope.submit_step = 1;
	}
	

	//第二提交页面
	//维修状态
	


})