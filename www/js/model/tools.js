starter_services
.factory('Slide_tools',function(){
	var slide_img = [
		{
			src:"img/slide_5.jpg",
			id:"2222q",
			msg:"中山大学南方学院"
		},
		{
			src:"img/slide_2.jpg",
			id:"1231233q",
			msg:"我院举行2015年终总结及表彰大会暨新春团拜会"
		}];
	var all_tools = [//img:105*115
		{
			img_src : "img/tools/index/drom.png",
			action : "repair.html",
			state:"repair_tab.myrepair",
			id:"1111"
		},
		{
			img_src : "img/tools/index/take_out.png",
			action : "electric.html",
			state : "electric_tab.electric_check",
			id:"1112"
		},
		{
			img_src : "img/tools/index/ticket.png",
			action : "ticket_tab",
			state : "ticket_tab.buy_ticket",
			id:"1113"
		},
		{
			img_src : "img/tools/index/omit.png",
			action : "*",
			state : "",
			id:"1114"
		},
		{
			img_src : "#",
			state : "",
			action : "#"
		},
		{
			img_src : "#",
			state : "",
			action : "#"
		},
		{
			img_src : "#",
			state : "",
			action : "#"
		},
		{
			img_src : "#",
			state : "",
			action : "#"
		},
		{
			img_src : "#",
			state : "",
			action : "#"
		},
	];
	return {
		show_slide_imgs:function(){
			return slide_img;
		},
		show_all_tools:function(){
			return all_tools;
		},
		get_slide_imgs:function(){//后端

		},
		get_all_tools:function(){//后端

		}
	}
})