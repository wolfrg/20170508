/**
 * Created by Administrator on 2018/3/18.
 */
$(function(){
    var monitor={
        defaultData:{
            nodeId:-1, // 存储当前选择的节点id
            mainMenu:0, // 存储主菜单id
            subMenu :0, // 存储子菜单id
            page:1, // 存储当前页码
        },
        menuClick: function(){
            var _this = this;

            // 主菜单和子菜单点击事件
            $('.main-menu, .sub-menu').off('click').on('click','li', function(e){
                var thisBtn = $(this);
                // 点击菜单后先清除所有li的active当前选中类
                thisBtn.parent().find('li').removeClass('active');
                // 然后给该选中菜单添加选中状态
                thisBtn.addClass('active');

                // 判断是主菜单还是子菜单，然后存储对应的id
                if(thisBtn.parents('.menu-con').hasClass('main-menu')){
                    _this.defaultData.mainMenu = $(this).data('id');
                }else{
                    _this.defaultData.subMenu = $(this).data('id');
                }

                // 调一遍table接口，根据选中的主菜单或子菜单更新表格数据
                _this.tableDataGet();
            })

        },

        // 选择页面
        pageSel: function(){
            var _this = this;

            // 给页数添加点击事件
            $('.pagination').off('click').on('click','li', function(e){
               // 更新保存的页码数
                _this.defaultData.page = $(this).find('a').text();

                // 调一遍table接口，根据页码数，更新table数据
                _this.tableDataGet();
            })
        },

        // table 数据获取
        tableDataGet: function(){
          var _this = this,
              param = {};

            // 要请求的参数
            param.nodeid = _this.defaultData.nodeId;
            param.mainMenu = _this.defaultData.mainMenu;
            param.subMenu = _this.defaultData.subMenu;
            param.page = _this.defaultData.page;

            $.getJSON('js/tablelist.json',param, function(response){
                if(response.code === 1){
                    var data=response.data.detail;

                    // 拼接table
                    _this.tableTpl(data);
                    // 调用选择页码按钮
                    _this.pageSel();
                }
            })
        },

        // 拼接表格
        tableTpl: function(data){
            var _this = this,
                tplHtml = '';

            tplHtml += '<thead><tr><th>id</th><th>name</th><th>domain</th></tr></thead><tbody>'
            $.each(data, function(index, value){
                tplHtml += '<tr><th>'+index +'</th><th>'+value.name+'</th><th>' + value.domain + '</th></<tr><td></td></tr>';
            })

            // 生成表格
            $('#tablelist').html(tplHtml);
        },

        // 入口函数，调用表格展示方法和菜单点击事件
        init: function(){
            var _this = this;
            _this.tableDataGet();
            _this.menuClick();
        }
    };

    monitor.init()


})
