
starter_controllers
.factory('repair_form',function(ls,$http,$ionicPopup){
	var repair = {
		name:"",
		connect:"",
		position:"",
		reservation_date:"",
		reservation_time:"",
		repair_subject:"",
		repair_content:"",
		repair_public:false,
		repair_detail:"",
		img:[""]
	};
	var repair_content = {
		first_menu:[],
		repair_time:[],
		repair_area:[]
	}

	return {
		get_imgs:function(){
			return repair.img;
		},
		set_img:function(index,src){
			repair.img[index] = src;
		},
		set_repair_content_time:function(time){
			repair_content.repair_time.push(time);
		},
		clear_repair_content_time:function(){
			repair_content.repair_time = [];
		},
		set_repair_content:function(){
			var req = {
			     method: "get",
			     url: ls.get("base_url")+"/Api/UserRepair/getRepairItems",
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
			 }
			 $http(req).then(function(response){
			 	if(response.error<0){
			 		$ionicPopup({
				 		title:"注意！",
				 		template:"<div align='center'>网络异常，建议重新登录后再试</div>"
				 	})
			 	}
			 	if(response.data.error < 0){
			 		alert(response.data.msg+',请重新登录');
			 	}
			 	repair_content.first_menu = response.data;
			 	ls.setObject("repair_item_client",response.data);
			 },function(response){
			 	$ionicPopup({
			 		title:"注意！",
			 		template:"<div align='center'>网络异常，请稍后再试</div>"
			 	})
			 })

			 //area
			 var req = {
			     method: "get",
			     url: ls.get("base_url")+"/Api/UserRepair/getAreas",
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
			 }
			 $http(req).then(function(response){
			 	// console.log(response.data);
			 	repair_content.repair_area = [];
			 	for(i=0;i<response.data.length;i++){
			 		repair_content.repair_area.push(response.data[i]);
			 	}
			 	ls.setObject("repair_area_client",repair_content.repair_area);
			 },function(response){
			 	$ionicPopup({
			 		title:"注意！",
			 		template:"<div align='center'>网络异常，请稍后再试</div>"
			 	})
			 })
		},
		get_repair_content:function(){
			return repair_content;
		}
	}
})
.factory('Repair_list',function(ls,$http){
	var repair_list = [];

	return{
		show_list:function(){
			return repair_list;
		},
		show_list_by_id:function(repair_id){
			for(i=0;i<repair_list.length;i++){
				if(repair_list[i].id == repair_id){
					return repair_list[i];
				}
			}
		},
		refresh:function(){
			this.page = 1;
			repair_list = [];
			this.get_list();
		},
		page:1,
		get_list:function(){//后端
			var data;
			var that = this;
			var req = get_urlencoded_request(ls.get("base_url")+"/Api/UserRepair/getRepairForms?page="+this.page,"get");
			$http(req).then(function(response){
				data = response.data;

				if(data.length == 0){
					alert('已无更多');
					return false;
				}

				finished_tag = "img/tools/repair/finished_tag.png";
				processing_tag = "img/tools/repair/processing_tag.png";
				handed_on_tag = "img/tools/repair/handed_on_tag.png";
				need_need_estimate = "img/tools/repair/need_estimate.png";
				for(i=0;i<data.length;i++){
					switch(data[i].status){
						case '0':
						case '1':
						case '2':
							data[i].state_img = handed_on_tag;
							data[i].state = "已提交";
						break;

						case '3':
							data[i].state_img = processing_tag;
							data[i].state = "处理中";
						break;

						case '4':
							data[i].state_img = need_need_estimate;
							data[i].state = "处理中";
						break;
						
						case '5':
						case '6':
							data[i].state_img = finished_tag;
							data[i].state = "已完成";
					}
					repair_list.push(data[i]);
				}
				that.page ++;
			},function(response){
				connection_alert();
			})

			
		}
	}
})

.factory('repair_result_form',function(){
	var submit_form = {

	};
	return {
		
	}
})
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])