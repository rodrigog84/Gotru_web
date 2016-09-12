Ext.define('Infosys_web.view.precios.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.preciosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Control de Precios',
    store: 'Precios',
    height: 500,
    viewConfig: {
        forceFit: true
    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id',
        align: 'center',
        hidden: true
    },{
        header: "Numero",
        flex: 1,
        dataIndex: 'numero',
        align: 'center'
    },{
        header: "Nombre",
        flex: 1,
        dataIndex: 'nombre',
        align: 'center'
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        align: 'center'
        
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'margen'
        
    },{
        header: "Usuario",
        flex: 1,
        dataIndex: 'usuario',
        hidden: true
        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'ingresar',
                text : 'Ingresar'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editar',
                text : 'Editar'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'EXCEL LISTA',
                action:'exportarexcelproductos',
                hidden: true
            },'->',{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 110,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                value: "Nombre",
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'productos.Selector2'
            },{
                width: 160,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarproductos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarprecios',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Precios',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
