$(document).ready(function(){
    let $contact = $('#contact');
    $contact.hover(function(){
        $(this).attr('class','active');
        $(this).find('span').attr('class', '')
    })
})