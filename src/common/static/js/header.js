$(document).ready(function(){
    let $contact = $('#contact');
    let $search = $('.search');
    let $logOut = $('#logout');
    let $brand = $('#brand_url');
    $contact.hover(function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-top');
        $(this).find('.dropdown-menu').css('display','block');
    },function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-bottom');
        $(this).find('.dropdown-menu').css('display','none');
    })

    $brand.on('click', function(){
        window.open('https://shop506028910.taobao.com/?spm=a230r.7195193.1997079397.56.XdptFD');
    })

    $contact.on('click',function(){
        $(this).find('.dropdown-menu').css('display', 'none');
    })

    $logOut.hover(function(){
        $(this).find('.dropdown-menu').css('display','block');
    },function(){
        $(this).find('.dropdown-menu').css('display','none');
    })

})