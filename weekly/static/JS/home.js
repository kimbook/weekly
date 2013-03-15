Ext.onReady(function(){

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.

    var context = Ext.create('Ext.panel.Panel', {
        columnWidth: 1/3,
        baseCls:'x-plain',
        bodyStyle:'padding:5px 0 5px 5px',
        items:[{
            title: 'A Panel',
        html: 'TTTTTT'
        }]
    })
    var context2 = Ext.create('Ext.panel.Panel', {
        columnWidth: 1/3,
        baseCls:'x-plain',
        bodyStyle:'padding:5px 0 5px 5px',
        items:[{
            title: 'A Panel',
        html: 'KKKKKKKK'
        }]
    })
    var viewport = Ext.create('Ext.Viewport', {
        layout:'border',
        items:[{
        region:'west',
        id:'west-panel',
        title:'导航栏',
        split:true,
        width: 200,
        minSize: 175,
        maxSize: 400,
        collapsible: true,
        margins:'35 0 5 5',
        cmargins:'35 5 5 5',
        layout:'accordion',
        layoutConfig:{
            animate:true
        },
        items: [{
                   html: '<ul class="btns_ul"><li id="in">入库</li><li id="out">出库</li><li>其它</li></ul>',
        title:'仓库管理',
        autoScroll:true,
        border:false
               },{
                   title:'数据管理',
                   html: '',
                   border:false,
                   autoScroll:true
               },{
                   title: '人员管理',
                   html: '',
                   border: false,
                   autoScroll: true
               }]
        },{
            region:'center',
            margins:'35 5 5 0',
            layout:'column',
            autoScroll:true,
            defaults: {
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            items: context
        }]
    });

    Ext.get('in').on('click', function(e){
        Ext.MessageBox.alert('Tip',viewport)
    });

});


