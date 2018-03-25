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
                tplHtml += '<tr><td>'+index +'</td><td>'+value.name+'</td><td>' + value.domain + '</td></tbody>';
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
