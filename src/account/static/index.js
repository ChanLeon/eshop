$(document).ready(function(){
    let $regForm = $('#reg');
    let $regSub = $regForm.find('.register');
    let $phone = $regForm.find('input[name=phone]');
    let $qq = $regForm.find('input[name=qq]');
    let $email = $regForm.find('input[name=email]');

    let $loginForm = $('#login');
    let $loginSub = $loginForm.find('.login');
    let $userName = $loginForm.find('#username');
    let $passWord = $loginForm.find('#passwd');

	$('.cancel').on('click', function() {
        window.location.href = '/home/index';
    })

    $regForm.on('submit', function(e){
        let confirmTrue = $(this).validator({
            'username': ['isEmail', '请输入正确的邮箱地址'],
            'passwd': ['is', '登录密码应为6-18位', '^\\S{6,18}$'],
            'rePasswd': ['value_eq', '两次输入的密码不一致', 'passwd'],
            'gender': ['notEmpty', '性别不能为空']
        }, false, function(info){
            if(info) {
                $('.errInfo').text('*' + info);
                return false;
            }
        })

        if(confirmTrue) {
            let phoneVal = $.trim($phone.val());
            let qqVal = $.trim($qq.val());
            if(phoneVal.length == 0 && qqVal.length == 0){
                var str = '*亲，联系方式至少需要留一个';
                $('.errInfo').text(str);
                return false;
            }else if(phoneVal.length != 0 || qqVal.length != 0) {
                var phoneTrue = /^1(4[0-9]|3[0-9]|5[0-35-9]|7[06-8]|8[0-9])\d{8}$/.test(phoneVal);
                var qqTrue = /^\d{5,15}$/.test(qqVal);
                if(phoneTrue || qqTrue){
                    return true;
                }else{
                    var str = '*亲，您输入的格式不正确';
                    $('.errInfo').text(str);
                    return false;
                } 
            }
        }else {
            e.preventDefault();
        }
    })

    $loginForm.on('submit', function(e){
        if($.trim($userName.val()).length == 0 || $.trim($passWord.val()).length == 0) {
            var str = '*亲，用户名或密码不能为空';
            $('.errInfo').text(str);
            return false;
        }else {
            return true;
        }
    })
    

})