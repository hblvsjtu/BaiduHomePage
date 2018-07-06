/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-07-06 23:44:27
 * @version $Id$
 */


/* myfocus_mouseenter和myfocus_mouseleave
 * 鼠标的进出的同时更换myfocus里面图片
 * 目前已经使用CSS实现
 */
var $myfocus = $("#myfocus");
var myfocus = $myfocus[0];
var $myfocusicon = $("#myfocusicon");
var myfocusicon = $myfocusicon[0];
// var myfocus_mouseenter=function() {
// 	myfocusicon.style.backgroundImage='url(picture/myfocus_b2.png)';
// }
// var myfocus_mouseleave=function() {
// 	myfocusicon.style.backgroundImage='url(picture/myfocus_a2.png)';
// }
// myfocus.addEventListener('mouseenter', myfocus_mouseenter, false);
// myfocus.addEventListener('mouseleave', myfocus_mouseleave, false);




/* newsinterest_mouseenter和newsinterest_mouseleave
 * 鼠标的进出的同时更改newsinterest的显藏
 * 但是当新增的模块一多起来的时候，就会出现明显的性能问题
 * 解决的办法最好使用冒泡
 */
var newsrows=document.getElementsByName("newsrows");
var newsinterest=document.getElementsByName("newsinterest");
var contentfocusboxleftside=document.getElementById("contentfocusboxleftside");
var eventproxy = function() {
	var length = document.getElementsByName("newsrows").length;
	var newsinterest_mouseenter=function(evt) {
		for(i=0; i < length; i++) {
			if(evt.target === newsrows[i]) {
				newsinterest[i].style.visibility='visible';
				break;
			}
		}
	};
	var newsinterest_mouseleave=function(evt) {
		for(i=0; i<length+1; i++) {
			if(evt.target === newsrows[i]) {
				newsinterest[i].style.visibility='hidden';
				break;
			}
		}
	};
	contentfocusboxleftside.addEventListener('mouseenter', newsinterest_mouseenter, true);
	contentfocusboxleftside.addEventListener('mouseleave', newsinterest_mouseleave, true);
}
eventproxy();


// var newsinterest_mouseenter=function() {
//     this.style.visibility='visible';
// };
// var newsinterest_mouseleave=function() {
//     this.style.visibility="hidden";
// };
// var length = document.getElementsByName("newsrows").length;
// for(let i=0; i<length; i++) {
    // newsrows[i].addEventListener('mouseenter', newsinterest_mouseenter.bind(newsinterest[i]), false);
    // newsrows[i].addEventListener('mouseleave', newsinterest_mouseleave.bind(newsinterest[i]), false);
// }

/* 增加节点creatElement()
 * 当contentbox高度增加的时候添加节点
 
  var addnewsrows = function() {
  		var newstable = document.getElementById("newstable");
  		var newsrows = document.createElement("div");
  		var length = document.getElementsByName("newsrows").length;
  		newsrows.id = "newsrows_" + length;
  		newsrows.className = "newsrows1";
  		//newsrows.name = "newsrows";无法设置name
  		newsrows.setAttribute("name","newsrows");
  		newstable.appendChild(newsrows);
  }
*/
  /* 通过复制的方式添加节点cloneNode()
   * 当contentbox高度增加的时候添加节点
   */
  var addnewsrows = function() {
  		var newstable = document.getElementById("newstable");
  		var oldnewsrows = document.getElementById("newsrows_1");
  		var newsrows = oldnewsrows.cloneNode(true);
  		length = document.getElementsByName("newsrows").length;
  		lengths=length+1;
  		newsrows.id = "newsrows_" + lengths;
  		newstable.appendChild(newsrows);
  		var newsinterest=document.getElementsByName("newsinterest")
  		newsinterest[length].id="newsinterest_"+ lengths;
  		eventproxy();
  }


    
/* checkScrollOffset
 * 获取窗口滚动条的偏移量
 */
