/**
 * Created by dell on 2018/3/22.
 */
var public_func = {
	defaultSet: {
		className: "dark",  // 树自带属性，
		selTreeNodeId: -1,  // 保存节点id
		zNodes:[],       //树所有节点
	},

	// 树---拖拽前方法（可忽略）
	beforeDrag: function (treeId, treeNodes) {
		return false;
	},

	//// 树---点击节点方法（重要）
	//onTreeClick: function (event, treeId, treeNode) {
	//	var _this = this;
	//	public_func.defaultSet.selTreeNodeId = treeNode.id; // 将点击选中的节点id赋值给公共变量的节点id
    //
	//	return treeNode;
    //
	//},

	// 树---点击节点方法（重要）
	onTreeClick: function (event, treeId, treeNode) {
		var _this = this;
		public_func.defaultSet.selTreeNodeId = treeNode.id; // 将点击选中的节点id赋值给公共变量的节点id
		var zNodes = public_func.defaultSet.zNodes
		var pNodeInfo = {
			name : '',
			pId : treeNode.pid
		}
		var tags = ''
		for(var i=0;i<treeNode.level;i++) {
			pNodeInfo = public_func.getPNodeInfo(zNodes,pNodeInfo.pId)
			tags = pNodeInfo.name += '_'+tags
		}

		if(treeNode.node_type){
			tags += treeNode.node_type+'.'
		}
		$('#tags').html(tags += treeNode.name)
		return treeNode;

	},


	//树--点击获取tag串
	getPNodeInfo : function (zNodes,pId) {
		var pName = ''
			for (var j = 0; j < zNodes.length; j++) {
				if (zNodes[j].id == pId) {
					if(zNodes[j].node_type){
						pName = zNodes[j].node_type+'.'
					}
					pName += zNodes[j].name
					pId = zNodes[j].pid
					break
				}
			}
		return {
			name : pName,
			pId : pId
		}
	},



	// 树---编辑形成前方法（可忽略）
	beforeEditName: function (treeId, treeNode) {
		var _this = this;
		_this.className = (_this.className === "dark" ? "" : "dark");

		var zTree = $.fn.zTree.getZTreeObj("treelist");
		zTree.selectNode(treeNode);
		zTree.editName(treeNode);

		return false;
	},

	// 树---删除节点前方法（可忽略）
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

	// 树---重命名节点方法（可忽略）
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

	// 树---删除节点方法（重要）
	onRemove: function (e, treeId, treeNode) {
		var _this = this;

		var testDelNodeApi = '/tree/del/node',  //  删除节点的接口，改成你自己的
			param = {};

		param.pid = treeNode.id;  // 传递删除节点的id

		//删除节点传的数据即param，结构是 {thisId: 13}
		$.post(testDelNodeApi, param, function(response){

		})

	},

	// 树---重命名节点方法（重要）
	onRename: function (e, treeId, treeNode, isCancel) {
		var _this = this;
		var testEditNodeApi = '/tree/edit/node', //  编辑节点的接口，改成你自己的
			param = {};

		param.pid = treeNode.id;  // 该编辑节点的id
		param.name = treeNode.name;  //修改后的新名称

		//删除节点传的数据即param，结构是 {thisId: 13, newName:'修改后的名称'}
		$.post(testEditNodeApi, param, function(response){

			location.reload();
		})

	},

	// 树---显示删除节点的button方法（可忽略）
	showRemoveBtn: function (treeId, treeNode) {

		return !(treeNode.id == -1);
	},

	// 树---显示重命名节点的button方法（可忽略）
	showRenameBtn: function (treeId, treeNode) {

		return true;
	},

	// 树---添加节点的方法（重要）
	addHoverDom: function (treeId, treeNode) {
		var _this = this;
		var newCount = 1;
		var sObj = $("#" + treeNode.tId + "_span"); // 选中的该节点
		if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return; // 如果是编辑状态或该节点没有配置添加按钮，则返回，不进行下面的代码

		// 拼接一个添加的button，将模态框与之关联
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
			+ "' title='add node'  data-toggle='modal' data-target='#exampleModal' data-for='添加' onfocus='this.blur();'></span>";

		sObj.after(addStr);	// 将添加按钮放在该节点后面
		var addBtn = $("#addBtn_" + treeNode.tId); // 获取该节点的添加按钮
		if (addBtn) {
			// addBtn.bind("click", function(){
			// 	var zTree = $.fn.zTree.getZTreeObj("treelist");
			// 	zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
			// 	return false;
			// });

				// 打开添加节点的模态框
			$('#exampleModal').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget);
				var recipient = button.data('for');
				var modal = $(this);

				if (recipient == '添加') {
					modal.find('.modal-title').text('添加节点');
					var strTpl = '';

					// 拼接模态框中的内容
					strTpl += '<div class="form-group">\
									   <label for="add-node-box" class="control-label">节点名称:</label>\
									   <input type="text" class="form-control" id="add-node-box">\
								  </div>\
								  <div class="form-group">\
									   <label for="add-node-box" class="control-label">code_type:</label>\
									   <input type="text" class="form-control" id="add-node_type-box">\
								  </div>';

					//将拼接好的添加模板放入模态框中
					modal.find('form').html(strTpl);

					var submitBtn = modal.find('#confirmBtn');

					// 点击提交按钮后，调添加模态框的接口，将新添加的节点传给后台插库
					submitBtn.off('click').on('click', function () {
						var zTree = $.fn.zTree.getZTreeObj("treelist"),
							addName = $('#add-node-box').val(),
							addNodeType = $('#add-node_type-box').val();
						//zTree.addNodes(treeNode, {id: (100 + newCount), pId: treeNode.id, name: addName});
						zTree.addNodes(treeNode, {id: (100 + newCount), pid: treeNode.id, name: addName});

//						var testAddNodeApi = 'http://www.nodetest.com/node/additem',   // 添加节点的接口url，改成你自己的
						var testAddNodeApi = '/tree/add/node',   // 添加节点的接口url，改成你自己的

							param = {};
						//param.parentId = treeNode.id;  // 父节点id
						//param.thisName = addName; // 该新增节点名称
						param.pid = treeNode.id;  // 父节点id
						param.name = addName; // 该新增节点名称
						param.nodetype = addNodeType; //该新增节点的node_type值


						// 访问传的参数结构即param变量，例如{parentId:13, thisName:'新增节点1'}
						$.post(testAddNodeApi, param, function (response) {
							if(response.code == 0){
								// response中需要你返回给我新的节点的id
								location.reload();
							}

							modal.modal('hide');// 隐藏模态框
						});
					});
				}
			})
		}
	},

	// 树---删除节点hover的方法（可忽略）
	removeHoverDom: function (treeId, treeNode) {
		$("#addBtn_" + treeNode.tId).unbind().remove();
	},

	// 树---树的入口函数，非常重要，在这里面配置树，访问接口得到树的数据
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

	//	$.getJSON('/data/protocolTree.json', function (response) {
	//		console.log(response,'6')
	//		var zNodes = response.data.agreement;
	//		$.fn.zTree.init($("#treelist"), setting, zNodes);
	//	}, "json");
    //
	//},

		$.get('/tree/all', function (response) {
			console.log(response,'6')
			var zNodes = response.data.agreement;
			$.fn.zTree.init($("#treelist"), setting, zNodes);
			public_func.defaultSet.zNodes = zNodes
		}, "json");

	},


	// 子菜单点击
	subMenuClick: function () {

		// 点击子菜单
		$('.js-sub-tabs').off('click.open').on('click.open', 'li', function (e) {

			$(this).parent().find('li').removeClass('active'); //所有子菜单去掉active类
			$(this).addClass('active'); //就给该子菜单添加active类

		});

	},

	// 全选全不选checkbox
	checkboxFun: function(){
		var _this = this,
			father = $('#bodyList');
		//  点击全选
		father.off('click.all').on('click.all','.total-check',function(){
			father.find(".sub-check").prop("checked",$(this).prop("checked"));
			//同步所有的全选按钮
			father.find('.total-check').prop("checked",$(this).prop("checked"));

		});

		// 处理单个
		father.off('click.sin').on('click.sin','.sub-check',function(){
			if(!$(this).prop('checked')){
				father.find('.total-check').prop("checked",$(this).prop("checked"));
			}

			//若在非全选状态下，单个商品依次选中要更新全选按钮状态
			if($('.sub-check').length == $('input.sub-check:checked').length){
				$('.total-check').prop("checked",true);
			}
		});
	},

	// 左侧树展开缩小动画
	leftTreeAni: function(){
		var _this = this;

		// 点击数的控制按钮
		$('.js-slide-tree').off('click').on('click', function(){
			if($(this).hasClass('icon-chevron-left')){ // 如果有向左的按钮的类，说明是展开状态，我们让它合上
				$('.float-tree').animate({left:'-250px'}, 500);//整个树向左移动树的宽度，将其隐藏
				$(this).removeClass('icon-chevron-left').addClass('icon-chevron-right')//并将按钮改成向右的按钮
			}else{
				$('.float-tree').animate({left:'0'}, 500);
				$(this).removeClass('icon-chevron-right').addClass('icon-chevron-left')
			}
		})
	},

	// 侧栏导航
	leftNav: function(){
		$('.navMenu li a').on('click',function(){
			var parent = $(this).parent().parent();
			var labeul =$(this).parent("li").find(">ul");
			if ($(this).parent().hasClass('open') == false) { // 判断你如果父元素没有open类，即没有展开

				//展开
				parent.find('ul').slideUp(300); // 先将所有的列表都收起来
				parent.find("li").removeClass("open"); // 去掉open类
				parent.find('li a').removeClass("active").find(".arrow").removeClass("open") // 去掉所有箭头的open类，相当于reset
				$(this).parent("li").addClass("open").find(labeul).slideDown(300); // 单独向下展示该点击的列表
				$(this).addClass("active").find(".arrow").addClass("open")  // 单独给该箭头添加open类，展示展开效果
			}else{ // 父元素已经有open类了，点击收回

				$(this).parent("li").removeClass("open").find(labeul).slideUp(300); // 向上收起列表

				if($(this).parent().find("ul").length>0){ // 判断是否有二级菜单

					$(this).removeClass("active").find(".arrow").removeClass("open");// 有二级菜单去掉箭头的open类
				}
			}

		});
	},

	// 退出按钮
	exitBtn: function () {
		// 点击退出按钮，退出到登录界面
		$('.exit-btn').off('click').on('click', function (e) {
			window.location.pathname = "/monitor-web/login.html";
		})

	},

	init: function(){
		var _this = this;

		 // 调退出按钮，因为每个页面都会有退出功能，所以就在公共函数中调用就好
		_this.exitBtn();
	}
};