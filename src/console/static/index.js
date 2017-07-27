$(document).ready(function(){
    let $uploadForm = $('#upload');
    let $uploadSub = $uploadForm.find('.upload');
    let $picUrl = $uploadForm.find('#picUrl');
    let $picName = $uploadForm.find('#picName');
    let $picPrice = $uploadForm.find('#picPrice');

    $uploadSub.on('click', function(){
        if($.trim($picUrl.val()).length == 0 && $.trim($picName.val()).length == 0 && $.trim($picPrice.val()).length == 0) {
            var str = '三个输入框为空，不能更新';
            $('.errInfo').text(str);
            return false;
        }else {
            $uploadForm.submit();
        }
    })   

})