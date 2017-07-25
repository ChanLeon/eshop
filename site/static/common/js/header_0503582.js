$(document).ready(function(){
    let $contact = $('.dropdown');
    $contact.hover(function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-top').find('.dropdown-menu').css('display','block');
    },function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-bottom');
    })

    $contac.on('click',function(){
        
    })
})