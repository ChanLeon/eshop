$(document).ready(function(){
    let $regForm = $('#reg');
    let $regSub = $regForm.find('.register');

	$('.cancel').on('click', function() {
        window.location.href = '/home/index';
    })

    $regSub.on('click', function(){
        let confirmTrue = $regForm.validator({
            
        })
    })
    

})