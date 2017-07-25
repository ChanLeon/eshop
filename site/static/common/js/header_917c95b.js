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
        $('.content').find('ul.nav input#search').remove();
        $('.content').find('ul.nav').append('<li class=""><input name="search" type="text" id="search" placeholder="查询"></li>');
    },function(){
        $('.content').find('ul.nav input#search').remove();
    })
})