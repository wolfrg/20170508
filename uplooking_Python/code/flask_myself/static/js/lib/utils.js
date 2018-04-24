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

	

	//index html right table
	showInfo:function() {
		    $.ajax({
                type: "GET",
                url: '/getUserInfo',
                data: 'json',
                success: function (json) {
                        var str = '';
                        str += '<thead><tr><th><input type="checkbox"></th><th>编号</th><th>用户名</th><th>职位</th><th>IP地址</th><th>备注</th><th>操作</th></tr></thead><tbody>';
                        json = JSON.parse(json);
                        $.each(json, function (index, valued) {
                                str += '<tr class="js-items-data" data-id="'+valued.id+'" data-username="'+valued.username+'" data-position="'+valued.position+'" data-addr="'+valued.ipaddr+'">\
											<td><input type="checkbox"></td>\
											<td>'+ valued.id + ' </td>\
											<td>'+ valued.username + ' </td>\
											<td>'+ valued.position + ' </td>\
											<td>'+ valued.ipaddr + ' </td>\
											<td class="js-items-remark">'+ valued.remark + ' </td>\
											<td>\
												<button class="btn btn-xs btn-info" data-for="edit" data-target="#exampleModal" id="myedit" v="'+valued.id+'" data-toggle="modal">编辑</button>\
												<button class="btn btn-xs btn-danger" v="'+valued.id+'">删除</button>\
											</td>\
                                      </tr>';
                        })
                        str += '</tbody>';
                    
                        $('#tbody').html(str)

                },

        }


        );
	},

	//提交添加的用户信息
	addInfo:function () {

		// get input value
		var id = $('#num').val();
		var username = $('#username').val();
		var position = $('#position').val();
		var ipaddr = $('#ipaddr').val();
		var remark = $('#remark').val();

		var  data = {};
		data.id = id;
		data.username = username;
		data.position = position;
		data.ipaddr = ipaddr;
		data.remark = remark;


		$.ajax({
			
			type:'POST',
			url:'/addUserInfo',
			data:data,
			success:function(response) {
				// console.log(data);
				if(response == 1) {
					location.reload();
					// alert('插入成功！');
					// $('#exampleModal').modal('hide');
					$('#exampleModal').hide();
				}
				
				
			},

			dataType:"json"

			
		});

	},

	// 更新编辑的接口
	editInfo: function(){
		console.log(2);
		
		


		$.ajax({
			type:'POST',
			url:'/edit_update',
			data:data,
			success:function(response) {
				// console.log(data);
				if(response == 1) {
					location.reload();
					// alert('插入成功！');
					// $('#exampleModal').modal('hide');
					$('#exampleModal').hide();
				}


			},

			dataType:"json"


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