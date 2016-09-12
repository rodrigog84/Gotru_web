Ext.define('Infosys_web.view.Tiponegocio.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.Tiponegocioprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Tiponegocios',
    store: 'Tiponegocio',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id'
            },{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Descripcion",
                flex: 1,
                dataIndex: 'descripcion'
            }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarTiponegocio',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarTiponegocios',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarTiponegocios',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarTiponegocios',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Tiponegocio',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
