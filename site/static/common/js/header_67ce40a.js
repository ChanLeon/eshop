$(document).ready(function(){
    let $contact = $('#contact');
    $contact.hover(function(){
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-top');
    })
})