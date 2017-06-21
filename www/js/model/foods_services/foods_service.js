starter_services
.factory('foods_list',function(ls,$http,$ionicPopup){
	var foods_list = [];
	var foods_index_list=[{
		title:"测试1",
		price:"12",
		id:'1'
	},{
		title:"测试2",
		price:"16.5",
		id:'2'
	},{
		title:"测试3",
		price:"15",
		id:'3'
	}];
	return{
		show_list:function(){
			return foods_list;
		},
		add_foods:function(time,name){
			var data = new Object();
			data.time = time.getFullYear()+"-"+time.getMonth()+"-"+time.getDay()+" "+time.getHours()+":"+time.getMinutes();
			data.name = name;
			foods_list.push(data);
		},
		show_index_list:function(){
			return foods_index_list;
		}
	}
})