// 展示内网服务器的信息列表

 // $.get方法，表格模板写在function内部
 $(function(){

    var n_host = {

        getTableData: function () {
            var _this = this;
                // data = {};
            $.get('/get_wHostInfo', function (data) {
        
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
        
                        str += '<tr class="js-items-data" data-id="' + sn + '" data-username="' + xh + '" data-position="' + peizhi + '" data-addr="' + wanip + '" data-addr="' + lanip + '" data-addr="' + h_location + '">\
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
        
        init:function(){
            var _this = this;
            _this.getTableData();
        }
    };

    n_host.init();

 })
 