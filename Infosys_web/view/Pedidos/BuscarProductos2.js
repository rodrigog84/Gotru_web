Ext.define('Infosys_web.view.Pedidos.BuscarProductos2' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductospedidos2',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos',
    layout: 'fit',
    autoShow: true,
    width: 1080,
    height: 480,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Productos',
            store: 'Productoslista',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id',
                hidden: true
            },
            {
                header: "Id producto",
                flex: 1,
                dataIndex: 'id_producto',
                hidden: true
            },{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Codigo de Barra",
                flex: 1,
                dataIndex: 'codigo_barra'
            },{
                header: "Nombres",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Precio Venta",
                flex: 1,
                dataIndex: 'valor',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            },{
                header: "Precio Lista",
                flex: 1,
                dataIndex: 'valor_lista',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            },{
                header: "Stock",
                flex: 1,
                align: 'right',
                dataIndex: 'stock'
            }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 450,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },{
                width: 450,
                xtype: 'textfield',
                itemId: 'listaId',
                fieldLabel: 'IdLista',
                hidden: true
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscar',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 15,
            action: 'seleccionarproductos2',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Productoslista',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
