/**
 * 监测Web离线存储
 * @authors LvHongbin 
 * @date    2018-05-01 17:10:38
 * @version 2018-05-01 17:11
 */

 	/* 下面所有的事件处理程序都使用此函数来显示状态消息  
	 * 由于都是通过调用status函数来显示状态，因此所有处理程序都返回false来阻止浏览器显示其默认状态消息
	 */  
	function status(msg){  
	    console.log(msg); //同时在控制台输出此消息，便于调试  
	} 


	/* 每当应用程序载入的时候，都会检查该清单文件  
	 * 也总会首先触发"checking"事件
	 */  
	window.applicationCache.onchecking = function(){  
	    status("checking for a new version.");  
	    return false;  
	}  

	/* 如果没有改动，同时应用程序也已经缓存了  
	 * "noupdate"事件被触发，整个过程结束 
	 */ 
	window.applicationCache.onnoupdate = function(){ 
		status("The application has been cached"); 
	} 

	/* 如果还未缓存应用程序，或者清单文件有改动  
	 * 那么浏览器会下载并缓存清单中的所有资源  
	 * 触发"downloading"事件，同时意味着下载过程开始
	 */  
	window.applicationCache.ondownloading = function(){  
	    status("Downloading new version");  
	    window.progresscount = 0;  
	    return false;  
	} 


	/* 在下载过程中会间断性触发"progress"事件  
	 * 通常是在每个文件下载完毕的时候 
	 */
	window.applicationCache.onprogress = function(e){  
	    varprogress = "";  
	    if(e && e.lengthComputable)  
	           progress = " "+Math.round(100*e.loaded/e.total)+"%"  
	    else  
	           progress = "("+(++progresscount)+")"  
	    return false;  
		}

	/* 当下载完成并且首次将应用程序下载到缓存中时
	 * 浏览器会触发"cached"事件
	 */  
	window.applicationCache.oncached = function(e){  
	    status("This application has been cached before");  
	    return false;  
	}  
	   
	/* 当下载完成并将缓存中的应用程序更新后，浏览器会触发"updaterady"事件  
	 * 要注意的是：触发此事件的时候，用户任然可以看到老版本的应用程序
	 */  
	window.applicationCache.onupdateready = function(e){  
	    var reload = confirm("A new version has been downloaded. Would you like to Reload to run it?");
	    if(reload) {
	    	applicationCache.swapCache();
	    	if(navigator.onLine) status("navigator.onLine"); 
	    	window.location.reload(); 
	    }
	    return false;  
	}  
	   
	/* 如果浏览器处于离线状态，检查清单列表失败，则会触发"error"事件  
	 * 当一个未缓存的应用程序引用一个不存在的清单文件，也会触发此事件
	 */ 
	window.applicationCache.onerror = function(e){  
	    status("Couldn’t load manifest or cache application");  
	    return false;  
	}  
	   
	/* 如果一个缓存的应用程序引用一个不存在的清单文件，会触发"obsolete"  
	 * 同时将应用从缓存中移除之后不会从缓存而是通过网络加载资源
	 */  
	   window.applicationCache.onobsolete = function(e){  
	        status("This application is no longer cached. Reload to get the latest version from thenetwork."); 
	        applicationCache.swapCache(); 
	        return false;  
	   }  

