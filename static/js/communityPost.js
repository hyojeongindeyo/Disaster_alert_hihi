
function popOpen() {
    let modalPop = $('.modal_wrap');
    let modalBg = $('.modal_bg');

    $(modalPop).show();
    $(modalBg).show();
}

function popClose() {
    let modalPop = $('.modal_wrap');
    let modalBg = $('.modal_bg');

    $(modalPop).hide();
    $(modalBg).hide();
}

$('html').css({
    overflow: 'hidden',
    height: 'auto'
});

$('html').removeAttr('style');