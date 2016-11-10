Ext.define('Infosys_web.view.pedidos_caja.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pedidoscajaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Nota Pedido',
    store: 'Pedidos_caja',
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
            if (value == 1) {
                return 'FIJO';
             };
            if (value == 2) {
             //return '<img src="http://localhost:999/rutaimg.jpg" />'
               return 'RETENIDO';   
            };
            if (value == 3) {
             //return '<img src="http://localhost:999/rutaimg.jpg" />'
               return 'NORMAL';   
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
        type: 'date',
        hidden: true
    },{
        header: "Fecha Elaboracion",
        flex: 1,
        dataIndex: 'fecha_elabora',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y')
    },{
        header: "Hora Despacho",
        flex: 1,
        dataIndex: 'hora_despacho',
        type: 'date',
        hidden: true
    },{
        header: "Rut",
        flex: 1,
        align: 'right',
        dataIndex: 'rut_cliente',
        hidden: true
    },{
        header: "Id_Cliente",
        flex: 1,
        align: 'right',
        dataIndex: 'id_cliente',
        hidden: true
    },{
        header: "Razon Social",
         width: 390,
        dataIndex: 'nombre_cliente'
    },{
        header: "Telefono",
        flex: 1,
        align: 'right',
        dataIndex: 'telefono'
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor',
        hidden: true
    },{
        header: "Cond Pago",
        flex: 1,
        dataIndex: 'id_pago',
        hidden: true
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
        header: "Abono",
        flex: 1,
        dataIndex: 'abono',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
        
    },{
        header: "Total Venta",
        flex: 1,
        dataIndex: 'total',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
        
    },{
        header: "Bodega",
        flex: 1,
        dataIndex: 'nom_bodega',
        hidden: true
    },{
        header: "Id Bodega",
        flex: 1,
        dataIndex: 'id_bodega',
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
                action: 'agregarpedidocaja',
                text : 'Genera Pedido'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarpedidoscaja',
                text : 'Editar / Agregar'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'exportarpedidoscaja'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelpedidoscaja'
            },'->',{
                xtype: 'combo',
                width: 130,
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'clientes.Selector'
            },{
                width: 140,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'BuscarPedidos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpedidoscaja',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'toolbar',
            dock: 'top',
            items: ['-',{
                xtype: 'combo',
                itemId: 'bodegaId',
                labelWidth: 60,
                width: 205,
                fieldCls: 'required',
                maxHeight: 25,
                fieldLabel: '<b>BODEGA</b>',
                forceSelection : true,
                name : 'id_bodega',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Bodegas'
            }],
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Pedidos_caja',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
