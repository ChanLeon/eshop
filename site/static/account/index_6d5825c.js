$(document).ready(function(){
    let $regForm = $('#reg');
    let $regSub = $regForm.find('.register');
    let $phone = $regForm.find('input[name=phone]');
    let $qq = $regForm.find('input[name=qq]');
    let $email = $regForm.find('input[name=email]');

	$('.cancel').on('click', function() {
        window.location.href = '/home/index';
    })

    $regSub.on('click', function(){
        let confirmTrue = $regForm.validator({
            'username': ['notEmpty', '用户名不能为空'],
            'passwd': ['is', '登录密码应为6-18位', '^\\S{6,18}$'],
            'rePasswd': ['value_eq', '两次输入的密码不一致', 'passwd'],
            'gender': ['notEmpty', '性别不能为空'],
        }, false, function(info){
            if(info) {
                $('.errInfo').text('*' + info);
                return false;
            }
        })

        if(confirmTrue) {
            let phoneVal = $.trim($phone.val());
            let qqVal = $.trim($qq.val());
            let emailVal = $.trim($email.val());
            if(phoneVal.length == 0 && qqVal.length == 0 && emailVal.length == 0){
                var str = '*亲，联系方式需要留一个，方便咱们以后能唠嗑';
                $('.errInfo').text(str);
                return false;
            }else if(phoneVal.length != 0 || qqVal.length != 0 || emailVal.length != 0) {
                var phoneTrue = (/^1(4[0-9]|3[0-9]|5[0-35-9]|7[06-8]|8[0-9])\d{8}$/).test(phoneVal);
                var emailTrue = (/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/).test(emailVal);
                var qqTrue = (/^\d\+{5,15}$/);
                console.log('isTrue',phoneTrue);
                if(phoneTrue || emailTrue || qqTrue){
                    $regForm.submit();
                }else{
                    var str = '*亲，格式不正确';
                    $('.errInfo').text(str);
                    return false;
                } 
            }
        }
    })
    

})