$(function(){
	//关闭页面上的大广告
	var countdown=10;
	var countdown_timer=setInterval(function(){
		$("#countdown").text(countdown--);
		if(countdown<0){
			clearInterval(countdown_timer);
			$("#float_advert").hide();
		}
	},1000);
	//关闭广告1
	$("#close").on("click",function(){
		$(".index_advert").hide();
	});
	//关闭广告2
	$("#close_btn").on("click",function(){
		$("#float_advert").hide();
	});
	//搜索框效果
	$(".searchtext").on("mouseenter",function(){
		$(".search").css("border","2px solid #D11120");
		$(".serchwrap_cont").fadeIn("slow").on("mouseenter",function(){
		$(".serchwrap_cont").show();
		$(".search").css("border","2px solid #D11120");
		});
	});
	$(".searchtext").on("mouseleave",function(){
		$(".search").css("border","2px solid #DFDFDF");
		$(".serchwrap_cont").hide()
		
	});
	$(".serchwrap_cont").on("mouseleave",function(){
			$(this).hide()
		$(".search").css("border","2px solid #DFDFDF");
	});


	//行业分类导航栏循环行业分类的Ul
 	$(".topbg_left >ul >li >span").each(function(i){
		var y=-25+(-i*30)+"px";
		$(this).css("backgroundPosition-x","-388px");
		$(this).css("backgroundPosition-y",y);
	});
	$(".topbg_left >ul >li").hover(function(i){
		var y=-25+(-i*30)+"px";
		var index=$(this).index();
		$(this).children("span").css("backgroundPosition-x","-410px");
		$(this).children("span").css("backgroundPosition-y",y);
		$(".none").show();
		$(".none").children().eq(index).show().animate({left:0},300);
	},function(i){
		var y=-25+(-i*30)+"px";
		var index=$(this).index();
		$(this).children("span").css("backgroundPosition-x","-388px");
		$(this).children("span").css("backgroundPosition-y",y);
		$(".none").hide();
		$(".none").children().eq(index).hide().css("left","-5px");
		});

	// 分类导航展示效果
     $(".none .float_nav").on("mouseenter",function(){
     	$(this).show();
     });
       $(".none .float_nav").on("mouseleave",function(){
     	$(this).hide();
     });


      //楼层导航栏效果

      $(".floorSidbar ul li s").each(function(i){
      	var y=-25+(-i*30)+"px";
		$(this).css("backgroundPosition-x","-385px");
		$(this).css("backgroundPosition-y",y);
      });
      $(window).on("scroll",function(){
      	var offTop=$(".floolcont").first().offset().top;
      	var winHeight=$(window).height();//窗口高度
      	var scrollTop=$(window).scrollTop();//滚动高度
      	
      	if(scrollTop>offTop-winHeight/2){
      		$(".floorSidbar").show();
      	}else{
      		$(".floorSidbar").hide();
      	}
      	$(".floolcont").each(function(index,element){
      		var _offsetTop=$(element).offset().top;
      		if(scrollTop>_offsetTop-winHeight/2){
      			$(".floorSidbar ul li").eq(index).children("a").addClass("show").end().siblings().children("a").removeClass("show");
      		}

      	});
     });
      //点击导航跳转的效果
      $(".floorSidbar >ul").on("click","li",function(){
      	// $(window).unbind("scroll");
      	var _index=$(this).index();
      	var _offsetTop=$(".floolcont").eq(_index).offset().top;
       $("html, body").stop().animate({scrollTop:_offsetTop}, 700);
      });
     
 //导航移入移除效果
      // 导航移入移出效果
    $(".floorSidbar >ul >li").hover(function(){
        // 鼠标移入
        $(this).children("a").addClass("show");
    }, function(){
        // 鼠标移出

        if ($(".show").length > 1)
            $(this).children("a").removeClass("show");
    });


	


	//轮播图
	var $ul=$(".banner_container >ul");
	var $lis=$(".banner_container >ul >li");
	var $len=$lis.length;
	var $lisWidth=$lis.eq(0).width();
	var currentIndex=1;
	var nextIndex=2;
	var first=$lis.eq(0).clone(true);
	var last=$lis.eq($len-1).clone(true);
	//复制第一个和最后一个节点
	first.appendTo($ul)	;
	last.insertBefore($lis.eq(0));
	//添加小圆点
	// var circles=$lis.slice(0,6);
	var $circles=[];
	$lis.each(function(i){
		var _div=document.createElement("li");
			$circles.push(_div);
		$(_div).appendTo($("#pages >ul"));
		if(i==0){
			$(_div).addClass("active");
		}
		$(_div).on("click",function(){
			nextIndex=i+1;
			move();
		});

	});
	//鼠标放在容器上时停止定时器
	$(".banner_container").on("mouseenter",function(){
		clearInterval(timer);
		$("#prev").css("display","block");
		$("#next").css("display","block");
	});
	$(".banner_container").on("mouseleave",function(){
		timer=setInterval(move,3000);
		$("#prev").css("display","none");
		$("#next").css("display","none");
	});
	//点击上一页下一页
	$("#prev").on("click",function(){
		nextIndex=currentIndex-1;
		console.log(currentIndex);
		move();
	});
	$("#next").on("click",function(){
		move();
	});
	$len=$len+2;
	$ul.width($len*$lisWidth+"px");
	$ul.css("left",-1*currentIndex*$lisWidth+"px");
	
	var timer=setInterval(move,3000);
	function move(){
		var _left=-1*nextIndex*$lisWidth;

		var circleIndex = nextIndex === 0 ? $len - 3 : (nextIndex === $len - 1? 0 : nextIndex - 1);
		$($circles).each(function(i){
			$(this).removeClass("active");
		});
		$($circles[circleIndex]).addClass("active");


		currentIndex=nextIndex;
		nextIndex++;
		$ul.animate({
				left:_left+"px"
		},1000,function(){
			if(nextIndex>=$len){
			$ul.css("left",-$lisWidth+"px");
			currentIndex=1;
			nextIndex=2;
			}
			if(currentIndex==0){
			$ul.css("left",-1*($len-2)*$lisWidth+"px");
			currentIndex=$len-2;
			nextIndex=$len-1;
			}
		});
		
	}
	
	//吸顶效果
	$(window).scroll(function(){
		if($(window).scrollTop()<300){
			$(".searchflow").hide();
		}else{
			$(".searchflow").show();
		}

	});
	//侧边栏（购物车、客户端、在线客服、用户反馈）效果
	$(".slider >ul >li >a >s").on("mouseenter",function(){
		$(this).next().show(200);
	});
	$(".slider >ul >li >a >s").on("mouseleave",function(){
		$(this).next().hide();
	});
	//1f
	
});