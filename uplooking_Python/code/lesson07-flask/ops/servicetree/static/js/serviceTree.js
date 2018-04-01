/**
 * Created by dell on 2018/3/22.
 */
$(function(){
	var tree = {

		saveData: {
			pageNum:1,
			submenuId: 0
		},

		getTableData: function(){
			var _this = this,
				param = {};

			param.nodeId = public_func.defaultSet.selTreeNodeId
			param.page = _this.saveData.pageNum;
			param.submenu = _this.saveData.submenuId;
			console.log(param)

			// $.get('接口', param, function(response){  // domain列表接口
			$.get('/tree/all', function(response){
				if(response.code == 1){
					var data = response.data.detail;

					_this.tableTpl(data);

					_this.pageSel();

				}
			})
		},

		tableTpl: function (data) {
			var _this = this,
				str = '';

			str += '<thead><th><td>主机名</td><td>IP</td><td>宿主机</td><td>机房</td><td>状态</td><td>套餐</td><td>tags</td></th></thead><tbody>';

			$.each(data, function(index, value){
				str += '<tr><td>' + (index + 1) + '</td><td>' + value.zhuji + '</td><td>' + value.ip + '</td><td>' + value.suzhuji + '</td><td>' + value.jifang + '</td><td>' + value.status + '</td><td>' + value.menu + '</td><td>' + value.tags + '</td></tr>';

			});

			str += '</tbody>';

			$('#bodyList').html(str);
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

		init: function () {
			var _this = this;

			public_func.treeList();
			_this.getTableData();

			public_func.subMenuClick()
		}
	};

	tree.init();
})
