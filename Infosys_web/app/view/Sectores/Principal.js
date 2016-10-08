Ext.define('Infosys_web.view.Sectores.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.sectoresprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Sectores',
    store: 'Sectores',
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
                action: 'agregarsectores',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarsectores',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarsectores',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarsectores',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Sectores',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
