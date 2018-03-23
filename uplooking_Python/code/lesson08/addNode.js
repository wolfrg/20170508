/**
 * Created by Administrator on 2018/3/11.
 */
$(function(){
    var addNode = {
        def:{
          num:10
        },
        addFirstNode: function(){

        },
        removeFirstNode: function(index, value){
            this._jsonPase();
        },
        _jsonPase: function(){

        },

        init: function(){
            var _this = this;

            _this.addFirstNode();
            _this.removeFirstNode(4,6)
        }
    };

    addNode.init();
})
