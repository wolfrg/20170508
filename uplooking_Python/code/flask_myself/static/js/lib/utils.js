/**
 * Created by dell on 2018/3/22.
 */
var public_func = {
	


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
		_this.editbtn();
	}
};