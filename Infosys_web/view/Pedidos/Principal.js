Ext.define('Infosys_web.view.Pedidos.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pedidosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Nota Pedido',
    store: 'Pedidos',
    height: 300,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id',
        hidden: true
               
    },{
        header: "Numero",
        flex: 1,
        dataIndex: 'num_pedido'
               
    },{
        header: "Pedido",
        flex: 1,
        dataIndex: 'id_tipopedido',
        renderer: function(value){
            if (value == "1") {
                return 'FIJO';
             }
            if (value == "2") {
             //return '<img src="http://localhost:999/rutaimg.jpg" />'
               return 'RETENIDO';   
            }
           
           
        }
    },{
        header: "Tipo Documento",
        flex: 1,
        dataIndex: 'tip_documento',
        hidden : true
               
    },{
        header: "Documento",
        flex: 1,
        dataIndex: 'nom_documento'
               
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha_doc',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y') 
    },{
        header: "Fecha Pedido",
        flex: 1,
        dataIndex: 'fecha_pedido',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y')
    },{
        header: "Hora Pedido",
        flex: 1,
        dataIndex: 'hora_pedido',
        type: 'date'
    },{
        header: "Fecha Despacho",
        flex: 1,
        dataIndex: 'fecha_despacho',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y')
    },{
        header: "Hora Despacho",
        flex: 1,
        dataIndex: 'hora_despacho',
        type: 'date'
    },{
        header: "Rut",
        flex: 1,
        align: 'right',
        dataIndex: 'rut_cliente'
    },{
        header: "Razon Social",
         width: 390,
        dataIndex: 'nom_cliente'
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor'
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'neto',
        hidden: true,
        aling: 'rigth',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'descuento',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")},
        hidden: true
    },{
        header: "Total Venta",
        flex: 1,
        dataIndex: 'total',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
        
    },],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarpedido',
                text : 'Genera Pedido'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarpedidos',
                text : 'Editar / Agregar'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'exportarpedidos'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelnotaventa'
            },'->',{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Pedidos Retenidos',
                action:'pedidosretenidos'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Pedidos Fijos',
                action:'pedidosfijos'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombresId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: '',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarnotaventa',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Pedidos',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
