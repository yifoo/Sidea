// 设置总页面切换
(()=>{
var pageSwiper = new Swiper('#page', {
	// autoplay: 5000,//可选选项，自动滑动
	direction:'vertical',//方向
	mousewheelControl:true,//鼠标滚动控制
	scrollbarHide:true,
	pagination : '.swiper-pagination', //分页器的class类css名
	paginationType : 'bullets',//分液器样式
	paginationClickable :true,//分页器点击控制
	paginationBulletRender: function (swiper, index,className) {
	      return '<span class="' + className + '">' + (index + 1) + '</span>';
	  } ,   //自定义分页器的指示点
	onInit:function(pageSwiper){//初始化
		$("#brand-box").slideUp();
		$(".text-box>div").removeClass("show");
	},
	runCallbacksOnInit : true,
	onSlideChangeEnd:function(pageSwiper){
		if(pageSwiper.activeIndex!=1){
		page2Slide1Animation();
		}
	},
	onSlideChangeStart:function(pageSwiper){
		switch(pageSwiper.activeIndex){
			case 1:page2Slide1Animation();
			$(".text-box>div").removeClass("show");
		  $("#brand-box").slideUp();
		 	 break;
			case 2:$("#brand-box").slideDown();
			$(".text-box>div").removeClass("show");
		  break;
		  case 3:$("#page4 .text-box>div").addClass("show");
		  $("#brand-box").slideUp();
			$("#page6 .text-box>div").removeClass("show");
		  break;
		  case 4:
			$(".text-box>div").removeClass("show");
		  $("#brand-box").slideUp();
			break;
		  case 5:$("#page6 .text-box>div").addClass("show");
		  $("#brand-box").slideUp();
			$("#page4 .text-box>div").removeClass("show");
			break;
			default:
		  $("#brand-box").slideUp();
			$(".text-box>div").removeClass("show");
		}
	},
	autoHeight: true,
})
pageSwiper.slideTo(0, 1000, true);
// pageSwiper.slideTo(1, 1000, true);
})();
// 设置page2的水平切换
(()=>{
var page2Swiper= new Swiper('#page2-container', {
	direction:'horizontal',
	pagination : '.page2Nav', //分页器类名
	paginationType : 'bullets',
	scrollbarHide:true,
	paginationClickable:true,
	paginationBulletRender: function (swiper, index,className) {
		console.log(className);
	      return '<span class="' + className + '"></span>';
	  } ,   //自定义分页器的指示点
	onSlideChangeStart:function(swiper){
		if(page2Swiper.activeIndex==1){
			page2Slide2Animation();
			console.log(1)
		}
	},
	onSlideChangeEnd:function(swiper){
		if(page2Swiper.activeIndex!=1){
			page2Slide2Animation();
		}
	},
	grabCursor : true,
})
page2Swiper.slideTo(0, 1000, true);
})();
// page1的动态粒子背景
(()=>{
var ctx = canpic.getContext("2d");
	// 绘制一个点
var dots=function(){
	// 画布相关
	this.canvas;
	this.ctx;
	// 绘制点相关
	this.x;
	this.y;
	this.r;
	// 移动相关
	this.sx;
	this.sy;
}
dots.prototype={
	init:function(canvas){
		this.canvas=canvas;
	this.ctx=canvas.getContext("2d");
	this.x=Math.random()*this.canvas.width;
	this.y=Math.random()*this.canvas.height;
	this.r=Math.random()*2;
	// 随机确定点的移动速度与方向 速度值在 [-2, 2) 之间 提高数值可加快速度
	this.sx = Math.random() * 2-1;
	this.sy = Math.random() * 2-1;
	//绘制圆点
	this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
  this.ctx.fillStyle ="#fe0";
  this.ctx.fill();
  this.ctx.closePath();
},

update:function(){
	this.x = this.x + this.sx;
 	this.y = this.y + this.sy;	
 	//如果点超出canvas画布范围,则重新初始化;
 	if(this.x<0||this.x>this.canvas.width){
 		this.init(this.canvas);
 	}
 	if(this.y<0||this.y>this.canvas.width){
 	 		this.init(this.canvas);
 	}
	//绘制圆点
	this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
  this.ctx.fillStyle ="#fff" ;
  this.ctx.fill();
  this.ctx.closePath();
},

mouseDot:function(x,y){
	this.x = x;
	this.y = y;
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2*Math.PI);
	this.ctx.fillStyle =Math.random()*4<=1? "#fe0" : "#fff";
	this.ctx.fill();
	this.ctx.closePath();
}
}

	var dotsArr=[],
			dotsNum=0,
			maxDotsNum=0,
			overNum=0,//超出最大数量点的数量
			dotsDistance=150,
			canvas = document.getElementById('canpic'),
			ctx=canpic.getContext('2d'),
			width=parseInt($(window).width()),
			height=parseInt($(window).height()),
			area=width*height;//canvas 的面积
			dotsNum=parseInt(area/10000);
			maxDotsNum=dotsNum*2;

			// 设置画布的宽度和长度
		canpic.width=$(window).width();
		canpic.height=$(window).height();
	// 生成点
	for (var i = 0; i < dotsNum; i ++) {
	    var dot = new dots();
	    dotsArr.push(dot);
	    dot.init(canvas);
	}
	//动画与连线
	var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
	requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

	function animateUpdate(){
		ctx.clearRect(0,0,canpic.width,canpic.height);
		if(dotsNum>maxDotsNum){
			overNum=dotsNum-maxDotsNum;
		}
		for(var i=overNum;i<dotsNum;i++){
			dotsArr[i].update();
		}
		//绘制连线
		for (var i = overNum; i < dotsNum; i ++) {
	    for (var j = i + 1; j < dotsNum; j ++) {
	        var tx = dotsArr[i].x - dotsArr[j].x,
	            ty = dotsArr[i].y - dotsArr[j].y,
	            s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
	        if (s < dotsDistance) {
	            ctx.beginPath();
	            ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
	            ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
	            var color=Math.random()*2<=1? "#fe0" : "#fff";
	            ctx.strokeStyle =Math.random()*4<=1? 'rgba(255,238,0,'+(dotsDistance-s)/dotsDistance+')':'rgba(255,255,255,'+(dotsDistance-s)/dotsDistance+')';
	            ctx.strokeWidth = 1;
	            ctx.stroke();
	            ctx.closePath();
	        }
	    }
	  }
	  requestAnimFrame(animateUpdate);
	}
// 鼠标事件
$(document).on("mousemove",(e)=>{
	var tx=e.offsetX;
	var ty=e.offsetY;
	if((tx>0 && tx<width) && (ty>0 && ty<height)){
		dot.mouseDot(tx,ty);
	}
})
})();


