/**
 * Created by dell on 2018/3/22.
 */
var public_func = {
	defaultSet: {
		className: "dark",
		selTreeNodeId: -1
	},

	// 左侧的树
	beforeDrag: function (treeId, treeNodes) {
		return false;
	},
	onTreeClick: function (event, treeId, treeNode) {
		var _this = this;
		public_func.defaultSet.selTreeNodeId = treeNode.id;

		return treeNode;

	},
	beforeEditName: function (treeId, treeNode) {
		var _this = this;
		_this.className = (_this.className === "dark" ? "" : "dark");

		var zTree = $.fn.zTree.getZTreeObj("treelist");
		zTree.selectNode(treeNode);
		zTree.editName(treeNode);

		return false;
	},
	beforeRemove: function (treeId, treeNode) {
		var _this = this;
		_this.className = (_this.className === "dark" ? "" : "dark");

		var zTree = $.fn.zTree.getZTreeObj("treelist");
		zTree.selectNode(treeNode);
		return public_func.delCheck();
	},
	delCheck: function () {
		var _this = this;

	},
	beforeRename: function (treeId, treeNode, newName, isCancel) {
		var _this = this;
		_this.className = (_this.className === "dark" ? "" : "dark");

		if (newName.length == 0) {
			setTimeout(function () {
				var zTree = $.fn.zTree.getZTreeObj("treelist");
				zTree.cancelEditName();
				alert("节点名称不能为空.");
			}, 0);
			return false;
		}
		return true;
	},
	onRemove: function (e, treeId, treeNode) {
		var _this = this;

		var testDelNodeApi = 'http://www.nodetest.com/node/removeitem',  //  删除节点的接口，改成你自己的
			param = {};

		param.thisId = treeNode.id;  // 删除节点的id

		//删除节点传的数据即param，结构是 {thisId: 13}
		$.post(testDelNodeApi, param, function(response){

		})

	},
	onRename: function (e, treeId, treeNode, isCancel) {
		var _this = this;
		var testEditNodeApi = 'http://www.nodetest.com/node/edititem', //  编辑节点的接口，改成你自己的
			param = {};

		param.thisId = treeNode.id;  // 该编辑节点的id
		param.newName = treeNode.name;  //修改后的新名称

		//删除节点传的数据即param，结构是 {thisId: 13, newName:'修改后的名称'}
		$.post(testEditNodeApi, param, function(response){

			location.reload();
		})

	},
	showRemoveBtn: function (treeId, treeNode) {

		return !(treeNode.id == -1);
	},
	showRenameBtn: function (treeId, treeNode) {

		return true;
	},
	addHoverDom: function (treeId, treeNode) {
		var _this = this;
		var newCount = 1;
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
			+ "' title='add node'  data-toggle='modal' data-target='#exampleModal' data-for='添加' onfocus='this.blur();'></span>";

		sObj.after(addStr);
		var addBtn = $("#addBtn_" + treeNode.tId);
		if (addBtn) {
			// addBtn.bind("click", function(){
			// 	var zTree = $.fn.zTree.getZTreeObj("treelist");
			// 	zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
			// 	return false;
			// });

			$('#exampleModal').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget);
				var recipient = button.data('for');
				var modal = $(this);

				if (recipient == '添加') {
					modal.find('.modal-title').text('添加节点');
					var strTpl = '';
					strTpl += '<div class="form-group">\
									   <label for="add-node-box" class="control-label">节点名称:</label>\
									   <input type="text" class="form-control" id="add-node-box">\
								  </div>';

					modal.find('form').html(strTpl);

					var submitBtn = modal.find('#confirmBtn');

					submitBtn.off('click').on('click', function () {
						var zTree = $.fn.zTree.getZTreeObj("treelist"),
							addName = $('#add-node-box').val();
						zTree.addNodes(treeNode, {id: (100 + newCount), pId: treeNode.id, name: addName});

						var testAddNodeApi = 'http://www.nodetest.com/node/additem',   // 添加节点的接口url，改成你自己的
							param = {};
						param.parentId = treeNode.id;  // 父节点id
						param.thisName = addName; // 该新增节点名称

						// 访问传的参数结构即param变量，例如{parentId:13, thisName:'新增节点1'}
						$.post(testAddNodeApi, param, function (response) {
							if(response.code == 0){
								// response中需要你返回给我新的节点的id
								location.reload();
							}

							modal.modal('hide');
						});
					});
				}
			})
		}
	},

	removeHoverDom: function (treeId, treeNode) {
		$("#addBtn_" + treeNode.tId).unbind().remove();
	},
	treeList: function () {
		var _this = this,
			r;
		var setting = {
			view: {
				addHoverDom: _this.addHoverDom,
				removeHoverDom: _this.removeHoverDom,
				selectedMulti: false
			},
			edit: {
				enable: true,
				editNameSelectAll: true,
				showRemoveBtn: _this.showRemoveBtn,
				showRenameBtn: _this.showRenameBtn
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeDrag: _this.beforeDrag,
				onClick: _this.onTreeClick,
				beforeEditName: _this.beforeEditName,
				beforeRemove: _this.beforeRemove,
				beforeRename: _this.beforeRename,
				onRemove: _this.onRemove,
				onRename: _this.onRename
			}
		};

		$.getJSON('../../data/protocolTree.json', function (response) {
			var zNodes = response.data.agreement;
			$.fn.zTree.init($("#treelist"), setting, zNodes);
		}, "json");

	},

	// 子菜单点击
	subMenuClick: function () {
		$('.js-sub-tabs').off('click.open').on('click.open', 'li', function (e) {

			$(this).parent().find('li').removeClass('active');
			$(this).addClass('active');

		});

	},

	// 退出按钮
	exitBtn: function () {
		$('.exit-btn').off('click').on('click', function (e) {
			window.location.pathname = "/monitor-web/login.html";
		})

	},

	init: function(){
		var _this = this;

		_this.exitBtn();
	}
};