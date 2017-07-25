$(document).ready(function(){
	$("#form").submit(function(event) {

		$("input").each(function(){
	   		if(!$.trim($(this).val())){
	   			event.preventDefault();
                alert("请输入有效的值！！！");
                return false;
            }          
        });	
        // return false;
	});

})