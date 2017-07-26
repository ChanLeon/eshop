(function(window,undefined){
	var toString = {}.toString,
		// 倒计时函数 	second: 执行秒数	process: 执行中回调	complete: 执行完回调
		countdown = function(second, process, complete){
			if (toString.call(second) == '[object Number]') {
				if(second > -1){
					process && toString.call(process) == '[object Function]' && process(second);
					setTimeout(function(){
						countdown(--second, process, complete);
					}, 1000);
				}else{
					complete && toString.call(complete) == '[object Function]' && complete(second);
				}
			}else{
				throw new Error("第一个参数必须是数字");
			}
		};
	window.countdown = countdown;
})(window)