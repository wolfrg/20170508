$(function () {

    var monitor = {
        //$.ajax的方式
        showInfo: function () {
            $.ajax({
                type: "GET",
                url: '/getUserInfo',
                data: 'json',
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
                                                <button class="btn btn-xs btn-info" data-for="edit" data-target="#exampleModal" id="myedit"  data-toggle="modal">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="myDelete"  data-toggle="modal">删除</button>\
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
            var _this = this,
                data = {};
            $.get('/getUserInfo', function (data) {

                console.log(data)
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
                                                <button class="btn btn-xs btn-info" data-for="edit" data-target="#exampleModal" id="myedit"  data-toggle="modal">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="myDelete"  data-toggle="modal">删除</button>\
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
                    // var data = response.data;
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
                                                <button class="btn btn-xs btn-info" data-for="edit" data-target="#exampleModal" id="myedit"  data-toggle="modal">编辑</button>\
                                                <button class="btn btn-xs btn-danger" data-for="delete" data-target="#exampleModal" id="myDelete"  data-toggle="modal">删除</button>\
                                            </td>\
                                      </tr>';
            })
            str += '</tbody>';

            $('#bodyList').html(str)

        },

        init: function () {
            var _this = this;
            _this.getTableData2();

        }
    };
    monitor.init();
});