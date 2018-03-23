$(function(){
    var monitor = {

        menuClick:function() {
            // var _this = this;

            $('.main-menu').off('click').on('click','li',function(e){
                var thisBtn = $(this);
                thisBtn.parent().find('li').removeClass('active');
                thisBtn.addClass('active');
            })

        },

       
        init:function(){
            // var _this = this;
            this.menuClick();
        }
    };

    $(".dbtn").click(function(){
		$.get("/delete",function(data, status){
			alert("数据: " + data + "\n状态: " + status);
		});
	});

    monitor.init()
})