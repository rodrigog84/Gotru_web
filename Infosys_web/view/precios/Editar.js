Ext.define('Infosys_web.view.precios.Editar', {
    extend: 'Ext.window.Window',
    alias : 'widget.precioseditar',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.button.Button',
        'Ext.form.field.Display',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.form.field.Number',
        'Ext.toolbar.Separator'
    ],

    autoShow: true,
    height: 640,
    width: 1200,
    layout: 'fit',
    title: 'Creacion Lista de Precios',

    initComponent: function() {
        var me = this;
        //var stItms = Ext.getStore('precios.Items');
        //stItms.removeAll();
        Ext.applyIf(me, {
            items: [
                {
                xtype: 'container',
                margin: 8,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                    items: [
                        {
                            xtype: 'container',
                            height: 100,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    height: 37,
                                    labelWidth: 120,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [  {
                                            xtype: 'textfield',
                                            width: 240,
                                            maxHeight: 25,
                                            fieldLabel: 'id',
                                            itemId: 'idId',
                                            name: 'id',
                                            style: 'font-weight: bold;',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            width: 240,
                                            maxHeight: 25,
                                            fieldLabel: 'Nombre',
                                            itemId: 'nombreId',
                                            name: 'nombre',
                                            style: 'font-weight: bold;',
                                            readOnly: true
                                        },{xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 150,
                                            labelWidth: 60,
                                            allowBlank: false,
                                            name: 'numero',
                                            itemId: 'numeroId',
                                            fieldLabel: '<b>NUMERO</b>',
                                            readOnly: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 45
                                           
                                        },{
                                            xtype: 'datefield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 170,
                                            fieldLabel: '<b>FECHA</b>',
                                            itemId: 'fechaId',
                                            name: 'fecha',
                                            value: new Date(),
                                            readOnly: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 250
                                           
                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 160,
                                            labelWidth: 60,
                                            allowBlank: false,
                                            name: 'margen',
                                            itemId: 'margenId',
                                            fieldLabel: '<b>DESCUENTO</b>'
                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'button',
                                            text: 'Actualizar',
                                            itemId: 'buscarproc',
                                            maxHeight: 25,
                                            width: 120,
                                            allowBlank: true,
                                            action: 'actualizarproductos'
                                        }
                                    ]
                                },{
                                    xtype: 'fieldset',
                                    title: '<b>ITEMS PRODUCTOS</b>',
                                    fieldDefaults: {
                                        labelWidth: 90,
                                        align: 'center'                        
                                    },
                                    items: [
                                    {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [

                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        align: 'center',     
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: '<b>ID</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            itemId: 'productoId',
                                            name : 'id_producto',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldLabel: '<b>PRODUCTO</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 280,
                                            itemId: 'nomproductoId',
                                            name : 'nom_producto'
                                        },{
                                            xtype: 'textfield',
                                            fieldLabel: '<b>CODIGO</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 280,
                                            itemId: 'codigoId',
                                            name : 'codigo',
                                            hidden: true
                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'button',
                                            text: 'Buscar Productos',
                                            itemId: 'buscarproc',
                                            maxHeight: 25,
                                            width: 120,
                                            allowBlank: true,
                                            action: 'buscarproductos2'
                                        },
                                        {xtype: 'splitter'},{
                                            xtype: 'combo',
                                            itemId: 'tipounimedidaId',
                                            fieldLabel: 'Medida',
                                            forceSelection : true,
                                            labelWidth: 50,
                                            editable : false,
                                            name : 'id_uni_medida',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Medidas'
                                        },{xtype: 'splitter'},
                                        {
                                            xtype: 'numberfield',
                                            width: 180,
                                            labelWidth: 50,
                                            minValue: 0,
                                            fieldLabel: 'Precio',
                                            readOnly: true,
                                            itemId: 'valorOriginalId',
                                            style: 'font-weight: bold;'

                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'numberfield',
                                            width: 180,
                                            minValue: 0,
                                            value: 0,
                                            fieldLabel: 'Nuevo Precio',
                                            itemId: 'nuevovalorId',
                                            style: 'font-weight: bold;'
                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'button',
                                            text: 'Agregar',
                                            iconCls: 'icon-plus',
                                            width: 105,
                                            allowBlank: true,
                                            action: 'agregarItem2'
                                        }]
                                    }

                                    ]
                                }]

                                 }

                                        ]
                        },{
                            xtype: 'grid',
                            itemId: 'itemsgridId',
                            title: 'Detalle',
                            labelWidth: 50,
                            store: 'Precios2',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem2'
                            },'->',{
                                xtype: 'button',
                                iconCls : 'icon-exel',
                                text: 'EXCEL LISTA',
                                action:'exportarexcelproductos2'
                            }
                            ],
                            height: 410,
                            columns: [
                                    { text: 'IdProducto',  dataIndex: 'id_producto', width: 250,hidden: true },
                                    { text: 'Codigo',  dataIndex: 'codigo', width: 250},
                                    { text: 'Producto',  dataIndex: 'nom_producto', width: 250 },
                                    { text: 'Medida',  dataIndex: 'id_medida', width: 250, hidden: true },
                                    { text: 'Medida',  dataIndex: 'nom_medida', width: 250},
                                    { text: "Id Bodega",dataIndex: 'id_bodega', width: 250, hidden: true},
                                    { text: "Bodega",   dataIndex: 'nom_bodega', width: 250},
                                    { text: 'Porcentaje',  dataIndex: 'porcentaje', flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                    { text: 'Precio Original',  dataIndex: 'valor', width: 100, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")}, hidden: true },
                                    { text: 'Precio',  dataIndex: 'valor_lista', flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} }
                                ]
                            }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: ['->',
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            action: 'grabareditar',
                            text: 'Grabar'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
