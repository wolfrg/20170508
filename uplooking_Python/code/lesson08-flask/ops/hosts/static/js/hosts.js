/**
 * Created by dell on 2018/3/22.
 */
$(function(){
	var hosts = {

		saveData: {
			pageNum:1,  // 存储页码，调接口时跟这儿取页码数据
			submenuId: 0 // 存储子菜单id，调接口时跟这儿取子菜单id数据
		},

		// 获取表格数据
		getTableData: function(){
			var _this = this,
				param = {};

			// 给后台传参数
			param.page = _this.saveData.pageNum;
			param.submenu = _this.saveData.submenuId;

			// $.get('接口', param, function(response){  // domain列表接口
			$.getJSON('/hosts/all', function(response){

				if(response.code == 200){
					var data = response.data; // 获取接口中返回的列表的数据
					_this.tableTpl(data); // 调用拼接图表模板的函数
					_this.pageSel(); // 页码选择

				}
			})
		},

		// 表格模板
		tableTpl: function (data) {
			var _this = this,
				str = '';

			// 拼接表格头部
			str += '<thead><th><input class="total-check" type="checkbox"></th><th>主机名</th><th>类型</th><th>IP</th><th>位置</th>/thead><tbody>';

			// 拼接表格body
			$.each(data, function(index, value){

				str += '<tr><td><input class="sub-check" type="checkbox"></td><td>' + value.hostname + '</td><td>' + value.host_type + '</td><td>' + value.ip + '</td><td>' + value.location + '</td>/tr>';

			});

			str += '</tbody>';

			$('#bodyList').html(str); // 放入父元素，生成表格
		},

		// 添加主机或绑定主机模态框展示判断
		modalShowJudge: function () {
			var _this = this;
			// 调用模态框，显示模态框
			$('#exampleModal').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget),
					modal = $(this),
					actionType = button.data('for');
				if(actionType == 'add'){
					_this.addHostFun(modal);
				}else if(actionType == 'bind'){
					_this.bindHostFun(modal);
				}

			})
		},
				// 添加主机
		addHostFun: function (modal) {
			var _this = this;
			// 调用模态框，显示模态框
				var addTpl = '';

				// 拼接添加主机模态框内容
				addTpl += '<div class="form-group">\
						    <label for="add-host-box" class="control-label">主机名:</label>\
						    <input type="text" class="form-control" id="hostname">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">主机类型:</label>\
						    <input type="text" class="form-control" id="type">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">IP地址:</label>\
						    <input type="text" class="form-control" id="ip">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">位置:</label>\
						    <input type="text" class="form-control" id="location">\
						</div>';

				$('#exampleModal').find('form').html(addTpl);// 将拼接好的字符模板放入父元素中，生成添加模态框的表单

				var submitBtn = modal.find('#confirmBtn');

				// 点击提交按钮后，调添加模态框的接口
				submitBtn.off('click').on('click', function (e) {
					var params = {};

					params.hostname = $('#hostname').val();
					params.type = $('#type').val();
					params.ip = $('#ip').val();
					params.location = $('#location').val();


					//添加主机的url地址
					$.post('/hosts/add', params, function (res) {

						if(res.code == 0){
							location.reload();
						}

						modal.modal('hide');// 隐藏模态框
					})
				})
		},

		// 绑定主机方法
		bindHostFun: function (modal) {
			var _this = this,
				hostAry = [],
				bindTpl = '';

			modal.find('#exampleModalLabel').text('绑定主机');
			if($('input.sub-check:checked').length == 0){

				modal.find('form').text("请先选择主机名称！");
			}else{
				$.each($('input.sub-check:checked'), function (index, value) {
					hostAry.push($(value).parent().next().text());
				})

				// 拼接绑定主机的模态框内容
				bindTpl += '<div class="form-group">\
						    <label for="add-host-box" class="control-label">主机名:</label><ul>';

				$.each(hostAry, function (index, value) {
					bindTpl += '<li>' +value + '</li>';
				});

				bindTpl += '</ul></div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">节点:</label>\
						    <input type="text" class="form-control" id="tagstring">\
					  	</div>';

				$('#exampleModal').find('form').html(bindTpl);// 将拼接好的字符模板放入父元素中，生成添加模态框的表单

				var submitBtn = modal.find('#confirmBtn');

				// 点击提交按钮后，调绑定主机的模态框的接口
				submitBtn.off('click').on('click', function (e) {
					var params = {};

					params.hostnames = hostAry.join(",");
					params.tagstring = $('#tagstring').val();

					//绑定主机的url地址
					$.post('/hosts/bind', params, function (data) {
						alert(data);
							location.reload();

						modal.modal('hide');// 隐藏模态框
					})
				})
			}



		},

		// 分页
		pageSel: function () {
			var _this = this;

			$('.pagination').off('click').on('click', 'a', function (event) {

				_this.saveData.pageNum = $(this).text(); // 将点击的页码赋给公共变量
				_this.getTableData(); // 调显示图表的函数，显示新一页的表格数据
			})

		},

		// 入口函数
		init: function(){
			var _this = this;

			_this.getTableData(); // 调显示图表函数
			public_func.leftNav(); // 调左侧导航函数
			_this.modalShowJudge(); // 添加主机或绑定主机

			public_func.subMenuClick(); // 调公共函数中的子菜单点击事件


		}
	};

	hosts.init();  // 调入口函数
})
