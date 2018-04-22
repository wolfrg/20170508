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
            debugger;
            var _this = this;

            $('#exampleModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget),
                    actionType = button.data('for'),
                    modal = $(_this);

                var id=button.attr("v");

                if(actionType == 'add'){
                    $('#exampleModalLabel').text('添加员工信息');
                    _this.addTaskItem();

                }else if(actionType == 'edit'){
                    $('#exampleModalLabel').text('编辑任务');
                    _this.editTaskItem(id);
                }

            })
        },

        // 添加: 编号 用户名 职位 IP地址  备注 function
        addTaskItem: function(){
            var _this = this,
                formTpl = '';
            formTpl += '<div class="form-group">\
                            <label class="control-label">编号:</label>\
                            <input type="text" class="form-control" name="num" id="num">\
                        </div>\
                        <div>\
                            <label  class="control-label">用户名:</label>\
                            <input type="text"  class="form-control"  name="username" id="username">\
                        </div>\
                        <div>\
                            <label class="control-label">职位:</label>\
                            <input type="text"  class="form-control" name="position" id="position">\
                        </div>\
                        <div>\
                            <label class="control-label">IP地址:</label>\
                            <input type="text" class="form-control" name="ipaddr" id="ipaddr">\
                        </div>\
                        <div>\
                            <label class="control-label">备注:</label>\
                            <input type="text" class="form-control" name="remark" id="remark">\
                        </div>';

            $('#exampleModal').find('form').html(formTpl);


        },



        // click edit button show edit view
        editTaskItem:function(){

            var data = {
            'id':'1',
            'username':'fengruigang'
            };

            var _this = this;
            formTpl = '';
            formTpl += '<div class="form-group">\
                                <label class="control-label">编号:</label>\
                                <input type="text" class="form-control" name="num" id="num" value="'+data.id+'">\
                            </div>\
                            <div>\
                                <label  class="control-label">用户名:</label>\
                                <input type="text"  class="form-control"  name="username" id="username" value="'+data.username+'">\
                            </div>\
                            <div>\
                                <label class="control-label">职位:</label>\
                                <input type="text"  class="form-control" name="position" id="position">\
                            </div>\
                            <div>\
                                <label class="control-label">IP地址:</label>\
                                <input type="text" class="form-control" name="ipaddr" id="ipaddr">\
                            </div>\
                            <div>\
                                <label class="control-label">备注:</label>\
                                <input type="text" class="form-control" name="remark" id="remark">\
                            </div>';

                $('#exampleModal').find('form').html(formTpl);
 
         



        },

        commitAdd:function() {
            var _this = this;
            $('#submitbtn').on('click.add',function(e){
                 alert('commitAdd function')
                public_func.addInfo();
               
            });

        },

        commitEdit:function() {
            
            var _this = this;
            $('submitbtn1').on('click.edit',function(e){
                alert('commitEdit function')
                public_func.editInfo();
            });

        },



       
        init:function(){
            var _this = this;
            _this.menuClick();
            _this.taskActionPage();
            
            public_func.treeList();
            public_func.showInfo();
            _this.commitAdd();
            _this.commitEdit();
            // public_func.addInfo();
            
            //添加完信息后点击ok按钮，提交添加的事件
            // $('#submitbtn').on('click.add',function(e){
            //     alert('add')

            //     public_func.addInfo();
               
            // });

            //编辑完信息后点击ok按钮，提交编辑的事件
            // $('#submitbtn').on('click.edit',function(e){

            //     public_func.editInfo();

            //     alert('edit')

       
                
            // });
            
        }
    };

    monitor.init()
})