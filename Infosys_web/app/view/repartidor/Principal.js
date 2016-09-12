Ext.define('Infosys_web.view.repartidor.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.Repartidorprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Repartidor',
    store: 'Repartidor',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id'
            },{
                header: "Rut",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Direccion",
                flex: 1,
                dataIndex: 'direccion'
            },{
                header: "Telefono",
                flex: 1,
                dataIndex: 'telefono'
            },{
                header: "Observaciones",
                flex: 1,
                dataIndex: 'observaciones',
                hidden: true
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
                action: 'agregarRepartidor',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarRepartidor',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarRepartidor',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarRepartidor',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Repartidor',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
