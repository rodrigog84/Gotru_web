Ext.define('Infosys_web.view.clientes.Desplieguesucursales' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.desplegarsucursales',
    
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Sucursales Clientes',
    layout: 'fit',
    autoShow: true,
    width: 800,
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
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    labelWidth: 90,                    
                    msgTarget: 'side'
                },

                items: [{
                        xtype: 'button',
                        iconCls: 'icon-add',
                        action: 'agregaSucursalesclientes',
                        text : 'Agregar'
                    
                    },{
                        xtype: 'textfield',
                        name : 'id_cliente',
                        itemId: 'id_clienteID',
                        fieldLabel: 'id cliente',
                        hidden: true

                    },{
                        xtype: 'textfield',
                        name : 'nombre',
                        itemId: 'nombreId',
                        width: 750,
                        fieldLabel: 'Razon Social',
                        readOnly: true
                    },{
          xtype: 'fieldset',
          title: 'Sucursales',
          height:330,
          items: [{
              xtype: 'grid',
              itemId: 'desplegarinicialId',
              store: 'Sucursales_clientes',                 
              height: 300,
              columns: [
                { header: "Id", flex: 1, dataIndex: 'id', hidden: true },
                { header: "Id Cliente", flex: 1, dataIndex: 'id_cliente', hidden: true },
                { header: "Razon Social", flex: 1, dataIndex: 'nombres', hidden: true },
                { header: "Sigla", flex: 1, dataIndex: 'sigla'},
                { header: "Rut", flex: 1, dataIndex: 'rut', hidden: true },
                { header: "Direccion", width: 390, dataIndex: 'direccion'},
                { header: "Lista Precios", flex: 1, dataIndex: 'id_lista', hidden: true},
                { header: "Ciudad", flex: 1, dataIndex: 'nombre_ciudad'},
                { header: "Id Ciudad", flex: 1, dataIndex: 'id_ciudad', hidden: true},
                { header: "Comuna", flex: 1, dataIndex: 'nombre_comuna'},
                { header: "Id Comuna", flex: 1, dataIndex: 'id_comuna', hidden: true},                
                { header: "Telefono", flex: 1, dataIndex: 'fono_contacto', hidden: true },
                { header: "E-Mail", flex: 1, dataIndex: 'mail_contacto', hidden: true },
                { header: "Contacto", flex: 1, dataIndex: 'nombre_contacto', hidden: true}
              ]
          }],
        }
        ]
          }
        ];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: [{
                        xtype: 'button',
                        iconCls: 'icon-add',
                        action: 'modificaSucursalesclientes',
                        text : 'Modificar'
                    
                    },'-',{
                        xtype: 'button',
                        iconCls: 'icon-delete',
                        action: 'eliminaSucursalesclientes',
                        text : 'Eliminar'
                    
                    },'->',{
                iconCls: 'icon-reset',
                text: 'Cerrar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
