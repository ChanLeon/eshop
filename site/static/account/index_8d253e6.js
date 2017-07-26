$(document).ready(function(){
    let $regForm = $('#reg');
    let $regSub = $regForm.find('.register');

	$('.cancel').on('click', function() {
        window.location.href = '/home/index';
    })

    $regSub.on('click', function(){
        let confirmTrue = $regForm.validator({
            'username': ['notEmpty', '用户名不能为空'],
            'passwd': ['is', '登录密码应为6-18位', '^\\S{6,18}$'],
            'rePasswd': ['value_eq', '两次输入的新密码不一致', 'passwd'],
            'gender': ['notEmpty', 'gender'],
            
        }, false, function(info){
            if(info) {
                alert(info);
                return false;
            }
        })
    })
    

})