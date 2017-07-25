$(document).ready(function(){
    $('#contact').hover(function(){
        alert('hello');
        $(this).attr('class','active');
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-top')
    })
})