// 展示内网服务器的信息列表

 // $.get方法，表格模板写在function内部
 $(function(){

    var n_host = {

        getTableData: function () {
            var _this = this;
                // data = {};
            $.get('/get_nHostInfo', function (data) {
        
                // console.log('getTableData',data)
                if (data) {
                    var str = '';
                    str += '<thead><tr><th><input type="checkbox"></th><th>服务器SN编号</th><th>服务器型号</th><th>服务器配置</th><th>外网地址</th><th>内网地址</th><th>机房位置</th><th>操作</th></tr></thead><tbody>';
                    $.each(data, function (index, valued) {
        
                        var sn = valued.sn_number;
                        var xh = valued.host_modal;
                        var peizhi = valued.peizhi;
                        var wanip = valued.wan_ip;
                        var lanip = valued.lan_ip;
                        var h_location = valued.host_location;
        
                        str += '<tr class="js-items-data" data-id="' + sn + '" data-username="' + xh + '" data-position="' + peizhi + '" data-addr="' + wanip + '">\
                                            <td><input type="checkbox"></td>\
                                            <td>'+ sn + ' </td>\
                                            <td>'+ xh + ' </td>\
                                            <td>'+ peizhi + ' </td>\
                                            <td>'+ wanip + ' </td>\
                                            <td>'+ lanip + ' </td>\
                                            <td>'+ h_location + ' </td>\
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
                            <label class="control-label">SN编号:</label>\
                            <input type="text" class="form-control" name="sn_number" id="sn_number">\
                        </div>\
                        <div>\
                            <label  class="control-label">型号:</label>\
                            <input type="text"  class="form-control"  name="host_modal" id="host_modal">\
                        </div>\
                        <div>\
                            <label class="control-label">配置:</label>\
                            <input type="text"  class="form-control" name="peizhi" id="peizhi">\
                        </div>\
                        <div>\
                            <label class="control-label">外网地址:</label>\
                            <input type="text" class="form-control" name="wan_ip" id="wan_ip">\
                        </div>\
                        <div>\
                            <label class="control-label">内网地址:</label>\
                            <input type="text" class="form-control" name="lan_ip" id="lan_ip">\
                        </div>\
                        <div>\
                            <label class="control-label">机房位置:</label>\
                            <input type="text" class="form-control" name="host_location" id="host_location">\
                        </div>';
                        
                                
                        

            $('#exampleModal').find('form').html(addTpl); //展示add的模态框

            var submitbtn = modal.find('#submitbtn');
            submitbtn.off('click').on('click',function(e){
                var params = {};

                params.sn_number = $('#sn_number').val();
                params.host_modal = $('#host_modal').val().trim();
                params.peizhi = $('#peizhi').val().trim();
                params.wan_ip = $('#wan_ip').val().trim();
                params.lan_ip = $('#lan_ip').val().trim();
                params.host_location = $('#host_location').val().trim();

                $.post('/addHostInfo',params,function(res){
                    location.reload();
                    modal.modal('hide');
                })
            })



        },
        
        init:function(){
            var _this = this;
            _this.getTableData();
            _this.modalShowJudge();
        }
    };

    n_host.init();

 })
 