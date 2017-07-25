$(document).ready(function(){
    let $contact = $('.dropdown');
    $contact.hover(function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-top');
        $(this).find('.dropdown-menu').css('display','block');
    },function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-bottom');
    })

    $contact.on('click',function(){
        $(this).find('.dropdown-menu').css('display', 'none');
    })
})