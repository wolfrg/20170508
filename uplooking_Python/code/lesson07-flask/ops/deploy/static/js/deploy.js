/**
 * Created by dell on 2018/3/22.
 */
$(function () {
	var deploy = {
		saveData: {
			pageNum:1,
			submenuId: 0
		},

		// 分页
		pageSel: function () {
			var _this = this;

			$('.pagination').off('click').on('click', 'a', function (event) {
				// 一般直接调接口
				var thisPageNum = $(this).text();

				_this.saveData.pageNum = thisPageNum;
				_this.getTableData();
			})

		},

		// 任务列表
		taskDataGet: function () {
			var _this = this;

			// $.get('url', {}, function (response) {
			$.getJSON('/static/data/task.json', function(response){
				if(response.code == 1){
					var taskData = response.data.tasks;

					_this.taskTableTpl(taskData)
				}

				_this.taskActionPage();

				_this.showLanuchPage();
			})
		},

		taskTableTpl: function(data){
			var _this = this,
				str = '';
			str += '<thead><tr><th><input type="checkbox"></th><th><button class="btn btn-sm btn-warning">批量发起</button></th><th>任务列表</th><th>服务组</th><th>工作组</th><th>环境</th><th>任务状态</th></tr></thead><tbody>';

				$.each(data, function(index, value){
					str += '<tr><td><input type="checkbox"></td>\
								<td><button class="btn btn-sm btn-warning js-lanuch-task mt-curosr" data-name="' + value.name + '">发起</button></td>\
								<td class="js-edit-btn mt-curosr" data-for="edit" data-toggle="modal" data-target="#exampleModal">' + value.name + '</td>\
								<td>' + value.serverGroup + '</td>\
								<td>' + value.jobGroup + '</td>\
						        <td>' + value.enviroment + '</td>\
								<td>' + value.restart + '</td></tr>';

				});

				str += '</tbody>';

				$('#bodyList').html(str);
		},

		// 点击添加按钮，添加任务
		taskActionPage: function(){
			var _this = this;

			$('#exampleModal').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget),
					actionType = button.data('for'),
					modal = $(_this);

				if(actionType == 'add'){
					$('#exampleModalLabel').text('添加任务');
					_this.addTaskItem();

				}else if(actionType == 'edit'){
					$('#exampleModalLabel').text('编辑任务');
					_this.editTaskItem();
				}

			})
		},

		addTaskItem: function(){
			var _this = this,
				formTpl = '';
			formTpl += '<div class="form-group">\
						    <label for="add-node-box" class="control-label">部署环境:</label>\
						    <input type="text" class="form-control" id="add-service">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-node-box" class="control-label">代码地址:</label>\
						    <input type="text" class="form-control" id="add-job-name">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-node-box" class="control-label">部署账号:</label>\
						    <input type="text" class="form-control" id="add-serviceGroup">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-node-box" class="control-label">部署路径:</label>\
						    <input type="text" class="form-control" id="add-jobGroup">\
					  	</div>';

			$('#exampleModal').find('form').html(formTpl);


		},

		// 点击任务名称到编辑任务界面
		editTaskItem: function(){

		},

		//点击发起名称到发起任务界面
		showLanuchPage: function () {
			var _this = this;

			$('.js-lanuch-task').off('click').on('click', function(e){
				$('.task-list-page').hide();
				$('.lanuch-task-page').show().find('.lanuch-job-name').text($(this).data('name'));

				_this.lanuchTaskDetail();
			})

			$('.content-main').off('click').on('click', '.back-to-list', function(e){
				$('.task-list-page').show();
				$('.lanuch-task-page').hide();

				_this.taskActionPage();
			})
		},
		lanuchTaskDetail: function () {
			var _this = this,
				formTpl = '';
			formTpl += '<div class="form-group">\
						    <label for="add-node-box" class="control-label col-md-3">版本号:</label>\
						    <div class="col-md-8"><input type="text" class="form-control" id="add-service"></div>\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-node-box" class="control-label col-md-3">部署账号:</label>\
						    <div class="col-md-8"><input type="text" class="form-control" id="add-serviceGroup"></div>\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-node-box" class="control-label col-md-3">部署路径:</label>\
						    <div class="col-md-8"><input type="text" class="form-control" id="add-jobGroup"></div>\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-node-box" class="control-label col-md-3">启停动作:</label>\
						    <div class="col-md-8"><input type="text" class="form-control" id="add-service"></div>\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-node-box" class="control-label col-md-3">机器列表:</label>\
						    <div class="col-md-8"><img class="js-machine-sel mt-curosr" data-target="#exampleModal" data-toggle="modal" src="../../img/deploy-edit.svg"></div>\
					  	</div>';

			$('.lanuch-task-page').find('.panel-body').html(formTpl);

			_this.machineSelect();

		},

		// 点击机器列表，显示机器列表选择项
		machineSelect: function(){
			var _this = this,
				str = '';

			str += ' <select multiple="multiple" size="10" name="doublebox" class="machineBox"></select>';

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
		},


		init: function () {
			var _this = this;
			_this.taskDataGet();
			public_func.treeList();
			public_func.checkboxFun();

			public_func.subMenuClick()

		}
	};

	deploy.init();
})