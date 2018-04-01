/**
 * Created by Administrator on 2018/3/25.
 */
$(function(){
    var deploy = {

        // 任务列表
        taskDataGet: function () {
            var _this = this;

            // $.get('url', {}, function (response) {
            $.getJSON('../../data/task.json', function(response){
                if(response.code == 1){
                    var taskData = response.data.tasks;

                    _this.taskTableTpl(taskData)
                }


            })
        },

        taskTableTpl: function(data){
            var _this = this,
                str = '';
            str += '<thead><tr><th><input type="checkbox"></th><th><button class="btn btn-sm btn-warning">批量发起</button></th><th>任务列表</th><th>服务组</th><th>工作组</th><th>环境</th><th>任务状态</th></tr></thead><tbody>';

            $.each(data, function(index, value){
                str += '<tr><td><input type="checkbox"></td>\
								<td><button class="btn btn-sm btn-warning js-lanuch-task mt-curosr" data-name="' + value.name + '">发起</button></td>\
								<td class="js-edit-btn mt-curosr"  data-for="edit" data-toggle="modal" data-target="#exampleModal">' + value.name + '</td>\
								<td>' + value.serverGroup + '</td>\
								<td>' + value.jobGroup + '</td>\
						        <td>' + value.enviroment + '</td>\
								<td>' + value.restart + '</td></tr>';

            });

            str += '</tbody>';

            $('#bodyList').html(str);

            _this.lanuchTask();
        },


        addTaskItem:function(){
            var _this = this,
                formHtml = '';

            $('.js-add-task').off('click.task').on('click.task', function(e){
                $('#exampleModalLabel').text('添加任务')
            });

            formHtml += '<div class="form-group">\
                            <label for="add-enviroment">部署环境:</label>\
                            <input class="form-control" type="text" name="add-enviroment" id="add-enviroment"/>\
                         </div>\
                         <div class="form-group">\
                            <label for="add-address">代码地址:</label>\
                            <input class="form-control" type="text" name="add-address" id="add-address"/>\
                         </div>\
                         <div class="form-group">\
                            <label for="add-account">部署账号:</label>\
                            <input class="form-control" type="text" name="add-account" id="add-account"/>\
                         </div>\
                         <div class="form-group">\
                            <label for="add-path">部署路径:</label>\
                            <input class="form-control" type="text" name="add-path" id="add-path"/>\
                         </div>';

            $('#exampleModal').find('form').html(formHtml);


            // 这种方式也可以
            //$('#exampleModal').on('show.bs.modal', function (event) {
            //
            //})


        },
        lanuchTask: function(){
          var _this = this;
            $('.js-lanuch-task').off('click').on('click', function(e){
                $('.deploy-task-page').removeClass('hide');
                $('.task-list-page').addClass('hide');
            })

            $('#showMachine').off('click').on('click', function(e){

                var str = '';

                str += '<select multiple="multiple" size="10" name="doublebox" class="machineBox"></select>';

                $('#exampleModal').find('form').html(str);

                $('.machineBox').doublebox({
                    nonSelectedListLabel: '产品线下的机器列表',
                    selectedListLabel: '已选择的机器列表',
                    preserveSelectionOnMove: 'moved',
                    moveOnSelect: false,
                    nonSelectedList:[{"roleId":"1","roleName":"设备1"},{"roleId":"2","roleName":"设备2"},{"roleId":"3","roleName":"设备3"},{"roleId":"4","roleName":"设备4"}],
                    selectedList:[{"roleId":"4","roleName":"设备4"},{"roleId":"5","roleName":"设备2"}],
                    optionValue:"roleId",
                    optionText:"roleName",
                    doubleMove:true,
                    
                });
            })
        },


        init: function(){
            var _this = this;

            _this.taskDataGet();
            _this.addTaskItem();
        }
    }
    deploy.init();
})
