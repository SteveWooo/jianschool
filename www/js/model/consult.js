starter_services
.factory('Slide_news',function(){//轮播model
	var imgs=[
	{
		src:"img/slide_4.png",
		name:"SteveWoo",
		action:"#",
		msg:"我院举行2016年退伍学生新春茶话会",
		id:"1q"
	},
	{
		src:"img/slide_5.jpg",
		name:"SteveWoo",
		action:"#",
		msg:"喜讯：我院工商管理系学子在第3届两岸行销连锁创意企划竞赛中喜获佳绩",
		id:'2q'
	},
	{
		src:"img/slide_6.png",
		name:"SteveWoo",
		action:"#",
		msg:"我院与英国皇家特许管理会计师公会（CIMA）签署合作协议",
		id:'3q'
	}];
	return {
		all_imgs:function(){//返回所有图片
			return imgs;
		},
		remove: function(chat) {//删除轮播图片
	      news.splice(news.indexOf(chat), 1);
	    },
	    get_imgs:function(){//从后端获取轮播图

	    },
	    add_imgs:function(src,name,action){//增加轮播图片
	    	var img_obj = new Object();
	    	img_obj.src = src;
	    	img_obj.name = name;
	    	img_obj.action = action;
	    	news.push(img_obj);
	    },
	    clear_imgs:function(){
	    	imgs = [];
	    }
	}
})
.factory('News',function($http,ls,$ionicPopup){//新闻列表model
	// var news = [
	// {
	// 	id:"1",
	// 	title:"有只雀仔跌落水跌落水跌落水跌落水跌落水跌落水跌落水",
	// 	description:"但我的心每分每刻 仍然被他~~占有~~多少往事甜在心头，夜雨著花这景致，令我忧愁忘记按他的",
	// 	img:"img/index/index-assets/image.jpg",
	// 	time:"2016-1-29",
	// 	author:"野比大雄",
	// 	content:"“一毕业就说拜拜”一直是高校情侣摆脱不了的爱情大魔咒，而娱乐圈的明星也不例外，下面就来扒扒恋情难逃毕业分手魔咒的10大明星。平时在使用Photoshop文字工具的时候，我们经常会用到文字排版，有时输入的文字比较多，需要段落的两端对齐，更加美观，那么怎样才能让段落文字两端对齐哪。平时在使用Photoshop文字工具的时候，我们经常会用到文字排版，有时输入的文字比较多，需要段落的两端对齐，更加美观，那么怎样才能让段落文字两端对齐哪。平时在使用Photoshop文字工具的时候，我们经常会用到文字排版，有时输入的文字比较多，需要段落的两端对齐，更加美观，那么怎样才能让段落文字两端对齐哪。"
	// }

	var slide_news = [{
		title:"学院概况",
		id:"2222q",
		content:"中山大学南方学院是依据教育部教发[2003]8号文的精神，由中山大学与广东珠江投资集团合作，经教育部批准设立的独立学院（教发 函[2006]87号，院校代码为：12619），是一所多学科全日制应用型本科高等学校。</br>学院位于素有”北回归线上的明珠”和”都市桃园”之誉、以温泉著称于世的广州市从化，距广州市中心约80公里。校园布局有致，秀丽宁静，是陶冶情操、读书治学的胜境。"
	},{
		title:"我院举行2015年终总结及表彰大会暨新春团拜会",
		id:"1231233q",
		content:"凯歌辞旧岁，笑语迎新春。1月14日下午，我院2015年年终总结及表彰大会暨新春团拜会在学院学生活动中心隆重举行。院领导喻世友、唐燕、黄静波、龚鸣、冯辉理、刘振宏等与400多名教职工欢聚一堂，总结过去，表彰先进，欢歌笑语，共庆新春。<br>刚刚过去的2015年是我院“三个三年”规划第一阶段的最后一年，是满载收获，成绩斐然的一年。大会开始，喻世友院长兼党委书记首先作2015年学院工作总结报告，回顾过去一年来的累累硕果。<br>喻世友院长指出，学院在2015年紧扣“创一流”目标，抓好“改革”和“规范”两个关键，凝心聚智、改革创新、锐意进取。在大家的共同努力下，学院在教学改革、制度建设、师资队伍、人才培养、学科建设、文化建设等方面取得了令人欣喜的成绩，在第一个“三年”打基础阶段为“建设一流民办大学”奠定了坚实基础。<br><img style='width:100%' src='http://www.nfu.edu.cn/images/nfsys_images/2016/1/QQ%E6%88%AA%E5%9B%BE20160117215016.png'><br>2015年，学院不断完善奖评与激励机制，为教职工的发展创造更好的环境与平台。在此次大会上，学院对南粤优秀教师卫建国副教授、获得2015年度“先进集体”和“先进个人”称号的单位和个人、学院首届师德标兵、师德征文比赛获奖者等进行了表彰，院领导们分别为获奖者颁发了荣誉证书。薄薄的一本证书看似简单，但承载的是老师们的辛勤耕耘与努力奋斗，也见证了学院对教职工们成长与贡献的关注与肯定，更激励了更多南方人奋斗与拼搏的决心。"
	},{
		title:"我院学生创业团队携手阿里巴巴、欧莱雅打造校园O2O新模式",
		id:"110112q",
		content:"1月11日上午，我院大学生创业孵化基地（西区综合楼）首批入驻团队——For Girls 女性生活用品专营店携手阿里巴巴集团、欧莱雅集团为我院师生打造的淘宝特享•欧莱雅下一代特享产品体验馆正式开幕。</br>阿里巴巴美妆个护类目负责人阎石峰、欧莱雅中国电子商务主任郑永强、我院就业指导中心与校友工作部部长马忞出席了开幕式。体验馆店铺由淘宝特享和欧莱雅集团直接提供装修、试用装、产品以及线上线下的配套服务，我院学生创业团队则负责实体店铺的日常运营，吸引其他学生前来购买。馆内陈列着欧莱雅为年轻群体开发的最新产品线试用装，学生可在现场试用，每个试用装都配备了专属二维码，试用满意后，就可以通过扫码直接在淘宝特享频道下单购买，实现不压货，高体验的零成本创业。</br>这是国内首个开在校园内的电商O2O实物产品体验店。它打破了今天校园O2O市场上只下单、派货的常见模式，加入了百分百真实体验的场景，帮助学生群体足不出户就能在校园内寻找到适合自己的产品。这种支持大学生创业的模式不仅在教育界是首次推出，在全国的“互联网+”实施上也是首次。大学生创业孵化基地（西区综合楼）是我院作为全面支持学生在校园内进行职业能力锻炼和创业的尝试。经过数月的运转，现已正式进入轨道，大学生创业者们通过不断提升服务品质，优化产品,为学院师生提供餐饮、购物、物流快递等多方面优质的后勤服务。"
	},{
		title:"退伍不褪色 再创新辉煌——我院举行2016年退伍学生新春茶话会",
		id:"1q",
		content:"<div style='font-size: 1.4em;color: #444;line-height: 1.2em;text-align:justify; text-justify:inter-ideograph;padding-left: 1em;padding-right: 1em;'>为进一步推进我院国防教育工作，弘扬军人优良作风，关心关怀退伍学生，1月11日上午，学生工作部（武装部）在实验楼第一会议室组织召开2016年退伍大学生新春茶话会。各系学工办主任、辅导员老师、武装部老师、退伍学生出席了茶话会，大家欢聚一堂，畅谈难忘的军旅生活，展望未来的发展。<br><img style='width:100%' src='http://www.nfu.edu.cn/images/nfsys_images/2016/1/8M0A2163.jpg'>茶话会伊始，学工部常务副部长乔华锋首先对在座退伍大学生积极献身国防表示感谢，希望他们重返学校后热情依旧，积极发扬部队中不怕吃苦、不怕流血的优良作风，尽快适应从“拿枪”军人向“拿笔”学生的转变。同时希望退伍大学生们积极凝聚人心，组成社团组织，协助武装部开展征兵工作、欢送新兵、欢迎退伍兵等国防教育工作，并提议以退伍大学生士兵为主筹建军训教官队，承担学院新生军训任务。<br>在积极热烈的自由发言环节，退伍大学生各抒己见，回忆那段熠熠发光的军旅生活。现任国旗班班长、来自会计学系的李昌明同学依然忘不了对那身军装的依恋，十分珍惜每一次可以穿上军装的机会。为了发挥退伍大学生的优势，也让自己退伍生活过得更有意义，他积极参与了2015级新生军训任务。而曾在广东佛山消防服役并获得“个人三等功”和“个人优秀士兵”称号、来自行政管理专业的谢烁同学则生动形象地讲述了自己在火灾现场亲自灭火的难忘经历。他表示在火场上的成功救援源于内心始终秉承着全心全意为人民服务的宗旨，以及平时坚持严格刻苦的高强度训练，“平时多流汗，战时少流血”，“在进行体能训练时，班长会开着消防车来追。”<img style='width:100%' src='http://www.nfu.edu.cn/images/nfsys_images/2016/1/13.jpg'><br>来自经济学与商务管理系、2013年退伍兵梁梓豪借用抗战老兵的话“曾尽匹夫责，不负少年头”，希望在座退伍大学生能够以实际行动做到“退伍不褪色”，在部队为国防作贡献，退伍后要为学校、为社会作出贡献。<br>至此，2016年退伍大学生新春茶话会圆满结束。</div>"
	},{
		title:"喜讯：我院工商管理系学子在第3届两岸行销连锁创意企划竞赛中喜获佳绩",
		id:"2q",
		content:"<div style='font-size: 1.4em;color: #444;line-height: 1.2em;text-align:justify; text-justify:inter-ideograph;padding-left: 1em;padding-right: 1em;'>近日，由台湾朝阳科技大学管理学院主办，旨在连结校际资源，促进两岸高校的学术交流、教育水平与合作的2015年“第3届两岸营销连锁创意企划竞赛”已落幕，我院工商管理系学子们首次组队角逐，有七支参赛队伍获奖，两队获得组别赛的第二名，三队获得组别赛的优胜奖，两队获组别赛的佳作奖。<br>不是国赛堪比国赛。本次竞赛有来自两岸高校共47所394队报名，其中台湾参赛学校共34间92队，大陆参赛学校共13间302队，角逐甚为激烈。竞赛分创意行销、创意经营、婚宴企划等三大竞赛类组。大赛前后进行了初赛和决赛两个阶段，并分别从策划的可行性、创新性、内容架构完整性以及预期效益等方面进行评选。<br>有准备、有能力就有收获。赛前，指导老师与参赛学生一起详细分析了评审角度及研究作品内容，对参赛方案反复不断地完善，经过认真准备，最终获得佳绩。获奖的成员包括12级工商管理专业、13级电子商务专业、13和14级市场营销专业等数十位学生，通过跨年级、跨专业组队方式，互相弥补知识、创意的不足，有利于扩大学生的见识与视野。<br></div>"
	},{
		title:"我院与英国皇家特许管理会计师公会（CIMA）签署合作协议",
		id:"3q",
		content:"<div style='font-size: 1.4em;color: #444;line-height: 1.2em;text-align:justify; text-justify:inter-ideograph;padding-left: 1em;padding-right: 1em;'>1月13日上午，我院与英国皇家特许管理会计师公会(以下简称CIMA)战略合作签约仪式在专家楼举行。英国皇家特许管理会计师公会中国大陆事务总监徐国栋先生、CIMA华南区总监潘鉴标先生、我院副院长黄静波、我院会计学系主任卫建国、副主任董成杰等领导出席了签约仪式。<img style='width:100%' src='http://www.nfu.edu.cn/images/nfsys_images/2016/1/%E5%8F%8C%E6%96%B9%E4%BC%9A%E8%B0%88%E4%B8%AD.jpg'>签约仪式上，副院长黄静波代表学院致辞。他首先向对支持我院教学事业发展的CIMA表示了感谢。他表示，南方学院一直把自己定位为培养应用型人才的高校，强调以学生职业发展为导向，注重学生实践能力的培养。他强调，近年来，学院一直在推动学校与企业、行业职业团体的合作，不断尝试协同育人培养新模式。他还肯定了会计学系在国际化合作办学方面取得的卓越成效，并希望能借助此次签约为新契机，双方不断深化合作层次，推动我院财会专业取得长足发展。<br>CIMA中国大陆事务总监徐国栋先生简要阐述了CIMA的教育理念及其知识体系对于国际化会计管理人才的积极意义，并介绍了目前CIMA在国内与高校合作的模式。他表示，随着中国经济的转型升级，管理会计在经济发展的作用将日益凸现。借助于CIMA的国际化、专业化、实务化、精英化的优势，将不断助力南方学院财会类学生的培养。<br>会计学系主任卫建国指出，此次引入与CIMA的战略合作，是从学生的职业发展需求出发，本着以生为本的办学理念而进行的。他表示，国内的财会行业经历了会计准则与国际接轨、内部控制制度引入、管理会计的不断兴起三种改革方式， 2014年更是被称为中国管理会计元年。会计学系与CIMA的合作正是在这种大背景下应运而生。卫主任还就师资培养、课程体系、考试情况与CIMA代表交换了意见。<img style='width:100%' src='http://www.nfu.edu.cn/images/nfsys_images/2016/1/%E5%8F%8C%E6%96%B9%E7%AD%BE%E7%BA%A6%E6%88%90%E5%8A%9F.jpg'><br>随后，黄静波副院长、CIMA中国大陆事务总监徐国栋先生代表双方签署了战略合作协议，并交换了纪念品。<br>新闻链接：CIMA是英国皇家特许管理会计师公会(The Chartered Institute of Management Accountants)的简称，成立于1919年，总部设在伦敦，在168个国家及地区均设有分支机构或联络处，是当今世界上规模最大且发展迅速的国际性管理会计师组织。CIMA一直以来紧密结合充满活力和挑战的商界需求，坚持不懈地致力于企业财务管理及战略决策的研究和开发，提供了世界上极具权威性的高端财务职业资格认证。CIMA在国际商界享有近百年盛誉，是世界顶级的管理会计师考试、管理与认证机构，同时也是国际会计师联合会(IFAC)的创始成员之一。</div>"
	}];
	var news = Array();

	return {
		all_news:function(){
			return news;
		},
		remove_news: function(news) {
	      news.splice(news.indexOf(news), 1);
	    },
	    get_all_news: function() {//后端获取news
			news = [];
	    	$http.get(ls.get("base_url")+"/Api/News/index")
	    	.then(function(response){
	    		if(response.data.error<0){
	    			$ionicPopup.alert({
	    				title:"注意！",
	    				template:"<div align='center'>"+response.data.msg+"</div>"
	    			})
	    			return;
	    		}

	    		for(i=0;i<response.data.length;i++){
	    			var data = response.data[i]
	    			data.title = data.content;
	    			data.description = data.description;
	    			data.img = ls.get("base_url")+ls.get("cdn_path")+data.file.thumb+"."+data.file.ext;
	    			news.push(data);
	    		}
	    		console.log(response.data);
	    	})
	    	return ;
	    },
	    get_news_content:function(news_id){
	    	var full_news = new Object();

	    	return full_news;
	    },
	    set_news:function(news){
	    	news = news;
	    },
	    clear_news:function(){
	    	news = [];
	    },
	    show_news:function(news_id){
	    	all_news = ls.getObject("all_news");
	    	for(var key in all_news){
	    		if(all_news[key].id == news_id){
					return all_news[key];
				}				
	    	}
	    	for(var key in slide_news){
	    		if(slide_news[key].id == news_id){
					return slide_news[key];
				}				
	    	}
	    	var error = new Object();
	    	error.title="网络故障";
			return error;
	    },
	    show_tools_detail_news:function(id){
	    	for(var key in slide_news){
	    		if(slide_news[key].id == id){
					return slide_news[key];
				}				
	    	}
	    	var error = new Object();
	    	error.title="网络故障";
			return error;
	    }
	}
})