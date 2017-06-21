starter_services
.factory('Mine',function(ls){//新闻列表model
	var mine =
	{
		name:"黄子韬",
		id:"14201104212",
		portrait:"img/zi_tao.png",
		sex:"汪",
		address:"阿鲁巴",
		school:"韩国汉语遗产大学",
		college:"汉语言",
		subject:"EXXOO",
		grade:"2012",
		sign:"",
		phone:"",
		drom:"H4-212",
		nick:"TT-屋里滔滔"
	};

	return {
		show:function(){//view获取mine
			if(mine!=null)return mine;
			return 404;
		},
		get_mine: function() {
	      var login_msg = ls.getObject("login_msg_client");
	      console.log(login_msg);
	      mine.phone = login_msg.mobile;
	      mine.nick = login_msg.real_name;
	      mine.name = login_msg.real_name;
	      mine.portrait = ls.get("base_url")+ls.get("cdn_path")+login_msg.head+login_msg.ext;
	      mine.sex = login_msg.gender=='1'?"男":"女";
	      mine.school = login_msg.school.name;
	      mine.dormitory = login_msg.dormitory;
	      mine.room = login_msg.room;
	      if(login_msg.major != undefined){
	      	mine.subject = login_msg.major.name;
	      }
	      mine.id = login_msg.student_id;
	      mine.grade = 20+login_msg.student_id.substring(0,2);//后台没有
	    },
	    change_msg:function(what_msg,new_msg){
	    	switch(what_msg){
	    		case "nick":
	    			mine.nick = new_msg;
	    		break;

	    		case "sex":
	    		//..
	    		break;

	    		case "address":
	    		//..
	    		break;

	    		case "sign":
	    			mine.sign = new_msg;
	    		break;

	    		case "drom":
	    		//..
	    		break;

	    		case "portrait":
	    			mine.portrait = new_msg;
	    		break;
	    	}
	    	
	    	//交给后端处理，成功返回新昵称，然后设置model的nick
	    	return ;//true false代表是否秀修改成功
	    },
	    clear_mine: function() {
	    	mine = null;
	    	return ;
	    }
	}
})