Ext.define('Infosys_web.view.Sectores.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.sectoresingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Sectores',
    layout: 'fit',
    autoShow: true,
    width: 480,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    //allowBlank: false,
                    combineErrors: true,
                    labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [
                    {
                        xtype: 'textfield',
                        name : 'id',
                        fieldLabel: 'id',
                        hidden:true
                    },
                    {
                        xtype: 'textfield',
                        name : 'codigo',
                        allowBlank: false,
                        fieldLabel: 'Codigo'
                    },
                    {
                        xtype: 'textfield',
                        name : 'descripcion',
                        allowBlank: false,
                        fieldLabel: 'Descripcion'
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarsectores'
            },'-',{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
