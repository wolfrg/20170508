/**
 * 公共js
 */

$(function(){

    var public_func = {



        subMenuClick:function(){
            var _this = this;
            $('sub-menu').off('click').on('click','li',function(){
                var thisBtn = $(this);
                thisBtn.parent().find('li').removeClass('active');
                thisBtn.addClass();


            });
        },

    },
});