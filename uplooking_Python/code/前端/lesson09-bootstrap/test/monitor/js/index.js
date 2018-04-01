function click(){
    $('.main-menu').off('click').on('click','li',function(e){
        var thisBtn = $(this);
        thisBtn.parent().find('li').removeClass('active');
        thisBtn.addClass('active');


    })
}

click()
