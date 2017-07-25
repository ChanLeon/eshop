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
        $(this).find('a input#search').remove();
        $(this).find('a').append('<span class="searchInput"><input name="search" type="text" id="search" placeholder="查询"></span>');

    },function(){
        $('.content').find('ul.nav input#search').remove();
    })
})