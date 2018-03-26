/**
 * 公共js
 */

 var public_func = {

        defaultData:{
            subMenu:1,
            selTreeNodeId:-1
        },

        subMenuClick:function(){
            var _this = this;

            $('.sub-menu').off('click').on('click','li',function(e){
                var thisBtn = $(this);
                thisBtn.parent().find('li').removeClass('active');
                thisBtn.addClass('active');
                
                _this.defaultData.subMenu = $(this).data('id');


            })
        }

    };