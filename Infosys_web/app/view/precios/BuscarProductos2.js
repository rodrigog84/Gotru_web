Ext.define('Infosys_web.view.precios.BuscarProductos2' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductosprecios2',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos',
    layout: 'fit',
    autoShow: true,
    width: 1080,
    height: 600,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Productos',
            store: 'Productosf',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id',
                hidden: true
            },{
                header: "Codigo de Barra",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Nombres",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Ubicacion Fisica",
                flex: 1,
                dataIndex: 'nom_ubi_prod',
                hidden: true
            },{
                header: "Precio Venta",
                flex: 1,
                dataIndex: 'p_venta',
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
            store: 'Productosf',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
