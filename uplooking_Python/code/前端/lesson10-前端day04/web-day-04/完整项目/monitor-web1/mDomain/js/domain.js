/**
 * Created by dell on 2018/3/22.
 */
$(function () {
	var domain = {

		saveData: {
			pageNum:1,
			submenuId: 0
		},

		getTableData: function(){
			var _this = this,
				param = {};

			param.page = _this.saveData.pageNum;
			param.submenu = _this.saveData.submenuId;
			console.log(param)

			// $.get('接口', param, function(response){  // domain列表接口
			$.getJSON('../../data/tablelist.json', function(response){
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

			str += '<thead><th><td>name</td><td>mDomain</td><td>enable</td><td>type</td><td>line</td><td>ttl</td></th></thead><tbody>';

			$.each(data, function(index, value){
				str += '<tr><td>' + (index + 1) + '</td><td>' + value.name + '</td><td>' + value.domain + '</td><td>' + value.enable + '</td><td>' + value.type + '</td><td>' + value.line + '</td><td>' + value.ttl + '</td></tr>';

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

		init: function(){
			var _this = this;

			_this.getTableData();

			public_func.subMenuClick()
		}
	};

	domain.init();
});

