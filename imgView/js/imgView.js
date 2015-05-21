/*通过className得到元素对象*/
function getElementByClass(className){
	var classArr=new Array();
	var elements=document.getElementsByTagName('*');
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==className){
			classArr.push(elements[i]);
		}
	}
	return classArr;
}
/*结束*/
window.onload=function(){
/*事件侦听*/
var EventUtil={
	addHandler:function(el,type,handler){
		if(el.addEventListener){
			el.addEventListener(type,handler,false);
		}else if(el.attachEvent){
			el.attachEvent("on"+type,handler);
		}else{
			el["on"+type]=handler;
		}
	},
	removeHandler:function(el,type,handler){
		if(el.removeEventListener){
			el.removeEventListener(type,handler,false);
		}else if(el.detachEvent){
			el.detachEvent("on"+type,handler);
		}else{
			el["on"+type]=null;
		}
	}
};
/*时间侦听结束*/
/*获取元素*/
var nav_left=document.getElementById("nav_left");
var nav_right=document.getElementById("nav_right");
var nav_up=document.getElementById("nav_up");
var nav_down=document.getElementById("nav_down");
var nav_in=document.getElementById("nav_in");
var nav_out=document.getElementById("nav_out");
var contain=document.getElementById("contain");
var img=getElementByClass("image");
var distance=30;/*移动的距离*/
var zoom=0.9;/*缩放的比例*/
/*结束*/
/*img[0].style.position="absolute";*/
img[0].style.left=(contain.offsetWidth-img[0].offsetWidth)/2+"px";
img[0].style.top=(contain.offsetHeight-img[0].offsetHeight-nav_left.offsetHeight)/2+"px";
/*上下左右移动*/
var handler_1=function(){
	var left=img[0].offsetLeft-distance;/*移动后left值*/
	left>0?img[0].style.left=left+"px":img[0].style.left=0+"px";/*三目运算符，如果移到了最左边不能移动*/
};
var handler_2=function(){
	var left=img[0].offsetLeft+distance;/*移动后left值*/
	var maxLeft=contain.offsetWidth-30-img[0].offsetWidth;/*不能超出外边的div框*/
	left<maxLeft?img[0].style.left=left+"px":img[0].style.left=maxLeft+"px";/*如果移动到最右边不能移动*/
};
var handler_3=function(){
	var top=img[0].offsetTop-distance;/*移动后top值*/
	top>0?img[0].style.top=top+"px":img[0].style.top=0+"px";/*如果移到了最上边不能移动*/
};	
var handler_4=function(){
	var top=img[0].offsetTop+distance;
	var maxTop=contain.offsetHeight-30-nav_left.offsetHeight-img[0].offsetHeight;/*不能超出外边的div框*/
	top<maxTop?img[0].style.top=top+"px":img[0].style.top=maxTop+"px";/*如果移动到最下边不能移动*/
};
EventUtil.addHandler(nav_left,"click",handler_1);
EventUtil.addHandler(nav_right,"click",handler_2);
EventUtil.addHandler(nav_up,"click",handler_3);
EventUtil.addHandler(nav_down,"click",handler_4);
/*上下左右移动结束*/
/*放大缩小*/
var handler_5=function(){
	if(img[0].offsetWidth>100&&img[0].offsetHeight>100){
		var width=Math.floor(img[0].offsetWidth*zoom);
		var height=Math.floor(img[0].offsetHeight*zoom);
		img[0].style.width=Math.floor(img[0].offsetWidth*zoom)+"px";
		img[0].style.height=Math.floor(img[0].offsetHeight*zoom)+"px";
	}
};
var handler_6=function(){
	var width=Math.floor(img[0].offsetWidth/zoom);
	var height=Math.floor(img[0].offsetHeight/zoom);
	img[0].style.height=img[0].offsetHeight;
	if(img[0].offsetTop<contain.offsetHeight-height-30-20&&img[0].offsetLeft<contain.offsetWidth-width-30){
		img[0].style.width=width+"px";
		img[0].style.height=height+"px";
		console.log("img[0].offsetHeight="+img[0].offsetHeight);
	}
};
EventUtil.addHandler(nav_in,"click",handler_5);
EventUtil.addHandler(nav_out,"click",handler_6);
}
