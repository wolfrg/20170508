/**
 * Created by dell on 2018/3/22.
 */
$(function(){

	// 定义一个大对象，包含该页面要用到的所有的方法
	var tree = {
		saveData: {  // 保存公共变量的一个对象
			pageNum:1, // 保存页码数
			submenuId: 0 // 保存菜单id
		},

		// 调接口，获取表格数据
		getTableData: function(){
			var _this = this,
				param = {};

			// 给后台传参数
			param.nodeId = public_func.defaultSet.selTreeNodeId // 传节点id
			param.page = _this.saveData.pageNum; // 传页码数
			param.submenu = _this.saveData.submenuId; // 传子菜单id

			// $.get('接口', param, function(response){  // domain列表接口
			//$.getJSON('../data/zhuji.json', function(response){
			//	if(response.code == 1){
			//		var data = response.data.detail; // 从接口中得到列表数据
			//		_this.tableTpl(data); // 传给拼接列表模板的函数，拼接列表
            //
			//		_this.pageSel(); // 调页码选择的函数
            //
			//	}
			//})
			$.getJSON('/hosts/all', function(response){

				if(response.code == 200){
					var data = response.data; // 获取接口中返回的列表的数据
					_this.tableTpl(data); // 调用拼接图表模板的函数
					_this.pageSel(); // 页码选择

				}
			})


		},

		//拼接列表
		tableTpl: function (data) {
			var _this = this,
				str = '';
			// 拼接列表头部
			str += '<thead><th><td>主机名</td><td>节点</td></th></thead><tbody>';

			// 拼接列表主体
			$.each(data, function(index, value){
				str += '<tr><td>' + (index + 1) + '</td><td>' + value.hostname + '</td><td>' + value.ip + '</td></tr>';

			});

			str += '</tbody>';

			// 将拼好的列表放入父元素中，生成列表
			$('#bodyList').html(str);
		},

		// 分页
		pageSel: function () {
			var _this = this;

			$('.pagination').off('click').on('click', 'a', function (event) {

				_this.saveData.pageNum = $(this).text(); // 将点击后选择的页码数赋值给公共变量

				_this.getTableData(); // 调列表数据获取函数，将新一页的数据展示出来
			})

		},

		// 入口函数
		init: function () {
			var _this = this;

			public_func.treeList();  // 调公共方法中的树
			_this.getTableData(); // 调图表显示方法

			public_func.subMenuClick(); // 调公共中子菜单点击函数
			public_func.leftTreeAni(); // 调左侧树动画
		}
	};

	tree.init(); // 调入口函数
})
