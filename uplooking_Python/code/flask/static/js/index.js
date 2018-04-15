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


        // 点击添加按钮，添加任务
        taskActionPage: function(){
            var _this = this;

            $('#exampleModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget),
                    actionType = button.data('for'),
                    modal = $(_this);

                if(actionType == 'add'){
                    $('#exampleModalLabel').text('添加员工信息');
                    _this.addTaskItem();

                }else if(actionType == 'edit'){
                    $('#exampleModalLabel').text('编辑任务');
                    _this.editTaskItem();
                }

            })
        },

        // 添加 编号 用户名 职位 IP地址  备注 function
        addTaskItem: function(){
            var _this = this,
                formTpl = '';
            formTpl += '<div>\
                            <label>编号:</label>\
                            <input type="text" name="num" id="num">\
                        </div>\
                        <div>\
                            <label>用户名:</label>\
                            <input type="text" name="username" id="username">\
                        </div>\
                        <div>\
                            <label>职位:</label>\
                            <input type="text" name="position" id="positon">\
                        </div>\
                        <div>\
                            <label>IP地址:</label>\
                            <input type="text" name="ipaddr" id="ipaddr">\
                        </div>\
                        <div>\
                            <label for="remark">备注:</label>\
                            <input type="text" name="remark" id="remark">\
                        </div>';

            $('#exampleModal').find('form').html(formTpl);


        },


       
        init:function(){
            var _this = this;
            _this.menuClick();
            _this.taskActionPage();
            public_func.treeList();
            public_func.showInfo();
            public_func.addInfo();
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