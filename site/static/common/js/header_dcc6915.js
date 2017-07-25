$(document).ready(function(){
    let $contact = $('#contact');
    $contact.hover(function(){
        $(this).find('a').attr('data-toggle','dropdown').find('span').attr('class', 'glyphicon glyphicon-triangle-top');
    },function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-bottom');
    })
})