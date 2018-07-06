/**
 * 
 * @authors LvHongbin
 * @date    2018-05-02 14:43:01
 * @version 1.0
 * @workerTest.js
 */

onmessage = function(e) {

	console.log("I have got the message e.data = " + e.data);
	if(e.data) postMessage(fib(e.data));
}

var fib = function(n) {	

	return n<=2?n:fib(n-1) + fib(n-2);	
}