var checkScrollOffset = function(gundong_X, gundong_Y, myWindow) {
	
	//使用指定接受参数的元素
	var gundong_X = document.getElementById(gundong_X);
	var gundong_Y = document.getElementById(gundong_Y);

	//使用指定的窗口，如果不带参数则使用当前窗口
	var w = myWindow || window;
	var d = w.document;

	//除IE8及之前的版本，其他所有的浏览器都能用
	if(w.pageXOffset != null) {
		gundong_X.innerHTML = "正常版本_" + w.pageXOffset;
		gundong_Y.innerHTML = "正常版本_" + w.pageYOffset;
	}
	
	//标准模式下的IE浏览器或其他所有的浏览器
	
	else if(document.compatMode == "CSS1Compat") {
		gundong_X.innerHTML = "标准模式_" + d.documentElement.scrollLeft;
		gundong_Y.innerHTML = "标准模式_" + d.documentElement.scrollTop;
	}

	//怪异模式下的IE浏览器或其他所有的浏览器
	else {
		gundong_X.innerHTML = "怪异模式_" + d.body.scrollLeft;
		gundong_Y.innerHTML = "怪异模式_" + d.body.scrollTop;
	}	
}



/* getViewportSize
 * 获取视窗的宽度和高度
 */
var getViewportSize = function(shichuang_X, shichuang_Y, myWindow) {

	var shichuang_X = document.getElementById(shichuang_X);
	var shichuang_Y = document.getElementById(shichuang_Y);

	//使用指定的窗口，如果不带参数则使用当前窗口
	var w = myWindow || window;
	var d = w.document;

	//除IE8及之前的版本，其他所有的浏览器都能用
	if(w.pageXOffset != null) {
		shichuang_X.innerHTML = "正常版本_" + w.innerWidth;
		shichuang_Y.innerHTML = "正常版本_" + w.innerHeight;
	}
	
	//标准模式下的IE浏览器或其他所有的浏览器
	
	else if(document.compatMode == "CSS1Compat") {
		shichuang_X.innerHTML = "标准模式_" + d.documentElement.clientWidth;
		shichuang_Y.innerHTML = "标准模式_" + d.documentElement.clientHeight;
	}

	//怪异模式下的IE浏览器或其他所有的浏览器
	else {
		shichuang_X.innerHTML = "怪异模式_" + d.body.clientWidth;
		shichuang_Y.innerHTML = "怪异模式_" + d.body.clientHeight;
	}	
}



/* getElementSize
 * 获取元素的宽度和长度
 */
var getElementSize = function(myElement) {
		var myElement = document.getElementById(myElement);
		var box = myElement.getBoundingClientRect();
		var width = box.width || (box.right-box.left);
		var height = box.height || (box.top-box.bottom);
		console.log("box的左上角X坐标："+ box.left +"px;");
		console.log("box的左上角Y坐标："+ box.top +"px;");
		console.log("box的右下角X坐标："+ box.right +"px;");
		console.log("box的右下角Y坐标："+ box.bottom +"px;");
		console.log("box的宽度："+ width +"px;");
		console.log("box的高度："+ height +"px;");

}

document.addEventListener("mousemove", function() {
		checkScrollOffset("gundong_X", "gundong_Y");
}, false);

document.addEventListener("mousemove", function() {
		getViewportSize("shichuang_X", "shichuang_Y");
}, false);

var myElement = document.getElementById("contentbox");
	myElement.addEventListener("mousemove", function() {
		getElementSize("contentbox");
}, false);


/* 调整contentbox的高度
 * 两种方法，一种是点击'seemore'元素
 * 另外一种是比较 预设阈值 > 文档高度 - 视窗高度 - 滚动偏移量Y；
 * 此时增加contentbox的高度
 * 并添加newsrows节点；
 */

var seemore=document.getElementById('seemore');
var contentbox=document.getElementById('contentbox');
var i1=0;
var seemore_click=function() {
	i1=i1+1;
	console.log("i1的值为: "+i1);
	// 为什么是3*177呢？这是因为一次要增加三个newsrows
	var contentbox_height=177*3+ i1*3*177;
	contentbox.style.height=contentbox_height+'px';
};
seemore.addEventListener('click', seemore_click, false);

