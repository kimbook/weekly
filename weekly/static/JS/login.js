// JavaScript Document
Ext.onReady(function() {
    var form = Ext.create('Ext.form.Panel', {
        bodyPadding: 5,
        // The form will submit an AJAX request to this URL when submitted
        url: '/action/login/',
        // Fields will be arranged vertically, stretched to full width
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        // The fields
        border: 0,
        defaultType: 'textfield',
        items: [{
            fieldLabel: '用户名',
            name: 'account',
            allowBlank: false
        },{
            xtype: 'textfield',
            fieldLabel: '密码',
            name: 'password',
            allowBlank: false
        },{
            hidden: true,
            name: Ext.get('csrf').down('input').getAttribute('name'),
            value: Ext.get('csrf').down('input').getAttribute('value'),
            allowBlank: false
        }],
        // Reset and Submit buttons
        buttons: [{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }, {
            text: 'Submit',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                           location.href=action.result.redirect
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('登录失败', action.result.msg);
                        }
                    });
                }
            }
        }],
        renderTo: Ext.getBody()
    });
    var win = Ext.create('Ext.window.Window', {
            title: '用户登陆',
            layout: 'fit',
            height: 150,
            minHeight: 150,
            width: 300,
            minWidth: 300,
            plain:true,
            items: form,
            closable: false
    });
    win.show();
    
});

