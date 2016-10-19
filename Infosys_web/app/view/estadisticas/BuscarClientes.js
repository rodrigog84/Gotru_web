Ext.define('Infosys_web.view.estadisticas.BuscarClientes' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarclientesestadisticas',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Clientes',
    layout: 'fit',
    autoShow: true,
    width: 680,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
    var me = this
    this.items = {
        xtype: 'grid',
        iconCls: 'icon-grid',

        title : 'Clientes',
        store: 'Clientes',
        autoHeight: true,
        viewConfig: {
            forceFit: true,
            /*listeners: {
                itemdblclick: function(dataview, r, item, index, e) {
                    console.log(dataview);
                    console.log(r);
                    console.log(item);
                    console.log(index);
                    console.log(e);
                    var win =this.up('buscarclientesestadisticas')
                    record.set({cliente: parseInt(r.get('id'))})
                    Ext.Ajax.request({
                       url: preurl + 'cuentacorriente/getCuentaCorriente/' + r.get('id') ,
                       success: function(response, opts) {
                          var obj = Ext.decode(response.responseText);
                          record.set({saldo: obj.data[0].saldo});  
                       },
                       failure: function(response, opts) {
                          console.log('server-side failure with status code ' + response.status);
                       }
                    })
                    win.close()
                }
            } */           

        },
    columns: [{
    header: "Razon Social",
    width: 390,
    dataIndex: 'nombres'        
    },{
        header: "Sigla",
        flex: 1,
        dataIndex: 'sigla'
        
    },{
        header: "Rut",
        flex: 1,
        itemId: 'rutId',
        dataIndex: 'rut'
    }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            ,'->',{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'clientes.Selector'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscar',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarclienteest',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Clientes',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