var setcontentboxHeight = function() {
	var html = document.getElementsByTagName("html")[0];
	var docunmentHeight =html.getBoundingClientRect().height;
	var scrollOffsetY = document.documentElement.scrollTop;
	var visionHeight = document.documentElement.clientHeight;
	console.log("docunmentHeight - visionHeight - scrollOffsetY = " + (docunmentHeight - visionHeight - scrollOffsetY));
	if((docunmentHeight - visionHeight - scrollOffsetY) < 265) {
		addnewsrows();
		addnewsrows();
		addnewsrows();
		seemore_click();
	} 
}
document.addEventListener("mousemove", setcontentboxHeight, false);

/* 判断元素是否溢出
 * 先利用clientHeight获取元素高度，在利用scrollHeight获取内容高度
 * 然后比较这两个高度，如果scrollHeight>clientHeight,则溢出
 */ 
 var isOverflow = function(ele) {
	var element = document.getElementById(ele);
	var scrollHeight = element.scrollHeight;
	var clientHeight = element.clientHeight;
	if(scrollHeight > clientHeight) {
		//console.log(ele + "溢出了");
	}else {
		console.log(ele + "没有溢出");
	}
 }
 document.addEventListener("mousemove", function() {
 		isOverflow("contentbox");
 }, false);


/* 
 * 利用百度服务器的搜索功能
 * 在网址那里进行了替换
 */
var searchinput =document.getElementById("searchinput");
var searchbutton =document.getElementById("searchbutton");
var searchform =document.getElementById("searchform");
var visit = function(){
	var url = "https://www.baidu.com/s?wd=" + searchinput.value + "&rsv_spt=1&rsv_iqid=0x9d24a43d0004052c&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=40&rsv_sug1=27&rsv_sug7=101&rsv_sug2=1&prefixsug=%25E4%25B8%258A%25E6%25B5%25B7%25E4%25BA%25A4%25E9%2580%259A&rsp=0&inputT=11157&rsv_sug4=11157";
	console.log(url);
	window.open(url);
}
searchbutton.addEventListener("click", visit, false);

/* 原生Ajax功能
 * 采用本地调试的时候遭遇跨域问题
 * No 'Access-Control-Allow-Origin' header is present on the requested resource.'Ajax跨域访问解决方案
 * 采用外网调试的时候就那没问题
 * 发现statusText有时会用不了，还是用数字的比较靠谱 
 */
