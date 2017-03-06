Ext.define('Infosys_web.view.clientes.EditarSucursales', {
    extend: 'Ext.window.Window',
    alias : 'widget.sucursaleseditarclientes',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    title : 'Editar/Sucursales',
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
                    allowBlank: false,
                    combineErrors: true,
                    labelWidth: 150,
                    msgTarget: 'side'
                },
                items: [{
                        xtype: 'textfield',
                        name : 'id',
                        itemId: 'idID',
                        fieldLabel: 'Id',
                        readOnly: true,
                        hidden: true
                    },{
                        xtype: 'textfield',
                        name : 'id_cliente',
                        itemId: 'id_clienteID',
                        fieldLabel: 'Cliente',
                        readOnly: true,
                        hidden: true
                    },{
                        xtype: 'textfield',
                        name : 'direccion',
                        itemId: 'direccionId',
                        fieldLabel: 'Direccion'
                    },{
                        xtype: 'combo',
                        itemId: 'tipoCiudadId',
                        fieldLabel: 'Ciudad',
                        name: 'id_ciudad',
                        store: 'TipoCiudades',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                         anchor: '65%',
                        /*listConfig: {
                            minWidth: 450
                        },
                        width: 140*/
                        
                    },{
                        xtype: 'combo',
                        itemId: 'tipoComunaId',
                        fieldLabel: 'Comuna',
                        name: 'id_comuna',
                        store: 'TipoComunas',
                        queryMode: 'local',
                        forceSelection: true,
                        displayField: 'nombre',
                        valueField: 'id',
                        anchor: '65%',
                        /*listConfig: {
                            minWidth: 450
                        },
                        width: 140*/
                        
                    },{xtype: 'splitter'},{
                        xtype: 'combo',
                        itemId: 'listadoId',
                        //labelWidth: 90,
                        //width: 150,
                        anchor: '65%',
                        fieldLabel: 'Lista Precios',
                        forceSelection : true,
                        editable : false,
                        name : 'id_lista',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Seleccione",
                        store : 'Precios',
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        name : 'email_contacto',
                        itemId: 'emailId',
                        fieldLabel: 'E_Mail'
                    },{
                        xtype: 'textfield',
                        itemId: 'contactoId',
                        name : 'nombre_contacto',
                        fieldLabel: 'Nombre Contacto'
                    },{
                        xtype: 'textfield',
                        itemId: 'fonoId',
                        name : 'fono_contacto',
                        fieldLabel: 'Telefono Contacto'
                    },{
                        xtype: 'textfield',
                        itemId: 'siglaId',
                        name : 'sigla_sucursales',
                        fieldLabel: 'Sigla'
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons2',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarsucursales2'
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
