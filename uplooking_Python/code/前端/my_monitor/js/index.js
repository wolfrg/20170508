/*
    $(function(){}) 等价 


*/


$(function(){

        var monitor = {
            menuClick:function() {
                var _this = this;
                $('.main-menu').off('click').on('click','li',function(e){
                    var thisBtn = $(this);
                    thisBtn.parent().find('li').removeClass('active');
                    thisBtn.addClass('active');
                })
            },

            init:function(){
                var _this = this;
                _this.menuClick();

            }
        };
        monitor.init()
})