var getMeg = function() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "http://hblvsjtu.picp.io:51688/CompatTest/BaiduHomePage.html");
    httpRequest.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    progressModuel("searchinput",httpRequest);
    httpRequest.onreadystatechange = function() {
    	console.log("HTTP请求的状态 = "+ httpRequest.readyState);
        if(httpRequest.readyState === 4 && httpRequest.status === 200) {
            var type = httpRequest.getResponseHeader("Content-Type");
            if(type.match(/^text/)) {
                console.log(httpRequest.responseText);
            }else {
            	console.log("Content-Type is not text!");
            }
        }else {
        	console.log("HTTP状态码 = "+ httpRequest.status);
        	
        }
    }
    httpRequest.send(null);                   
	}
	searchinput.addEventListener("click", getMeg, false);

	/* HTML进度模块
	 */
	 var progressModuel = function(ele, htmlRequest) {
	 	if(typeof ele !== "string") {
	 		throw new Error("类型错误"); 
	 	}else {
	 		var element = document.getElementById(ele);
	 		if("onprogress" in htmlRequest) {
            //支持progress事件；
            htmlRequest.onprogress = function(e) {
                if(e.lengthComputable) {
                	console.log("progressModuelfunction");
                   	console.log(Math.round(100*e.loaded/e.total) + "% complete"); 
                }
             }
        }
	 	} 
	 }

	 /* 对象编码模块
	  * 主要针对表单对象
	  */
	 var encodeFormData = function(data) {
    var name;
    var value;
    var pair = []; //为了保存名值对；
    if(!data) return "";
    for(name in data) {

        //跳过继承过来的属性
        if(!data.hasOwnProperty(name)) continue;

        //跳过函数
        if(typeof data[name] === "function") continue;

        //替换特殊符号
        value = data[name].toString();
        name = encodeURIComponent(name.replace("%20", "+"));
        value = encodeURIComponent(value.replace("%20", "+"));
        pair.push(name + "=" + value);
    }
    return pair.join("&");
} 
	 

	/* cookie保存
	 */
	var saveCookie = function(name, value, maxAge, domain, path) {
		if(name && value) {
			cookie = encodeURIComponent(name) + "=" +encodeURIComponent(value) + "; ";
     	cookie += "max-age=" + maxAge + "; ";
     	if(domain) cookie += "domain=" + domain + "; ";
     	if(path) cookie += "path=" + path + "; ";
     	document.cookie = cookie;
		}
	} 
	
	saveCookie("name", "lvhongchao", 10, ".hblvsjtu.picp.io", "/");



	/* cookie读取
	 */
	 var readCookie = function() {
	 	var cookie = {};
	 	var all = document.cookie;
	 	if(all === "") {
	 		console.log("the cookie is null");
	 		return;
	 	}
	 	var list = all.split("; ");
	 	for(var i=0; i<list.length; i++) {
	 		var pairs = list[i];
	 		var p = pairs.indexOf("=");
	 		var name = pairs.substring(0, p);
	 		var value = pairs.substring(p+1);
	 		value = decodeURIComponent(value);
	 		cookie[name] = value;
	 		console.log(name + " = " +value);
	 	}
	 	return cookie;
	 }

	readCookie();

	localStorage.setItem("sex", "male");
	sessionStorage.setItem("id", 116020910160);
	console.log(localStorage.getItem("sex"));
	console.log(sessionStorage.getItem("id"));

	/* 地理位置获取模块
	 * 好像只有本地调试模式下才能获得数据
	 * 在外网下调试由于安全性等原因不能获取
	 */ 
	var getPosition = function() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos){
 			var latitude = pos.coords.latitude;
 			var longitude = pos.coords.longitude;
 			console.log("Your position: latitude = " + latitude);
 			console.log("Your position: longitude = " + longitude);
 		});
		}else {
			console.log("navigator.geolocation doesn’t work!");
		}
	}
	// getPosition();
	/* worker moduel
	 * 两种接受消息的方法都可以
	 * 发送消息和接受消息的语句不要嵌套
	 * 但是在workerTest.js里面可以嵌套
	 */ 
	var worker = new Worker("workerTest.js");
	worker.postMessage(40);
	//worker.addEventListener("message", function(e) {console.log("The worker fib result = " + e.data);}, false);
	worker.onmessage = function(e) {console.log("The worker fib result = " + e.data);};

	var class2type = [];
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function toType( obj ) {
	    if ( obj == null ) {
	        return obj + "";
	    }

	    // Support: Android <=2.3 only (functionish RegExp)
	    return typeof obj === "object" || typeof obj === "function" ?
	        class2type[ toString.call( obj ) ] || "object" :
	        typeof obj;
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module

	var bool = true;
	var num = 1;
	var str = "hello";
	var func = function(){};
	var arr = new Array(1,2,3);
	var date = new Date();
	var reg = /^a/;
	var error = new Error();

	console.log("类型判别：Boolean = " + toType(bool));
	console.log("类型判别：Number = " + toType(num));
	console.log("类型判别：String = " + toType(str));
	console.log("类型判别：Function = " + toType(func));
	console.log("类型判别：Array = " + toType(arr));
	console.log("类型判别：Date = " + toType(date));
	console.log("类型判别：RegExp = " + toType(reg));
	console.log("类型判别：Error = " + toType(error));
