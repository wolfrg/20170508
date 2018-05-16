$(function () {

    var monitor = {
        //$.ajax的方式
        showInfo: function () {
            $.ajax({
                type: "GET",
                url: '/getUserInfo',
                // data: 'json',
                success: function (json) {
                    var str = '';
                    str += '<thead><tr><th><input type="checkbox"></th><th>编号</th><th>用户名</th><th>职位</th><th>IP地址</th><th>备注</th><th>操作</th></tr></thead><tbody>';
                    // json = JSON.parse(json);
                    $.each(json, function (index, valued) {

                        var userid = valued.id;
                        var username = valued.username;
                        var position = valued.position;
                        var ipaddr = valued.position;
                        var remark = valued.remark

                        str += '<tr class="js-items-data" data-id="' + userid + '" data-username="' + valued.username + '" data-position="' + valued.position + '" data-addr="' + valued.ipaddr + '">\
                                            <td><input type="checkbox"></td>\
                                            <td>'+ userid + ' </td>\
                                            <td>'+ username + ' </td>\
                                            <td>'+ position + ' </td>\
                                            <td>'+ ipaddr + ' </td>\
                                            <td class="js-items-remark">'+ remark + ' </td>\
                                            <td>\
                                                <button class="btn btn-xs btn-info" data-for="modify" data-target="#exampleModal" id="modify"  data-toggle="modal" userid="'+ userid +'"  username=" '+ username +'" position="'+ position +'" ipaddr="'+ ipaddr+'" remark="'+ remark +'">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="delete"  data-toggle="modal">删除</button>\
                                            </td>\
                                      </tr>';
                    })
                    str += '</tbody>';

                    $('#bodyList').html(str)

                },
                dataType:'json'

            }


            );
        },
        // end showInfo function

        // $.get方法，表格模板写在function内部
        getTableData: function () {
            var _this = this;
                // data = {};
            $.get('/getUserInfo', function (data) {

                console.log('getTableData',data)
                if (data) {
                    var str = '';
                    str += '<thead><tr><th><input type="checkbox"></th><th>编号</th><th>用户名</th><th>职位</th><th>IP地址</th><th>备注</th><th>操作</th></tr></thead><tbody>';
                    $.each(data, function (index, valued) {

                        var userid = valued.id;
                        var username = valued.username;
                        var position = valued.position;
                        var ipaddr = valued.position;
                        var remark = valued.remark

                        str += '<tr class="js-items-data" data-id="' + userid + '" data-username="' + valued.username + '" data-position="' + valued.position + '" data-addr="' + valued.ipaddr + '">\
                                            <td><input type="checkbox"></td>\
                                            <td>'+ userid + ' </td>\
                                            <td>'+ username + ' </td>\
                                            <td>'+ position + ' </td>\
                                            <td>'+ ipaddr + ' </td>\
                                            <td class="js-items-remark">'+ remark + ' </td>\
                                            <td>\
                                                <button class="btn btn-xs btn-info" data-for="edit" data-target="#exampleModal" id="modify"  data-toggle="modal">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="delete"  data-toggle="modal">删除</button>\
                                            </td>\
                                      </tr>';
                    })
                    str += '</tbody>';

                    $('#bodyList').html(str)

                }
            }, 'json')

        },
        //$.get方法，调用表格魔板
        getTableData2: function () {
            var _this = this;
            var data = {};

            $.get('/getUserInfo', function (response,status) {
                console.log(status);
                if(status == 'success') {

                    console.log(response[0]);
                    _this.tableTpl(response);

                }
            }, 'json')
        },

        //显示数据的模板表格

        tableTpl: function (data) {
            var _this = this;
            //console.log(data);
            var str = '';
            str += '<thead><tr><th><input type="checkbox"></th><th>编号</th><th>用户名</th><th>职位</th><th>IP地址</th><th>备注</th><th>操作</th></tr></thead><tbody>';
            // data = JSON.parse(data);
            $.each(data, function (index, valued) {
                var userid = valued.id;
                var username = valued.username;
                var position = valued.position;
                var ipaddr = valued.ipaddr;
                var remark = valued.remark

                str += '<tr class="js-items-data" data-id="' + userid + '" data-username="' + valued.username + '" data-position="' + valued.position + '" data-addr="' + valued.ipaddr + '">\
                                            <td><input type="checkbox"></td>\
                                            <td>'+ userid + ' </td>\
                                            <td>'+ username + ' </td>\
                                            <td>'+ position + ' </td>\
                                            <td>'+ ipaddr + ' </td>\
                                            <td class="js-items-remark">'+ remark + ' </td>\
                                            <td>\
                                                <button class="btn btn-xs btn-info" data-for="modify" data-target="#exampleModal"   data-toggle="modal" userid="'+ userid +'"  username=" '+ username +'" position="'+ position +'" ipaddr="'+ ipaddr+'" remark="'+ remark +'">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="delete"  data-toggle="modal" userid="' + userid+ '">删除</button>\
                                            </td>\
                                      </tr>';
            })
            str += '</tbody>';

            $('#bodyList').html(str)

        },

        //模态框展示判断
        modalShowJudge:function() {
            var _this = this;

            $('#exampleModal').on('show.bs.modal',function(event){
                var button = $(event.relatedTarget),
                    modal = $(this),
                    actionType = button.data('for');
                if(actionType == 'add') {
                    _this.addFun(modal);
                }else if(actionType == 'delete'){
                    _this.deleteUserInfo(modal,button);
                }else if(actionType == 'modify'){
                    // console.log('modify');
                    _this.modifyFun(modal,button);
                }

            })

        },

        //添加信息的函数
        addFun:function(modal){

            addTpl = '';
            addTpl += '<div class="form-group">\
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

            $('#exampleModal').find('form').html(addTpl); //展示add的模态框

            var submitbtn = modal.find('#submitbtn');
            submitbtn.off('click').on('click',function(e){
                var params = {};

                params.id = $('#num').val();
                params.username = $('#username').val().trim();
                params.position = $('#position').val();
                params.ipaddr = $('#ipaddr').val();
                params.remark = $('#remark').val();

                $.post('/addUserInfo',params,function(res){
                    location.reload();
                    modal.modal('hide');
                })
            })



        },

        // 搜索
        searchFun:function(){
            var _this = this;

            //第一步，根据搜索关键字先去请求
                //1.获取关键字，定义一个点击事件
                //2.点击搜索按钮，请求接口

            //第二步，把请求到的结果展示出来
            // console.log('searchFun')

            

            $('#search_btn').on('click',function(e){
               
                var params = {};
                params.username = $('#search_input').val().trim()
                
                
                // console.log(params.username)
                $.get('/search',params,function(response){
                    
                    
                    // console.log(response)
                    var str = '';
                    str += '<thead><tr><th><input type="checkbox"></th><th>编号</th><th>用户名</th><th>职位</th><th>IP地址</th><th>备注</th><th>操作</th></tr></thead><tbody>';
                    // data = JSON.parse(data);
                    $.each(response, function (index, valued) {
                        var userid = valued.id;
                        var username = valued.username;
                        var position = valued.position;
                        var ipaddr = valued.ipaddr;
                        var remark = valued.remark

                    str += '<tr class="js-items-data" data-id="' + userid + '" data-username="' + valued.username + '" data-position="' + valued.position + '" data-addr="' + valued.ipaddr + '">\
                                            <td><input type="checkbox"></td>\
                                            <td>'+ userid + ' </td>\
                                            <td>'+ username + ' </td>\
                                            <td>'+ position + ' </td>\
                                            <td>'+ ipaddr + ' </td>\
                                            <td class="js-items-remark">'+ remark + ' </td>\
                                            <td>\
                                                <button class="btn btn-xs btn-info" data-for="modify" data-target="#exampleModal"   data-toggle="modal" userid="'+ userid +'"  username=" '+ username +'" position="'+ position +'" ipaddr="'+ ipaddr+'" remark="'+ remark +'">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="delete"  data-toggle="modal" userid="' + userid+ '">删除</button>\
                                            </td>\
                                      </tr>';
                    })
                    str += '</tbody>';
                    
                    $('#bodyList').html(str)
                

                },'json')
            })
            
        

        },
        
        modifyFun:function(modal,button){
            var _this = this;

            modal.find('#exampleModalLabel').text('修改信息');
                var addTpl = '';
                var infos = button[0].attributes;

                addTpl += '<div class="form-group">\
                            <label class="control-label">编号:</label>\
                            <input type="text" class="form-control" name="num" id="num" readOnly="true">\
                        </div>\
                        <div>\
                            <label  class="control-label">用户名:</label>\
                            <input type="text"  class="form-control"  name="username" id="username" value="'+ infos.username.nodeValue +'">\
                        </div>\
                        <div>\
                            <label class="control-label">职位:</label>\
                            <input type="text"  class="form-control" name="position" id="position" value="'+ infos.position.nodeValue +'">\
                        </div>\
                        <div>\
                            <label class="control-label">IP地址:</label>\
                            <input type="text" class="form-control" name="ipaddr" id="ipaddr" value="'+ infos.ipaddr.nodeValue +'">\
                        </div>\
                        <div>\
                            <label class="control-label">备注:</label>\
                            <input type="text" class="form-control" name="remark" id="remark" value="'+ infos.remark.nodeValue +'">\
                        </div>';

            $('#exampleModal').find('form').html(addTpl);
            
            var submitbtn = modal.find('#submitbtn');

            submitbtn.off('click').on('click',function(e){
                var params = {};
                params.id = infos.userid.nodeValue;
                params.username = $('#username').val().trim();
                params.position = $('#position').val().trim();
                params.ipaddr = $('#ipaddr').val().trim();
                params.remark = $('#remark').val().trim();


                $.post('/edit_update',params,function(res){
                    location.reload();
                    modal.modal('hide');
                })
            })

        },

        deleteUserInfo:function(modal,button){
            modal.find('#exampleModalLabel').text('删除主机');
            $('#exampleModal').find('form').html('确定要删除吗？');
            var infos = button[0].attributes
            console.log(infos)
            var submitbtn = modal.find('#submitbtn');

            submitbtn.off('click').on('click',function(e){
                var params = {};
                params.id = infos.userid.nodeValue;
                typeof(params.id)
                $.post('/delete',params,function(res){
                    location.reload();
                    modal.modal('hide');
                })
            })

        },

        init: function () {
            var _this = this;
            _this.getTableData2(); //调用显示表格数据的函数
            _this.modalShowJudge();
            _this.searchFun();

        }
    };
    monitor.init();
});