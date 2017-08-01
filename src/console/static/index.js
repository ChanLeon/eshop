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

    //女装删除商品
    let $clothDelForm = $('#clothDel_');
    let $clothDelSub = $clothDelForm.find('.clothDel_');

    //女包增加商品
    let $bagsAddForm = $('#bagsAdd_');
    let $bagsAddSub = $bagsAddForm.find('.bagsAdd_');
    let $bagsAddName = $bagsAddForm.find('#bagsAddName');
    let $bagsAddPrice = $bagsAddForm.find('#bagsAddPrice');
    let $bagsAddFlag = $bagsAddForm.find('#bagsAddFlag');
    let $bagsAddFile = $bagsAddForm.find('#bagsAddFile');

    //女包编辑商品
    let $bagsEditForm = $('#bagsEdit_');
    let $bagsEditSub = $bagsEditForm.find('.bagsEdit_');
    let $bagsEditName = $bagsEditForm.find('#bagsEditName');
    let $bagsEditPrice = $bagsEditForm.find('#bagsEditPrice');
    let $bagsEditFile = $bagsEditForm.find('#bagsEditFile');

    //女包删除商品
    let $bagsDelForm = $('#bagsDel_');
    let $bagsDelSub = $bagsDelForm.find('.bagsDel_');

    //女鞋增加商品提交
    let $shoesAddForm = $('#shoesAdd_');
    let $shoesAddSub = $shoesAddForm.find('.shoesAdd_');
    let $shoesAddName = $shoesAddForm.find('#shoesAddName');
    let $shoesAddPrice = $shoesAddForm.find('#shoesAddPrice');
    let $shoesAddFlag = $shoesAddForm.find('#shoesAddFlag');
    let $shoesAddFile = $shoesAddForm.find('#shoesAddFile');

    //女鞋编辑商品
    let $shoesEditForm = $('#shoesEdit_');
    let $shoesEditSub = $shoesEditForm.find('.shoesEdit_');
    let $shoesEditName = $shoesEditForm.find('#shoesEditName');
    let $shoesEditPrice = $shoesEditForm.find('#shoesEditPrice');
    let $shoesEditFile = $shoesEditForm.find('#shoesEditFile');

    //女鞋删除商品
    let $shoesDelForm = $('#shoesDel_');
    let $shoesDelSub = $shoesDelForm.find('.shoesDel_');

    //滚动图片的初始化增加
    $createPicInfo.on('click', function() {
        $('#pic_modal').modal('show');
    })

    $createPicSub.on('click', function(){
        if($createInfo.val().length == 0) {
            var str = '请选择需要上传的图片，否则不能更新';
            $('#createPic .errInfo').text(str);
            return false;
        }else if($createInfo.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($createInfo.val())){
            var str = '请选择图片格式文件上传';
            $('#createPic .errInfo').text(str);
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
            $('#upload .errInfo').text(str);
            return false;
        }else if($picInfo.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($picInfo.val())){
            var str = '请选择图片格式文件上传';
            $('#upload .errInfo').text(str);
            return false;
        }else {
            $uploadForm.submit();
        }
    })
    
    //女装增加商品提交
    $clothAddSub.on('click', function() {
        if($.trim($clothAddName.val()).length == 0 || $.trim($clothAddPrice.val()).length == 0 || $.trim($clothAddFlag.val()).length == 0 || $clothAddFile.val().length == 0) {
            var str = '女装商品信息不能为空';
            $('#clothAdd_ .errInfo').text(str);
            return false;
        }else if($clothAddFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($clothAddFile.val())){
            var str = '请选择图片格式文件上传';
            $('#clothAdd_ .errInfo').text(str);
            return false;
        }else {
            $clothAddForm.submit();
        }
    })

    //女装编辑商品
    $clothEditSub.on('click', function() {
        if($.trim($clothEditName.val()).length == 0 && $.trim($clothEditPrice.val()).length == 0 && $clothEditFile.val().length == 0) {
            var str = '商品编辑信息不能全部为空';
            $('#clothEdit_ .errInfo').text(str);
            return false;
        }else if($clothEditFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($clothEditFile.val())){
            var str = '请选择图片格式文件上传';
            $('#clothEdit_ .errInfo').text(str);
            return false;
        }else {
            $clothEditForm.submit();
        }
    })

    //女装删除商品
    $clothDelSub.on('click', function() {
        if($('.noClothes').text() == '没有上架的商品，无法删除商品，请增加女装上架') {
            alert('没有任何可删除的商品，请上架女装');
            return false;
        }else {
            if(confirm('确定要删除该商品吗？')) {
                $clothDelForm.submit();
            }else {
                return false;
            }
        }        
    })

    //女包增加商品提交
    $bagsAddSub.on('click', function() {
        if($.trim($bagsAddName.val()).length == 0 || $.trim($bagsAddPrice.val()).length == 0 || $.trim($bagsAddFlag.val()).length == 0 || $bagsAddFile.val().length == 0) {
            var str = '女包商品信息不能为空';
            $('#bagsAdd_ .errInfo').text(str);
            return false;
        }else if($bagsAddFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($bagsAddFile.val())){
            var str = '请选择图片格式文件上传';
            $('#bagsAdd_ .errInfo').text(str);
            return false;
        }else {
            $bagsAddForm.submit();
        }
    })

    //女包编辑商品
    $bagsEditSub.on('click', function() {
        if($.trim($bagsEditName.val()).length == 0 && $.trim($bagsEditPrice.val()).length == 0 && $bagsEditFile.val().length == 0) {
            var str = '商品编辑信息不能全部为空';
            $('#bagsEdit_ .errInfo').text(str);
            return false;
        }else if($bagsEditFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($bagsEditFile.val())){
            var str = '请选择图片格式文件上传';
            $('#bagsEdit_ .errInfo').text(str);
            return false;
        }else {
            $bagsEditForm.submit();
        }
    })

    //女包删除商品
    $bagsDelSub.on('click', function() {
        if($('.noBags').text() == '没有上架的商品，无法删除商品，请增加女包上架') {
            alert('没有任何可删除的商品，请上架女包');
            return false;
        }else {
           if(confirm('确定要删除该商品吗？')) {
                $bagsDelForm.submit();
            }else {
                return false;
            } 
        }        
    })

    //女鞋增加商品提交
    $shoesAddSub.on('click', function() {
        if($.trim($shoesAddName.val()).length == 0 || $.trim($shoesAddPrice.val()).length == 0 || $.trim($shoesAddFlag.val()).length == 0 || $shoesAddFile.val().length == 0) {
            var str = '女鞋商品信息不能为空';
            $('#shoesAdd_ .errInfo').text(str);
            return false;
        }else if($shoesAddFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($shoesAddFile.val())){
            var str = '请选择图片格式文件上传';
            $('#shoesAdd_ .errInfo').text(str);
            return false;
        }else {
            $shoesAddForm.submit();
        }
    })

    //女鞋编辑商品
    $shoesEditSub.on('click', function() {
        if($.trim($shoesEditName.val()).length == 0 && $.trim($shoesEditPrice.val()).length == 0 && $shoesEditFile.val().length == 0) {
            var str = '商品编辑信息不能全部为空';
            $('#shoesEdit_ .errInfo').text(str);
            return false;
        }else if($shoesEditFile.val() && !/\.(gif|jpg|jpeg|bmp|png|tiff|GIF|JPG|PNG|JPEG|BMP|TIFF)$/.test($shoesEditFile.val())){
            var str = '请选择图片格式文件上传';
            $('#shoesEdit_ .errInfo').text(str);
            return false;
        }else {
            $shoesEditForm.submit();
        }
    })

    //女鞋删除商品
    $shoesDelSub.on('click', function() {
        if($('.noShoes').text() == '没有上架的商品，无法删除商品，请增加女鞋上架') {
            alert('没有任何可删除的商品，请上架女鞋');
            return false;
        }else {
           if(confirm('确定要删除该商品吗？')) {
                $shoesDelForm.submit();
            }else {
                return false;
            } 
        }        
    })
})