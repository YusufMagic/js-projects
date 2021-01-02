$('a').on('click', function(){
    let target = $(this).data('target');
    let pos = $(target).offset().top;
    $('html, body').animate({'scrollTop': pos - 100}, 400);
});