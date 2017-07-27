$(document).ready(function(){
    $('div.container .opa div.col-xs-4').hover(function(){
        $(this).css('position','relative');
        $(this).find('.opaModel').slideDown(300);
    },function(){
        $(this).find('.opaModel').slideUp(300,function(){
            $(this).css('display','none');
        });
        
    })

    $('div.container .opa div.buy').on('click', function(){
        window.open('https://shop506028910.taobao.com/?spm=a230r.7195193.1997079397.56.XdptFD');
    })
})