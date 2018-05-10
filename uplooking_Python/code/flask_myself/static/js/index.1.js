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

        //index html right table
    showInfo:function() {
            $.ajax({
                type: "GET",
                url: '/getUserInfo',
                data: 'json',
                success: function (json) {
                        var str = '';
                        str += '<thead><tr><th><input type="checkbox"></th><th>编号</th><th>用户名</th><th>职位</th><th>IP地址</th><th>备注</th><th>操作</th></tr></thead><tbody>';
                        json = JSON.parse(json);
                        $.each(json, function (index, valued) {

                            var userid = valued.id
                            var username = valued.username

                                str += '<tr class="js-items-data" data-id="'+userid+'" data-username="'+valued.username+'" data-position="'+valued.position+'" data-addr="'+valued.ipaddr+'">\
                                            <td><input type="checkbox"></td>\
                                            <td>'+ userid + ' </td>\
                                            <td>'+ username + ' </td>\
                                            <td>'+ valued.position + ' </td>\
                                            <td>'+ valued.ipaddr + ' </td>\
                                            <td class="js-items-remark">'+ valued.remark + ' </td>\
                                            <td>\
                                                <button class="btn btn-xs btn-info" data-for="edit" data-target="#exampleModal" id="myedit"  data-toggle="modal">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="myDelete"  data-toggle="modal">删除</button>\
                                            </td>\
                                      </tr>';
                        })
                        str += '</tbody>';
                    
                        $('#tbody').html(str)

                },

        }


        );
    },

       

        // modal Show Judge
    taskActionPage: function(){

            var _this = this;

            $('#exampleModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget),
                    actionType = button.data('for'),
                    modal = $(_this);

                // var id=button.attr("v");

                if(actionType == 'add'){
                    $('#exampleModalLabel').text('添加员工信息');
                    _this.addTaskItem();
					_this.commitAdd(); //***** 在这里判断是添加的话，就调添加的提交请求

                }else if(actionType == 'edit'){
                    $('#exampleModalLabel').text('编辑任务');
                    _this.editTaskItem(button); // ***** 把button传进去，不然那不知道是哪一条数据上点击的编辑按钮
					_this.commitEdit(); //***** 在这里判断是编辑的话，就调编辑的提交请求
                }else if(actionType == 'delete'){
                    _this.deleteFun(modal,button);
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

         //提交添加的用户信息
    addInfo:function () {

        // get input value
        var id = $('#num').val();
        var username = $('#username').val();
        var position = $('#position').val();
        var ipaddr = $('#ipaddr').val();
        var remark = $('#remark').val();

        var  data = {};
        data.id = id;
        data.username = username;
        data.position = position;
        data.ipaddr = ipaddr;
        data.remark = remark;


        $.ajax({
            
            type:'POST',
            url:'/addUserInfo',
            data:data,
            success:function(response) {
                // console.log(data);
                if(response == 1) {
                    location.reload();
                    // alert('插入成功！');
                    // $('#exampleModal').modal('hide');
                    $('#exampleModal').hide();
                }
                
                
            },

            dataType:"json"

            
        });

    },



        // click edit button show edit view
        editTaskItem:function(button){

            // var data = {
            // 'id':'1',
            // 'username':'fengruigang'
            // };

            //***** 根据button找到父级上存的data-id, data-username, data-ipaddr, data-position的数据
			var thisParent = $(button).parents('.js-items-data');
			var thisId = thisParent.data('id');
			var thisUername = thisParent.data('username');
			var thisPos = thisParent.data('position');
			var thisIp = thisParent.data('addr');

			//***** 以上是一种方式，存在父tr元素中，用以上的方式得到
			//***** 但是我们发现父元素tr中我没存remark的data-remark数据，这是我们的另外一种实现的方式
			//***** 现在我写一下remark的数据怎么获取，我们给remark这项一个class，我们已经得到了这一项的button，根据这个button找该class就行，即先找button的父，在由父向下找到这个remark的class
			//***** 然后得到remark中的值就好了
			var thisRemark = thisParent.find('.js-items-remark').text();

			// 然后将这些值放入下面的html的对应val中

            var _this = this,
            formTpl = '';
            formTpl += '<div class="form-group">\
                                <label class="control-label">编号:</label>\
                                <input type="text" class="form-control" name="num" id="num" value="'+thisId+'">\
                            </div>\
                            <div>\
                                <label  class="control-label">用户名:</label>\
                                <input type="text"  class="form-control"  name="username" id="username" value="'+thisUername+'">\
                            </div>\
                            <div>\
                                <label class="control-label">职位:</label>\
                                <input type="text"  class="form-control" name="position" id="position" value="'+thisPos+'">\
                            </div>\
                            <div>\
                                <label class="control-label">IP地址:</label>\
                                <input type="text" class="form-control" name="ipaddr" id="ipaddr" value="'+thisIp+'">\
                            </div>\
                            <div>\
                                <label class="control-label">备注:</label>\
                                <input type="text" class="form-control" name="remark" id="remark" value="'+thisRemark+'">\
                            </div>';

                $('#exampleModal').find('form').html(formTpl);
 
         



        },

    

    deleteFun:function(modal,button){

            modal.find('#exampleModalLabel').text('delete userInfo');
            $('#exampleModal').find('form').html('确定删除吗?');
            var infos = button[0].attributes
            var submitbtn = modal.find('#submitbtn');
            // alert(infos)
            submitbtn.on('click',function(e){
                var thisParent = $(button).parents('.js-items-data');
                var thisId = thisParent.data('id');
                var params = {};
                params.id = thisId;
                alert(params.id)

                $.post('/delete',params,function(res){
                    location.reload();
                    if(res.code == 1) {
                        location.reload();
                    }
                    modal.modal('hide');

                });
            })



        },

        commitAdd:function() {
            var _this = this;
            $('#submitbtn').on('click.add',function(e){
                 // alert('commitAdd function')
                _this.addInfo();
               
            });

        },

        // commitEdit:function() {
            
        //     var _this = this;
        //     $('#submitbtn').on('click.edit',function(e){
        //         // alert('commitEdit function')
        //         _this.editInfo();
        //     });

        // },



       
        init:function(){
            var _this = this;
            _this.menuClick();
            _this.taskActionPage();
            
            // public_func.treeList();
            _this.showInfo();
            
        }
    };

    monitor.init()
})



