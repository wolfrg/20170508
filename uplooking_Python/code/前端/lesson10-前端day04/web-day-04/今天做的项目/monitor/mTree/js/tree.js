/**
 * Created by Administrator on 2018/3/25.
 */
$(function(){
    var tree = {

        getTreeNodeId:function(){
            var _this = this;

            var nodeId=public_func.defaultData.selTreeNodeId;

        },

        controlSilde: function(){
            var _this = this;

            $('.js-slide-btn').off('click').on('click', function(e){

                if($(this).hasClass('icon-chevron-left')){
                    $('.float-tree').animate({left: '-230px'},900);
                    $(this).removeClass('icon-chevron-left').addClass('icon-chevron-right');
                }else{
                    $('.float-tree').animate({left: '0px'},900);
                    $(this).removeClass('icon-chevron-right').addClass('icon-chevron-left');
                }
            })
        },

        init: function(){
            var _this =this;

            _this.getTreeNodeId();
            _this.controlSilde();

            public_func.treeList();

        }
    };

    tree.init();


})
