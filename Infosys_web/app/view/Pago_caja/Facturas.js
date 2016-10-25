Ext.define('Infosys_web.view.Pago_caja.Facturas', {
    extend: 'Ext.window.Window',
    alias : 'widget.boletaingresar',

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
    width: 1300,
    layout: 'fit',
    title: 'Pago Caja',

    initComponent: function() {
        var me = this;
        var formaPago = Ext.create('Ext.data.Store', {
        fields: ['id', 'nombre'],
        data : [
            {"id":1, "nombre":"CONTADO"},
            {"id":11, "nombre":"CREDITO"},
            {"id":2, "nombre":"PAGO CHEQUE "},
            {"id":4, "nombre":"TARJETA DE DEBITO"},
            {"id":7, "nombre":"TARJETA DE CREDITO"}
        ]
        }); 
        var stItms = Ext.getStore('productos.Items');
        stItms.removeAll();
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
                            height: 140,
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
                                    items: [{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 180,
                                            labelWidth: 85,
                                            allowBlank: false,
                                            name: 'nom_documento',
                                            itemId: 'nomdocumentoId',
                                            fieldLabel: '<b>DOCUMENTO</b>',
                                            readOnly: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            allowBlank: false,
                                            name: 'tip_docum',
                                            itemId: 'tipodocumentoId',
                                            fieldLabel: '<b>id_tipodocumento</b>',
                                            hidden: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 40                                          
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            allowBlank: false,
                                            name: 'num_boleta',
                                            itemId: 'numboletaId',
                                            fieldLabel: '<b>NUMERO</b>',
                                            readOnly: true


                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            allowBlank: false,
                                            name: 'id_recauda',
                                            itemId: 'recaudaId',
                                            fieldLabel: '<b>RECAUDA</b>',
                                            hidden: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 145
                                           
                                        },{
                                            xtype: 'datefield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 170,
                                            fieldLabel: '<b>FECHA</b>',
                                            itemId: 'fechaboletaId',
                                            name: 'fecha_factura',
                                            value: new Date()
                                        },{
                                            xtype: 'displayfield',
                                            width: 50
                                           
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    height: 35,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'id_cliente',
                                            name : 'id',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'listaId',
                                            name : 'id',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'bodegaId',
                                            name : 'id',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'cajeroId',
                                            name : 'id_cajero',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'cajaId',
                                            name : 'id_caja',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            msgTarget: 'side',
                                            maxHeight: 25,
                                            width: 220,
                                            fieldLabel: '<b>RUT</b>',
                                            itemId: 'rutId',
                                            name : 'rut'                                           
                                        },{
                                            xtype: 'displayfield',
                                            width: 20
                                           
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Buscar',
                                            maxHeight: 25,
                                            width: 80,
                                            action: 'validarut',
                                            itemId: 'buscarBtn'
                                        },{
                                            xtype: 'displayfield',
                                            width: 50
                                           
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>RAZON SOCIAL</b>',
                                            maxHeight: 25,
                                            labelWidth: 80,
                                            width: 885,
                                            itemId: 'nombre_id',
                                            name : 'nombre',
                                            readOnly: true
                                            
                                        }
                                    ]
                                },{
                    xtype: 'fieldset',
                    title: 'Items Documento',
                    fieldDefaults: {
                        labelWidth: 70,
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
                                width: 140,
                                labelWidth: 40,
                                fieldLabel: 'Codigo',
                                name: 'codigo_barra',
                                itemId: 'codigoId',
                                style: 'font-weight: bold;'
                            },{xtype: 'splitter'},{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 55,
                                itemId: 'nombreproductoId',
                                fieldLabel: 'Producto',
                                name: 'nomproducto',                                
                                readOnly: true
                            },{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 60,
                                itemId: 'productoId',
                                fieldLabel: 'Producto',
                                name: 'Productos',                                
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar Producto',
                                maxHeight: 25,
                                width: 120,
                                allowBlank: true,
                                action: 'buscarproductos',
                                itemId: 'buscarproc'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 180,
                                labelWidth: 40,
                                fieldLabel: 'Precio',
                                itemId: 'precioId',
                                style: 'font-weight: bold;',
                                decimalPrecision:3
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 120,
                                labelWidth: 40,
                                minValue: 0,
                                fieldLabel: 'Stock',
                                readOnly: true,
                                itemId: 'cantidadOriginalId',
                                style: 'font-weight: bold;'

                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 160,
                                labelWidth: 60,
                                minValue: 0,
                                //value: 1,
                                fieldLabel: 'Cantidad',
                                itemId: 'cantidadId',
                                decimalPrecision:3
                            },{
                                xtype: 'numberfield',
                                width: 120,
                                labelWidth: 60,
                                minValue: 0,
                                value: 0,
                                fieldLabel: 'Descuento Pro',
                                itemId: 'totdescuentoId',
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                            xtype: 'combo',
                            width: 190,
                            queryMode: 'local',
                            itemId: 'DescuentoproId',
                            fieldLabel: 'Descto %',
                            store: 'Tabladescuento',
                            emptyText : "Seleccione",
                            valueField: 'id',
                            displayField: 'nombre'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'icon-plus',
                                width: 80,
                                allowBlank: true,
                                action: 'agregarItem'
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
                            store: 'productos.Items',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem'
                            },
                            {
                                iconCls: 'icon-delete',
                                text: 'Editar',
                                action: 'editaritem'
                            }
                            ],
                            height: 295,
                            columns: [
                                { text: 'Id producto',  dataIndex: 'id_producto', width: 250, hidden : true },
                                { text: 'Id descuento',  dataIndex: 'id_descuento', width: 250, hidden : true },
                                { text: 'codigo',  dataIndex: 'codigo', width: 250, hidden : true },
                                { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                                { text: 'Bodega',  dataIndex: 'id_bodega', width: 250, hidden:true},
                                { text: 'Precio Unitario',  dataIndex: 'precio', align: 'right',flex:1, decimalPrecision:3},
                                { text: 'Cantidad',  dataIndex: 'cantidad', align: 'right',width: 150, decimalPrecision:3},
                                { text: 'Descuento',  dataIndex: 'dcto', align: 'right',width: 100, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Neto',  dataIndex: 'neto', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")}, hidden: true },
                                { text: 'Iva',  dataIndex: 'iva', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")}, hidden: true },
                                { text: 'Total',  dataIndex: 'total', align: 'right',flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} }
                                ]
                            },{
                        xtype: 'fieldset',
                        title: 'Total Documento',
                        fieldDefaults: {
                        labelWidth: 420
                        },
                        items: [
                            {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 180,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'condpagoId',
                            fieldLabel: '<b>FORMA PAGO</b>',
                            fieldCls: 'required',
                            store: formaPago,
                            name: 'cond_pago',
                            valueField: 'id',
                            displayField: 'nombre'                           
                        },{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'total',
                            itemId: 'finaltotalId',
                            readOnly: true,
                            fieldLabel: '<b>TOTAL</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'cancela',
                            itemId: 'valorcancelaId',
                            fieldLabel: '<b>CANCELA</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 100,
                            name : 'vuelto',
                            itemId: 'valorvueltoId',
                            fieldLabel: '<b>VUELTO</b>',
                            disabled : false,
                            labelAlign: 'top'
                        },{xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 180,
                            minValue: 0,
                            name : 'afecto',
                            itemId: 'numchequeId',
                            fieldLabel: '<b>NUMCHEQUE</b>',
                            value: 0,
                            labelAlign: 'top',
                            disabled : true  
                        },{xtype: 'splitter'},{
                            xtype: 'datefield',
                            labelAlign: 'top',
                            fieldCls: 'required',
                            maxHeight: 35,
                            labelWidth: 50,
                            width: 170,
                            fieldLabel: '<b>FECHA</b>',
                            itemId: 'fechachequeId',
                            name: 'fecha_cheque',
                            value: new Date()
                        },{xtype: 'splitter'},{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 210,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'bancoId',
                            fieldLabel: '<b>BANCO</b>',
                            fieldCls: 'required',
                            store: 'Banco',
                            name: 'banco',
                            valueField: 'id',
                            displayField: 'nombre',
                            disabled : true  
                           
                        },{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 180,
                            name : 'num_boleta',
                            itemId: 'numboleta2Id',
                            fieldLabel: '<b>No.BOLETA</b>',
                            labelAlign: 'top',
                            align: 'right'
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalpostId',
                            hidden: true
                        }]
                    }
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
                            itemId: 'grababoletaId',
                            disabled : false,
                            action: 'grabarboleta',
                            text: 'Grabar'
                        },
                        {
                            xtype: 'tbseparator'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        
    }

});
