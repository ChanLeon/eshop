$(document).ready(function(){

    let imgs0 = $('.banner .scrollPic img:nth-child(1)').attr('src');
    let imgs1 = $('.banner .scrollPic img:nth-child(2)').attr('src');
    let imgs2 = $('.banner .scrollPic img:nth-child(3)').attr('src');
    let imgs3 = $('.banner .scrollPic img:nth-child(4)').attr('src');
    console.log('img0',imgs0);
    console.log('img3',imgs3);
    $('.banner .b-img').find('.scroll0').css('background','url("' + imgs0 +'") center no-repeat');
    $('.banner .b-img').find('.scroll1').css('background','url("' + imgs1 +'") center no-repeat');
    $('.banner .b-img').find('.scroll2').css('background','url("' + imgs2 +'") center no-repeat');
    $('.banner .b-img').find('.scroll3').css('background','url("' + imgs3 +'") center no-repeat');

    $('div.container .opa>div').hover(function(){
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