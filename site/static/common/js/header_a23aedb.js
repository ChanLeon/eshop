$(document).ready(function(){
    let $contact = $('.dropdown');
    let $search = $('.search');
    $contact.hover(function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-top');
        $(this).find('.dropdown-menu').css('display','block');
    },function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-bottom');
        $(this).find('.dropdown-menu').css('display','none');
    })

    $contact.on('click',function(){
        $(this).find('.dropdown-menu').css('display', 'none');
    })

    $search.hover(function(){
        $('.content ul.nav').find('a input#search').remove();
        $('.content ul.nav').find('a').append('<input name="search" type="text" id="search" placeholder="查询">');

    },function(){
        $('.content ul.nav').find('a input#search').remove();
    })
})