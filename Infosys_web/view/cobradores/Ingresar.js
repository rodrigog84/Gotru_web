Ext.define('Infosys_web.view.cobradores.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.Cobradoringresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Cobrador',
    layout: 'fit',
    autoShow: true,
    width: 420,
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
                    //anchor: '100%',
                    labelAlign: 'left',
                    //allowBlank: false,
                    combineErrors: true,
                    //labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [
                    {
                        xtype: 'textfield',
                        name : 'id',
                        fieldLabel: 'id',
                        hidden:true
                    },{
                        xtype: 'textfield',
                        name : 'rut',
                        width: 180,
                        labelWidth: 80,
                        fieldLabel: 'Rut'
                    },{
                        xtype: 'textfield',
                        width: 380,
                        labelWidth: 80,
                        name : 'nombre',
                        fieldLabel: 'Nombre'
                    },{
                        xtype: 'textfield',
                        name : 'direccion',
                        width: 380,
                        labelWidth: 80,
                        fieldLabel: 'Direccion'
                    },{
                        xtype: 'textfield',
                        name : 'telefono',
                        width: 180,
                        labelWidth: 80,
                        fieldLabel: 'Fono'
                    },{
                        xtype: 'textarea',
                        name : 'observacion',
                        width: 380,
                        labelWidth: 80,
                        fieldLabel: 'Observacion'
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
                action: 'grabarCobrador'
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
