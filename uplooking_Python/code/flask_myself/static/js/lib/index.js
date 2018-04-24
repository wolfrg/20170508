/**
 * Created by dell on 2017/12/27.
 */

$(function () {
	var monitor = {

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

			url = 'static/data/tablelist.json';   // 改成你自己的列表的接口地址

			// 访问传的参数结构即params变量，例如{thisPage:1, thisNode:13, mainMenu:2, subMenu:1}
			$.get(url, params, function (res) {
				var listData = res.data.detail,
					htmlTpl = '';

				if (thisMainMenu == 1) {
					htmlTpl += '<thead><th><td>name</td><td>mDomain</td><td>enable</td><td>type</td><td>line</td><td>ttl</td></th></thead><tbody>';

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

		},


		init: function () {
			var _this = this;

			_this.treeList();
			_this.tabMenuSwich();

			_this.exitBtn();
		}
	};

	monitor.init();
});