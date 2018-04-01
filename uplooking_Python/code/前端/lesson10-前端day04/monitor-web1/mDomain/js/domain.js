/**
 * Created by dell on 2018/3/22.
 */
$(function () {
	var domain = {

		saveData: {
			pageNum:1, // 存储页码，每次点击页码都改变该值，调接口时传此的页码值
			submenuId: 0  // 存储子菜单id，每次点击子菜单都改变该值，调接口时传此的子菜单值
		},

		//获取域名管理列表的数据
		getTableData: function(){
			var _this = this,
				param = {}; // 定义要传的参数

			param.page = _this.saveData.pageNum; // 传页码
			param.submenu = _this.saveData.submenuId; // 传子菜单id

			// $.get('接口', param, function(response){  // domain列表接口
			$.getJSON('../../data/tablelist.json', function(response){
				if(response.code == 1){
					var data = response.data.detail; // 得到接口中返回的列表的数据
					_this.tableTpl(data); // 将数据传给拼模板方法，拼图表

					_this.pageSel(); // 调选择页码方法

				}
			})
		},

		// 拼接列表函数
		tableTpl: function (data) {
			var _this = this,
				str = '';

			// 拼接域名列表的头部
			str += '<thead><th><td>name</td><td>mDomain</td><td>enable</td><td>type</td><td>line</td><td>ttl</td></th></thead><tbody>';

			// 拼接列表body
			$.each(data, function(index, value){
				str += '<tr><td>' + (index + 1) + '</td><td>' + value.name + '</td><td>' + value.domain + '</td><td>' + value.enable + '</td><td>' + value.type + '</td><td>' + value.line + '</td><td>' + value.ttl + '</td></tr>';

			});

			str += '</tbody>';

			$('#bodyList').html(str); // 放入父元素，生成列表
		},

		// 分页
		pageSel: function () {
			var _this = this;

			// 点击页码事件
			$('.pagination').off('click').on('click', 'a', function (event) {

				_this.saveData.pageNum = $(this).text(); // 将点击的页码值赋给上面保存的公共变量中

				_this.getTableData(); // 调表格获取数据函数，显示新一页的表格数据
			})

		},

		// 页面入口函数,在这调页面中要用到的方法
		init: function(){
			var _this = this;

			_this.getTableData(); // 一进域名管理界面，先调表格显示函数, 将表格显示出来

			public_func.subMenuClick() // 调公共方法中的子菜单点击事件
		}
	};

	// 调用init入口函数
	domain.init();
});

