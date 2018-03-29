/**
 * Created by dell on 2018/3/22.
 */
$(function () {
	var deploy = {
		saveData: {
			pageNum:1,  // 存储页码，每次点击页码都改变该值，调接口时传此的页码值
			submenuId: 0 // 存储子菜单id，每次点击子菜单都改变该值，调接口时传此的子菜单值
		},

		// 分页
		pageSel: function () {
			var _this = this;

			$('.pagination').off('click').on('click', 'a', function (event) {
				// 一般直接调接口
				var thisPageNum = $(this).text();

				_this.saveData.pageNum = thisPageNum; // 将选择的页码保存在公共变量中，方便使用
				_this.getTableData(); // 点击完页码后，调显示图表的方法
			})

		},

		// 任务列表
		taskDataGet: function () {
			var _this = this;

			// 调任务列表接口，获取任务列表
			// $.get('url', {}, function (response) {
			$.getJSON('../../data/task.json', function(response){
				if(response.code == 1){ // 判断是否成功
					var taskData = response.data.tasks; // 接口返回的数据

					_this.taskTableTpl(taskData) // 将接口返回的数据传给表格拼接函数，生成表格
				}

				_this.taskActionPage(); // 调添加任务或编辑任务的函数

				_this.showLanuchPage(); // 调进入发起任务界面的函数
			})
		},

		// 生成任务表格
		taskTableTpl: function(data){
			var _this = this,
				str = '';
			// 拼接任务表头
			str += '<thead><tr><th><input class="total-check" type="checkbox"></th><th><button class="btn btn-sm btn-warning">批量发起</button></th><th>任务列表</th><th>服务组</th><th>工作组</th><th>环境</th><th>任务状态</th></tr></thead><tbody>';

				// 拼接任务表格主体
				$.each(data, function(index, value){
					str += '<tr><td><input class="sub-check" type="checkbox"></td>\
								<td><button class="btn btn-sm btn-warning js-lanuch-task mt-curosr" data-name="' + value.name + '">发起</button></td>\
								<td class="js-edit-btn mt-curosr" data-for="edit" data-toggle="modal" data-target="#exampleModal">' + value.name + '</td>\
								<td>' + value.serverGroup + '</td>\
								<td>' + value.jobGroup + '</td>\
						        <td>' + value.enviroment + '</td>\
								<td>' + value.restart + '</td></tr>';

				});

				str += '</tbody>';

				$('#bodyList').html(str); // 放入父元素中，生成表格
		},

		// 点击添加按钮，添加任务
		taskActionPage: function(){
			var _this = this;

			// 调用模态框，显示模态框
			$('#exampleModal').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget),
					actionType = button.data('for'),
					modal = $(_this);

				// 判断按钮是要添加任务还是编辑任务
				if(actionType == 'add'){
					$('#exampleModalLabel').text('添加任务'); // 将模态框的title改成添加任务
					_this.addTaskItem(); // 调添加任务的函数

				}else if(actionType == 'edit'){
					$('#exampleModalLabel').text('编辑任务'); // 将模态框的title改成编辑任务
					_this.editTaskItem(); // 调编辑任务的函数
				}

			})
		},

		// 添加任务的模态框
		addTaskItem: function(){
			var _this = this,
				formTpl = '';

			// 拼接模态框的内容
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

			$('#exampleModal').find('form').html(formTpl);// 将拼接好的字符模板放入父元素中，生成添加模态框的表单


		},

		// 点击任务名称到编辑任务界面
		editTaskItem: function(){

		},

		//点击发起名称到发起任务界面
		showLanuchPage: function () {
			var _this = this;

			// 点击发起任务按钮
			$('.js-lanuch-task').off('click').on('click', function(e){
				$('.task-list-page').hide(); // 隐藏显示任务界面
				$('.lanuch-task-page').show().find('.lanuch-job-name').text($(this).data('name'));  // 显示发起任务界面并在表头显示该任务的名称

				_this.lanuchTaskDetail(); // 调用生成发起任务表格的方法
			})

			// 点击发起界面的返回按钮，返回到任务列表界面
			$('.content-main').off('click').on('click', '.back-to-list', function(e){
				$('.task-list-page').show(); // 显示任务列表的页面
				$('.lanuch-task-page').hide(); // 隐藏发起页面


				//调添加或编辑任务的函数
				_this.taskActionPage();
			})
		},
		lanuchTaskDetail: function () {
			var _this = this,
				formTpl = '';

			// 拼接发起任务界面的表格
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

			$('.lanuch-task-page').find('.panel-body').html(formTpl); // 将拼接好的字符模板放入父元素中，生成表格

			_this.machineSelect(); // 等表格生成后，调用机器选择功能，即左右选择插件

		},

		// 点击机器列表，调用左右选择插件，显示机器列表选择项
		machineSelect: function(){
			var _this = this,
				str = '';

			// 必须给里面加一个该标签，是该插件的要求，便于插件的生成
			str += ' <select multiple="multiple" size="10" name="doublebox" class="machineBox"></select>';
			$('#exampleModal').find('form').html(str);

			// 调用doublebox插件，生成左右选择插件，大括号中的是左右选择插件的配置,有注释的是我们需要根据自己需求改的
			$('.machineBox').doublebox({
				nonSelectedListLabel: '产品线下的机器列表', // 插件左侧显示的标题
				selectedListLabel: '已选择的机器列表', // 插件右侧显示的标题
				preserveSelectionOnMove: 'moved',
				moveOnSelect: false,
				nonSelectedList:[{"roleId":"1","roleName":"设备1"},{"roleId":"2","roleName":"设备2"},{"roleId":"3","roleName":"设备3"},{"roleId":"4","roleName":"设备4"}],  // 插件左侧显示的数据，从接口中获取
				selectedList:[{"roleId":"4","roleName":"设备4"},{"roleId":"5","roleName":"设备2"}], // 插件右侧显示的数据，从接口中获取
				optionValue:"roleId",
				optionText:"roleName",
				doubleMove:true,
			});
		},


		init: function () {
			var _this = this;
			_this.taskDataGet(); // 调用该方法，从接口中获取表格的数据

			public_func.treeList(); // 调用公共方法，生成左侧的树
			public_func.checkboxFun(); // 调用公共方法中的checkbox选择事件
			public_func.subMenuClick(); // 调用公共方法中子菜单点击事件
			public_func.leftTreeAni(); // 调用公共方法中左侧树动画方法

			// 下面的代买是做了一个测试（可删除）：如何获取公共方法中的我们点击的树的某一个节点的id，即当我们要在当前部署js中获取公共的树的节点id时，使用public_func.defaultSet.selTreeNodeId
			$('.btn-success').on('click.gtye',function(e) {
				console.log(public_func.defaultSet.selTreeNodeId);

			})
		}
	};

	deploy.init();
})