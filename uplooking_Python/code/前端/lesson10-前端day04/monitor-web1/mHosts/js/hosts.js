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
			$.getJSON('../../data/zhuji.json', function(response){
				if(response.code == 1){
					var data = response.data.detail; // 获取接口中返回的列表的数据
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
			str += '<thead><th><td>主机名</td><td>IP</td><td>宿主机</td><td>机房</td><td>状态</td><td>套餐</td><td>tags</td></th></thead><tbody>';

			// 拼接表格body
			$.each(data, function(index, value){
				str += '<tr><td>' + (index + 1) + '</td><td>' + value.zhuji + '</td><td>' + value.ip + '</td><td>' + value.suzhuji + '</td><td>' + value.jifang + '</td><td>' + value.status + '</td><td>' + value.menu + '</td><td>' + value.tags + '</td></tr>';

			});

			str += '</tbody>';

			$('#bodyList').html(str); // 放入父元素，生成表格
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

			public_func.subMenuClick(); // 调公共函数中的子菜单点击事件


		}
	};

	hosts.init();  // 调入口函数
})
