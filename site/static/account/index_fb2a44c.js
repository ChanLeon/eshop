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
            'rePasswd': ['value_eq', '两次输入的新密码不一致', 'passwd'],
            'gender': ['notEmpty', '性别不能为空'],
        }, false, function(info){
            if(info) {
                alert(info);
                return false;
            }
        })

        if(confirmTrue) {
            if($.trim($phone.val()).length == 0 && $.trim($qq.val()).length == 0 && $.trim($email.val()).length == 0){
                $('#email').after('<div class="text-center err">亲，联系方式就留一个吧，方便咱们以后能唠嗑</div>');
                return false;
            }else if($.trim($phone.val()).length != 0 || $.trim($qq.val()).length != 0 || $.trim($email.val()).length != 0) {
                $regForm.submit();
            }
        }
    })
    

})