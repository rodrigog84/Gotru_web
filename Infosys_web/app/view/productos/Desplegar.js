Ext.define('Infosys_web.view.productos.Desplegar', {
    extend: 'Ext.window.Window',
    alias : 'widget.productosdesplegar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar Productos',
    layout: 'fit',
    autoShow: true,
    width: 860,
    modal: true,
    iconCls: 'icon-sheet',

    layout: {
                type: 'fit'
            },

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            bodyPadding: 30,
            frame: true,
            border: false,
            fieldDefaults: {
            anchor: '100%',
            labelAlign: 'left',
            combineErrors: true,
            labelWidth: 150,
            msgTarget: 'side'
            },

            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                anchor: '100%',
                items: [
            {
                xtype: 'textfield',
                name : 'codigo',
                labelWidth: 50,
                width: 200,
                fieldLabel: 'Codigo'
                          
            },{
                xtype: 'displayfield',
                width: 10
               
            },{
                xtype: 'textfield',
                name : 'codigo_barra',
                labelWidth: 50,
                width: 200,
                fieldLabel: 'Barra'
                          
            }]
        },{
            xtype: 'textfield',
            name : 'nombre',
            fieldLabel: 'Nombre Producto',
            labelWidth: 110,
            width: 850
        },{
            xtype: 'textfield',
            name : 'descripcion',
            fieldLabel: 'Descripcion',
            labelWidth: 70,
            width: 850
        },{
            xtype: 'textfield',
            name : 'id',
            itemId: 'Id',
            fieldLabel: 'id',
            hidden:true
        },{
            xtype: 'combo',
            itemId: 'marcaId',
            fieldLabel: 'Marca',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_marca',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Marcas'
        },{
            xtype: 'combo',
            itemId: 'tipobodegaId',
            fieldLabel: 'Bodega',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_bodega',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Bodegas'
        },{
            xtype: 'combo',
            itemId: 'tipofamiliaId',
            fieldLabel: 'Familias',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_familia',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Familias'
        },{
            xtype: 'combo',
            itemId: 'tipoagrupacionId',
            fieldLabel: 'Agrupaciones',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_agrupacion',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Agrupacion'
        },{
            xtype: 'combo',
            itemId: 'tiposubfamiliaId',
            fieldLabel: 'Sub Familia',
            forceSelection : true,
            anchor: '65%',
            editable : false,
            name : 'id_subfamilia',
            valueField : 'id',
            displayField : 'nombre',
            emptyText : "Seleccione",
            store : 'Subfamilia'
                    },{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
            {
                xtype: 'combo',
                itemId: 'tipoUbicaId',
                fieldLabel: 'Ubicacion Fisica',
                forceSelection : true,
                anchor: '65%',
                editable : false,
                name : 'id_ubi_prod',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Ubicas'
            },{xtype: 'splitter'},{
                xtype: 'combo',
                itemId: 'tipounimedidaId',
                fieldLabel: 'Unidad de Medida',
                forceSelection : true,
                editable : false,
                labelWidth: 120,
                name : 'id_uni_medida',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Medidas'
            },{xtype: 'splitter'},{
                xtype: 'numberfield',
                labelWidth: 80,
                width: 150,
                fieldLabel: 'Equivalencia',
                name:'equiv_pro'
            }]
        },{
            xtype: 'fieldset',
            title: 'Precios',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ultima Compra',
                    name:'p_ult_compra',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    align: 'center',
                    readOnly : true
                },{xtype: 'splitter'},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Mayor Compra',
                    name:'p_may_compra',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    align: 'center',
                    readOnly : true
                }

                ]
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                
                {
                    xtype: 'textfield',
                    fieldLabel: 'Promedio',
                    name:'p_promedio',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    align: 'right',
                    readOnly : true
                },{xtype: 'splitter'},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Venta',
                    name:'p_venta',
                    align: 'right',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}
                }

                ]
            },,{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                
                {
                    xtype: 'textfield',
                    fieldLabel: 'Costo',
                    name:'p_costo',
                    align: 'right',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    //anchor: '20%',
                    readOnly : true
                }

                ]
            },
            ]
        },{
            xtype: 'fieldset',
            title: 'Inventario',
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Stock',
                    name:'stock',
                    anchor: '30%',
                    align: 'right',
                    renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                    readOnly : true
                }

                ]
            }
            ]
        }]
    }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',{
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarproductos2'
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
