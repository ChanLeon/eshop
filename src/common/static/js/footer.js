$(document).ready(function() {
    $('.topReturn').on('click', function() {
        $(document.body).animate({scrollTop: 0}, 1000);
        return false;
    })
})