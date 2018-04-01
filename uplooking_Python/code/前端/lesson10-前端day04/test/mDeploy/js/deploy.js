$(function(){

    var deploy = {
// 任务列表
        taskDataGet: function () {
        var _this = this;

        // $.get('url', {}, function (response) {
        $.getJSON('../../data/task.json', function(json){
            if(json.code == 1){
                var taskData = json.data.tasks;

                _this.taskTableTpl(taskData)
            }


            });
    },

        taskTableTpl:function(data) {

            var _this = this,
                str = '';

            str += '<thead><tr><th><input type="checkbox"></th><th><button class="btn btn-sm btn-warning">批量发起</button></th><th>任务列表</th><th>服务组</th><th>工作组</th><th>环境</th><th>任务状态</th></tr></thead><tbody>';  
            
            $.each(data,function(index,value){
                str += '<tr><td><input type="checkbox"></td>\
                                <td><button class="btn btm-sm btn-warning js-lanuch-task mt-curosr" data-name="' + value.name +'">发起 </button></td>\
                                <td>'+ value.name +' </td>\
                                <td>'+ value.serverGroup +' </td>\
                                <td>'+ value.jobGroup +' </td>\
                                <td>'+ value.envrioment +' </td>\
                                <td>'+ value.restart +'</td></tr>';
                
                
            });

            str += '</tbody>';
            $('#bodyList').html(str);
            _this.lanuchTask();
       
        },
        

        init:function() {
            var _this = this;

            _this.taskDataGet();
            // _this.addTaskItem();
           


        }

    };


     deploy.init()
     


})