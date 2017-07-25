$(document).ready(function(){
    let $contact = $('#contact');
    $contact.hover(function(){
        $(this).attr('class','active').find('span').attr('class', 'glyphicon glyphicon-triangle-top');
    })
})