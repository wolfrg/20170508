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
			if( $('#machineList li.active').attr('data-sub') == '4' ){      //物理机
				param.host_type = 'machine'
			}else if( $('#machineList li.active').attr('data-sub') == '5' ){     //虚拟机
				param.host_type = 'vm'
			}else {

			}
			param.page = _this.saveData.pageNum;
			param.submenu = _this.saveData.submenuId;

			$.get('/hosts/all', param, function(response){  // domain列表接口
				if(response.code == 1){
					var data = response.data.detail; // 获取接口中返回的列表的数据
					_this.tableTpl(data); // 调用拼接图表模板的函数
					_this.pageSel(); // 页码选择

				}
			},'json')
		},

		// 表格模板
		tableTpl: function (data) {
			var _this = this,
				str = '';

			// 拼接表格头部
			str += '<thead><th><input class="total-check" type="checkbox"></th><th>主机名</th><th>IP</th><th>主机类型</th><th>机房</th><th width=200>操作</th></thead><tbody>';

			// 拼接表格body
			$.each(data, function(index, value){
				var hostname = value.hostname;
				var ip = value.ip;
				var host_type = value.host_type;
				var location = value.location;
				var hostId = value.id;
				str += '<tr><td><input class="sub-check" type="checkbox"></td><td>' + hostname + '</td><td>' + ip + '</td><td>' + host_type + '</td><td>' + location + '</td><td><button class="btn btn-success btn-sm" data-target="#exampleModal" data-toggle="modal" data-for="modify" hostname="' + hostname + '" ip="' + ip+ '" host_type="' + host_type+ '" location="' + location+ '" hostId="'  + hostId +'">修改</button>\
             <button class="btn btn-success btn-sm" data-target="#exampleModal" data-toggle="modal" data-for="delete" hostId="'  + hostId +'">删除</button>\
                        	<button class="btn btn-success btn-sm" data-target="#exampleModal" data-toggle="modal" data-for="detail" hostId="'  + hostId +'">详情</button></td></tr>';

			});

			str += '</tbody>';

			$('#bodyList').html(str); // 放入父元素，生成表格
		},

		//二级菜单点击切换事件
		getMachineList: function () {
			var _this = this
			$('#machineList').off('click').on('click', function (e) {
				_this.getTableData(); // 调显示图表函数
			})
		},

		// 模态框展示判断
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
				}else if(actionType == 'modify'){
					_this.modifyHostFun(modal,button);
				}else if(actionType == 'delete'){
					_this.deleteHostFun(modal,button);
				}else if(actionType == 'detail'){
					_this.detailHostFun(modal,button);
				}

			})
		},
				// 添加主机
		addHostFun: function (modal) {
			var _this = this;
			// 调用模态框，显示模态框
			modal.find('#exampleModalLabel').text('添加主机');
				var addTpl = '';

				// 拼接添加主机模态框内容
				addTpl += '<div class="form-group">\
						    <label for="add-host-box" class="control-label">主机名:</label>\
						    <input type="text" class="form-control" id="add-hostname">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">IP:</label>\
						    <input type="text" class="form-control" id="add-ip">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">主机类型:</label>\
						    <select class="form-control" id="add-hosttype"">\
                      			<option value="machine" selected>machine</option>\
                        		<option value="vm">vm</option>\
              				</select>\
					  	</div>\
						<div class="form-group">\
							<label for="add-host-box" class="control-label">机房:</label>\
							<input type="text" class="form-control" id="add-locate">\
						</div>';

				$('#exampleModal').find('form').html(addTpl);// 将拼接好的字符模板放入父元素中，生成添加模态框的表单

				var submitBtn = modal.find('#confirmBtn');

				// 点击提交按钮后，调添加模态框的接口
				submitBtn.off('click').on('click', function (e) {
					var params = {};

					params.hostname = $('#add-hostname').val();
					params.ip = $('#add-ip').val();
					params.hosttype = $('#add-hosttype').val();
					params.locate = $('#add-locate').val();


					//添加主机的url地址
					$.post('/hosts/add/host_node', params, function (res) {
						location.reload();
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
						    <input type="text" class="form-control" id="add-ip">\
					  	</div>';

				$('#exampleModal').find('form').html(bindTpl);// 将拼接好的字符模板放入父元素中，生成添加模态框的表单

				var submitBtn = modal.find('#confirmBtn');

				// 点击提交按钮后，调绑定主机的模态框的接口
				submitBtn.off('click').on('click', function (e) {
					var params = {};

					params.hostname = hostAry.join(",");
					//params.node = $('#add-node').val();
					params.node = $('#add-ip').val();

					//添加主机的url地址
					$.post('/hosts/bind/host_node', params, function (res) {

						if(res.code == 0){
							location.reload();
						}

						modal.modal('hide');// 隐藏模态框
					})
				})
			}



		},

		//修改主机
		modifyHostFun: function (modal,button) {
			var _this = this,
				hostAry = [];

			modal.find('#exampleModalLabel').text('修改主机信息');
			// 调用模态框，显示模态框
				var addTpl = '';
				var infos = button[0].attributes    //获取详情信息
				// 拼接主机详情模态框内容
				addTpl += '<div class="form-group">\
						    <label for="add-host-box" class="control-label">主机名:</label>\
						    <input type="text" class="form-control" id="add-hostname" value="'+infos.hostname.nodeValue+'">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">IP:</label>\
						    <input type="text" class="form-control" id="add-ip" value="'+infos.ip.nodeValue+'">\
					  	</div>\
					  	<div class="form-group">\
						    <label for="add-host-box" class="control-label">主机类型:</label>\
						    <input type="text" class="form-control" id="add-hosttype" value="'+infos.host_type.nodeValue+'">\
					  	</div>\
						<div class="form-group">\
							<label for="add-host-box" class="control-label">机房:</label>\
							<input type="text" class="form-control" id="add-locate" value="'+infos.location.nodeValue+'">\
						</div>';

				$('#exampleModal').find('form').html(addTpl);// 将拼接好的字符模板放入父元素中，生成添加模态框的表单

			var submitBtn = modal.find('#confirmBtn');

			// 点击提交按钮后，调修改模态框的接口
			submitBtn.off('click').on('click', function (e) {
				var params = {};

				params.id = infos.hostId.nodeValue;
				params.hostname = $('#add-hostname').val();
				params.ip = $('#add-ip').val();
				params.hosttype = $('#add-hosttype').val();
				params.locate = $('#add-locate').val();


				//修改主机的url地址
				$.post('/hosts/alter_node', params, function (res) {

					if(res.code == 0){
						location.reload();
					}

					modal.modal('hide');// 隐藏模态框
					location.reload();
				})
			})
		},

		// 分页
		pageSel: function () {
			var _this = this;

			$('.pagination').off('click').on('click', 'a', function (event) {

				_this.saveData.pageNum = $(this).text(); // 将点击的页码赋给公共变量
				_this.getTableData(); // 调显示图表的函数，显示新一页的表格数据
			})

		},

		//删除主机
		deleteHostFun: function (modal,button) {
			modal.find('#exampleModalLabel').text('删除主机');
			$('#exampleModal').find('form').html("确认删除吗？");
			var infos = button[0].attributes    //获取信息
			var submitBtn = modal.find('#confirmBtn');

			// 点击提交按钮后，调修改模态框的接口
			submitBtn.off('click').on('click', function (e) {
				var params = {};

				params.id = infos.hostId.nodeValue;

				//修改主机的url地址
				$.post('/hosts/del_node', params, function (res) {
					location.reload();
					if(res.code == 0){
						location.reload();
					}

					modal.modal('hide');// 隐藏模态框
				})
			})
		},

		//查看主机详情
		detailHostFun: function (modal,button) {
			modal.find('#exampleModalLabel').text('主机详情');
			var str = '';
			var infos = button[0].attributes    //获取信息
			var params = {};
			params.id = infos.hostId.nodeValue;
			//查看主机详情的url地址
			$.get('/hosts/query_detail', params, function (res) {

				if(res.code == 1){
					var detail = res.data.details[0]
					str += 'disk:'+detail.disk+'<br>memory:'+detail.memory+'<br>cpu:'+detail.cpu
					$('#exampleModal').find('form').html(str);
				}

			},'json')
			$('#exampleModal').find('form').html(str);
			var submitBtn = modal.find('#confirmBtn');

			// 点击提交按钮后，调修改模态框的接口
			submitBtn.off('click').on('click', function (e) {
				modal.modal('hide');// 隐藏模态框
			})
		},

		// 入口函数
		init: function(){
			var _this = this;

			_this.getTableData(); // 调显示图表函数
			_this.getMachineList();   //二级菜单点击获取不同的列表
			public_func.leftNav(); // 调左侧导航函数
			_this.modalShowJudge(); // 添加主机、绑定主机、修改主机
			public_func.subMenuClick(); // 调公共函数中的子菜单点击事件


		}
	};

	hosts.init();  // 调入口函数
})




