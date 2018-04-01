/**
 * Created by dell on 2017/12/27.
 */

$(function () {
	var monitor = {

		defaultSet: {
			selTreeNodeId: -1,
			thisPage: 1,
			thisMainMenu: 1,
			thisSubMenu: 1
		},

		// 左侧的树
		onTreeClick: function (event, treeId, treeNode) {
			var _this = this;
			monitor.defaultSet.selTreeNodeId = treeNode.id;

			monitor.tableList('domain', 1);
		},
		beforeEditName: function (treeId, treeNode) {
			var _this = this;

			var zTree = $.fn.zTree.getZTreeObj("treelist");
			zTree.selectNode(treeNode);
			zTree.editName(treeNode);

			return false;
		},
		beforeRemove: function (treeId, treeNode) {
			var _this = this;

			var zTree = $.fn.zTree.getZTreeObj("treelist");
			zTree.selectNode(treeNode);
			return monitor.delCheck();
		},
		delCheck: function () {
			var _this = this;

		},
		beforeRename: function (treeId, treeNode, newName, isCancel) {
			var _this = this;

			if (newName.length == 0) {

					var zTree = $.fn.zTree.getZTreeObj("treelist");
					zTree.cancelEditName();
					alert("节点名称不能为空.");

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
			var testEditNodeApi = 'http://www.nodetest.com/node/edititem',//  编辑节点的接口，改成你自己的
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

				$('#exampleModal').on('show.bs.modal', function (event) {
					var button = $(event.relatedTarget);
					var recipient = button.data('for');
					var modal = $(this);

					if (recipient == '添加') {
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

							var testAddNodeApi = 'http://www.nodetest.com/node/additem',   //  添加节点的接口url，改成你自己的
								param = {};
							param.parentId = treeNode.id;  // 父节点id
							param.thisName = addName; // 该新增节点名称

							// 访问传的参数结构即param变量，例如{parentId:13, thisName:'新增节点1'}
							//$.post(testAddNodeApi, param, function (response) {
							//	if(response.code == 0){
							//		// response中需要你返回给我新的节点的id
							//		location.reload();
							//	}
                            //
							//	modal.modal('hide');
							//});
							modal.modal('hide');
						});
					}
				})

			}
		},

		removeHoverDom: function (treeId, treeNode) {
			$("#addBtn_" + treeNode.tId).unbind().remove();
		},



		// 表格列表
		tableList: function () {
			var _this = this,
				url = '',
				thisMainMenu = _this.defaultSet.thisMainMenu,
				thisSubMenu = _this.defaultSet.thisSubMenu,
				params = {};  //  列表接口的参数

			params.thisPage = _this.defaultSet.thisPage;   // 当前页数名称
			params.thisNode = _this.defaultSet.selTreeNodeId;  //当前node节点
			params.mainMenu = thisMainMenu ;  // 当前主菜单id
			params.subMenu = thisSubMenu;  // 当前子菜单id

			url = 'js/tablelist.json';   // 改成你自己的列表的接口地址

			// 访问传的参数结构即params变量，例如{thisPage:1, thisNode:13, mainMenu:2, subMenu:1}
			$.get(url, params, function (res) {
				var listData = res.data.detail,
					htmlTpl = '';

				if (thisMainMenu == 1) {
					htmlTpl += '<thead><th><td>name</td><td>domain</td><td>enable</td><td>type</td><td>line</td><td>ttl</td></th></thead><tbody>';

				} else {
					htmlTpl += '<thead><th><td>主机名</td><td>IP</td><td>宿主机</td><td>机房</td><td>状态</td><td>套餐</td><td>tags</td></th></thead><tbody>';
				}

				$.each(listData, function (index, value) {
					if (thisMainMenu == 1) {
						htmlTpl += '<tr><td>' + (index + 1) + '</td><td>' + value.name + '</td><td>' + value.domain + '</td><td>' + value.enable + '</td><td>' + value.type + '</td><td>' + value.line + '</td><td>' + value.ttl + '</td></tr>'
					} else {
						htmlTpl += '<tr><td>' + (index + 1) + '</td><td>' + value.zhuji + '</td><td>' + value.ip + '</td><td>' + value.suzhuji + '</td><td>' + value.jifang + '</td><td>' + value.status + '</td><td>' + value.menu + '</td><td>' + value.tags + '</td></tr>'
					}

				});

				htmlTpl += '</tbody>';

				$('#bodyList').html(htmlTpl);

			}, "json");

			_this.pageSel();

		},

		tabMenuSwich: function () {
			var _this = this;
			_this.tableList('domain', '');

			// 主菜单切换，默认选中第一个子菜单
			$('.js-main-tabs').off('click.choice').on('click.choice', 'li', function (e) {
				var thisTab = $(this),
					subMenuArr = [],
					subMenuTpl = '',
					subList = $('.js-sub-tabs');
				thisTab.parent().find('li').removeClass('active');
				thisTab.addClass('active');

				_this.defaultSet.thisPage = 1;
				_this.defaultSet.thisMainMenu = $(this).data('menu');
				switch (thisTab.attr('id')) {
					case 'domain':
						subList.hide();
						$('.domainNav').show();
						_this.defaultSet.thisSubMenu = 1;
						break;
					case 'machine':
						subList.hide();
						$('.machineNav').show();
						_this.defaultSet.thisSubMenu = 4;
						break;
					case 'nodemsg':
						subList.hide();
						$('.nodemsgNav').show();
						_this.defaultSet.thisSubMenu = 7;
						break;
					default:
						return;
				}


				_this.tableList();

			});

			$('.js-sub-tabs').off('click.open').on('click.open', 'li', function (e) {
				_this.defaultSet.thisPage = 1;
				$(this).parent().find('li').removeClass('active');
				$(this).addClass('active');

				_this.defaultSet.thisSubMenu = $(this).data('sub');
				_this.tableList();
			})


		},

		// 分页数据
		pageSel: function () {
			var _this = this;

			$('.pagination').off('click').on('click', 'a', function (event) {
				// 一般直接调接口
				var thisPageNum = $(this).text();
				_this.defaultSet.thisPage = parseInt($(this).text());
				_this.tableList('domain', thisPageNum);

			})

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
					onClick: _this.onTreeClick,
					beforeEditName: _this.beforeEditName,
					beforeRemove: _this.beforeRemove,
					beforeRename: _this.beforeRename,
					onRemove: _this.onRemove,
					onRename: _this.onRename
				}
			};

			$.getJSON('js/protocolTree.json', function (response) {
				var zNodes = response.data.agreement;
				$.fn.zTree.init($("#treelist"), setting, zNodes);
			}, "json");

		},

		leftTreeSlide: function () {
			var _this = this;
			$('.js-slide-tree').off('click.sel').on('click.sel', function (e) {
				var thisEle = $(this);
				if (thisEle.hasClass('icon-chevron-left')) {
					$('.float-tree').animate({left: '-250px'}, 'slow');
					thisEle.removeClass('icon-chevron-left').addClass('icon-chevron-right');

				} else if (thisEle.hasClass('icon-chevron-right')) {
					$('.float-tree').animate({left: '0px'}, 'slow');
					thisEle.removeClass('icon-chevron-right').addClass('icon-chevron-left');
				}
			})

		},
		exitBtn: function () {
			$('.exit-btn').off('click').on('click', function (e) {
				window.location.pathname = "/monitor-web/login.html";
			})
		},

		init: function () {
			var _this = this;

			_this.treeList();
			_this.tabMenuSwich();
			_this.leftTreeSlide();

			_this.exitBtn();
		}
	};

	monitor.init();
});