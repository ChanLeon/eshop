$(document).ready(function(){
    let $uploadForm = $('#upload');
    let $uploadSub = $uploadForm.find('.upload');
    let $picInfo = $uploadForm.find('#file');

    let $createPicInfo = $('.createPicInfo');
    let $createPicForm = $('#createPic');
    let $createPicSub = $createPicForm.find('.createPic');
    let $createInfo = $createPicForm.find('#file');

    const $myTab = $('#myTab');

    $createPicInfo.on('click', function() {
        $('#pic_modal').modal('show');
    })

    $createPicSub.on('click', function(){
        if($createInfo.val().length == 0) {
            var str = '请选择需要上传的图片，否则不能更新';
            $('.errInfo').text(str);
            return false;
        }else if($createInfo.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($createInfo.val())){
            var str = '请选择图片格式文件上传';
            $('.errInfo').text(str);
            return false;
        }else {
            $('#pic_modal').modal('hide');
            $createPicForm.submit();
        }
    })

    $uploadSub.on('click', function(){
        if($picInfo.val().length == 0) {
            var str = '请选择需要上传的图片，否则不能更新';
            $('.errInfo').text(str);
            return false;
        }else if($picInfo.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($picInfo.val())){
            var str = '请选择图片格式文件上传';
            $('.errInfo').text(str);
            return false;
        }else {
            $uploadForm.submit();
        }
    })   

})