// 设置page2中slide1动画函数

function page2Slide1Animation(){
	var $text=$("#whatText");
	var $img=$("#mountain");
	console.log(1)
	if($("#page2").is("[class*=active]") && $("#page2-container .slide1").is("[class*=active]")){
			$text.addClass("text-to-left")
				$img.addClass("img-to-right")
		}
		else{
			$text.removeClass("text-to-left")
			$img.removeClass("img-to-right")
		}
	}



	// 设置page2 slide2的动画
function page2Slide2Animation(){
	var $float=$("#float-text");
		// console.log(2);
		if($("#page2").is("[class*=active]") && $("#page2-container .slide2").is("[class*=active]")){
			var i=0;
			var timer=setInterval(()=>{
				$float.children("p:nth-child("+i+")").addClass('on');
				i++;
				if(i==60){
					clearInterval(timer);
					timer=null;
				}
			},150)
		}
		else{
			$float.children().removeClass('on');
		}
	}

(()=>{
	$(".content1").hover(function(){
		$("[data-toggle=show]").toggleClass("show");
	})
})();

// 图片分层旋转
(()=>{
	var classArr=["p7","p6","p5","p4","p3","p2","p1"];
	var left,zIndex,scale,index=0;
	$("#page5 .prev").click(()=>{
		previmg();
	})
	$("#page5 .next").click(()=>{
		nextimg();
	})
	function previmg(){
		classArr.unshift(classArr[6]);//首位插入最后一个class
		classArr.pop();								//末位取出class
		//i是元素的索引，从0开始
		//e为当前处理的元素
		//each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
		$(".list li").each(function(i,e){
			$(e).removeClass();
			$(e).addClass(classArr[i]);
		})
		index--;
		if (index<0) {
			index=6;
		}
	}
	function nextimg(){
		classArr.push(classArr[0]);
		classArr.shift();
		//i是元素的索引，从0开始
		//e为当前处理的元素
		//each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
		$(".list li").each(function(i,e){
			$(e).removeClass().addClass(classArr[i]);
		})
		index++;
		if (index>6) {
			index=0;
		}
		// show();
	}

	var n=0;
	function moveOnce(){
		n=0;
		left=20;
		zIndex=7;
		scale=0.85;
	}

})()