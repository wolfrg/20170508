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
            var _this = this;
            _this.menuClick();
            public_func.treeList();
        }
    };

    $(".dbtn").click(function(){
		$.get("/delete",function(data, status){
			alert("数据: " + data + "\n状态: " + status);
		});
    });
    
    $(".addBtn").click(function(){
        $.get("insert",function(data,status){
            alert("数据：" + data + "\n状态：" + status);
        });
    });

    $("button").click(function(){
        $.ajax({url:"/ajax.html",success:function(result){
            $("#div1").html(result);
        }});
    });

    monitor.init()
})