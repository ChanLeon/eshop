$(document).ready(function(){
    //滚动图片的更新
    let $uploadForm = $('#upload');
    let $uploadSub = $uploadForm.find('.upload');
    let $picInfo = $uploadForm.find('#file');

    //滚动图片的初始化增加
    let $createPicInfo = $('.createPicInfo');
    let $createPicForm = $('#createPic');
    let $createPicSub = $createPicForm.find('.createPic');
    let $createInfo = $createPicForm.find('#file');

    //女装增加商品提交
    let $clothAddForm = $('#clothAdd_');
    let $clothAddSub = $clothAddForm.find('.clothAdd_');
    let $clothAddName = $clothAddForm.find('#clothAddName');
    let $clothAddPrice = $clothAddForm.find('#clothAddPrice');
    let $clothAddFlag = $clothAddForm.find('#clothAddFlag');
    let $clothAddFile = $clothAddForm.find('#clothAddFile');

    //女装编辑商品
    let $clothEditForm = $('#clothEdit_');
    let $clothEditSub = $clothEditForm.find('.clothEdit_');
    let $clothEditName = $clothEditForm.find('#clothEditName');
    let $clothEditPrice = $clothEditForm.find('#clothEditPrice');
    let $clothEditFile = $clothEditForm.find('#clothEditFile');

    //滚动图片的初始化增加
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

    //滚动图片的更新
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
    
    //女装增加商品提交
    $clothAddSub.on('click', function() {
        if($.trim($clothAddName.val()).length == 0 || $.trim($clothAddPrice.val()).length == 0 || $.trim($clothAddFlag.val()).length == 0 || $clothAddFile.val().length == 0) {
            var str = '商品信息不能为空';
            $('.errInfo').text(str);
            return false;
        }else if($clothAddFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($clothAddFile.val())){
            var str = '请选择图片格式文件上传';
            $('.errInfo').text(str);
            return false;
        }else {
            $clothAddForm.submit();
        }
    })

    //女装编辑商品
    $clothEditSub.on('click', function() {
        if($.trim($clothEditName.val()).length == 0 && $.trim($clothEditPrice.val()).length == 0 && $clothEditFile.val().length == 0) {
            var str = '商品编辑信息不能全部为空';
            $('.errInfo').text(str);
            return false;
        }else if($clothEditFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($clothEditFile.val())){
            var str = '请选择图片格式文件上传';
            $('.errInfo').text(str);
            return false;
        }else {
            $clothEditForm.submit();
        }
    })




})