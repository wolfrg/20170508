/**
 * Created by Administrator on 2018/3/25.
 */
$(function(){

    var domain = {
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
                tplHtml += '<tr><td>'+index +'</td><td>'+value.name+'</td><td>' + value.domain + '</td></tr></tbody>';
            });


            // ���ɱ��
            $('#tablelist').html(tplHtml);



        },

        // ѡ��ҳ��
        pageSel: function(){console.log(4)
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
    };

    domain.init();
})
