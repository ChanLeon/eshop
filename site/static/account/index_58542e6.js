$(document).ready(function(){
    let $regForm = $('#reg');
    let $regSub = $regForm.find('.register');

	$('.cancel').on('click', function() {
        window.location.href = '/home/index';
    })

    $regSub.on('click', function(){
        let confirmTrue = $regForm.validator({
            'passwd': ['is', '登录密码应为6-18位', '^\\S{6,18}$'],
            'rePasswd': ['value_eq', '两次输入的新密码不一致', 'passwd'],
        }, false, )
    })
    

})