Ext.define('Infosys_web.view.pedidos_caja.Exportar', {
    extend: 'Ext.window.Window',
    alias : 'widget.formularioexportarpedidoscaja',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    //y: 50,
    title : 'Genera Libro produccion',
    layout: 'fit',
    autoShow: true,
    width: 260,
    height: 145,
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
                    allowBlank: false,
                    combineErrors: false,
                    labelWidth: 90,
                    msgTarget: 'side'
                },

                items: [
                      {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>FECHA</b>',
                        items: [
                        {
                            xtype: 'datefield',
                            fieldCls: 'required',
                            maxHeight: 25,
                            width: 130,
                            allowBlank: false,
                            itemId: 'fechaId',
                            value: new Date(),
                            name : 'fecha_ingreso',
                            renderer: Ext.util.Format.dateRenderer('Y-m-d')
                            
                        }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: '<b>HORA</b>',
                        items: [
                        {
                            xtype: 'combo',
                            width: 130,
                            //labelWidth; 40,
                            itemId: 'horaId',
                            fieldLabel: '',
                            maxHeight: 25,
                            forceSelection : true,
                            editable : false,
                            valueField : 'id',
                            displayField : 'nombre',
                            emptyText : "Seleccione",
                            store : 'Pedidos.Selector2'
                        },
                        ]
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
                iconCls: 'icon-search',
                action: 'exportarExcelFormulario',
                text : 'Generar'
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
