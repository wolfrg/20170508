/**
 * Created by Administrator on 2018/3/25.
 */
$(function(){
    var host = {

        // table ���ݻ�ȡ
        tableDataGet: function(){
            var _this = this,
                param = {};

            // Ҫ����Ĳ���
            //param.nodeid = _this.defaultData.nodeId;
            //param.mainMenu = _this.defaultData.mainMenu;
            //param.subMenu = _this.defaultData.subMenu;
            //param.page = _this.defaultData.page;

            $.getJSON('../../data/tablelist.json',param, function(response){
                if(response.code === 1){
                    var data=response.data.detail;

                    // ƴ��table
                    _this.tableTpl(data);
                    // ����ѡ��ҳ�밴ť
                    _this.pageSel();
                }
            })
        },

        // ƴ�ӱ��
        tableTpl: function(data){
            var _this = this,
                tplHtml = '';

            tplHtml += '<thead><tr><th>id</th><th>name</th><th>domain</th></tr></thead><tbody>'
            $.each(data, function(index, value){
                tplHtml += '<tr><th>'+index +'</th><th>'+value.name+'</th><th>' + value.domain + '</th></<tr><td></td></tr>';
            })

            // ���ɱ��
            $('#tablelist').html(tplHtml);
        },

        // ѡ��ҳ��
        pageSel: function(){
            var _this = this;

            // ��ҳ����ӵ���¼�
            $('.pagination').off('click').on('click','li', function(e){
                // ���±����ҳ����
                _this.defaultData.page = $(this).find('a').text();

                // ��һ��table�ӿڣ�����ҳ����������table����
                _this.tableDataGet();
            })
        },

        init:function(){
            var _this = this;

            _this.tableDataGet();

            public_func.menuClick();
        }
    }

    host.init();
})
