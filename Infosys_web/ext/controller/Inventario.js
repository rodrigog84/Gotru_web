Ext.define('Ferrital_web.controller.Inventario', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Inventari',
             'inventario.Items',
             'InventarioInicial',
             'Correlativos',
             'Productos',
             'Productosf',
             'Inventarios',
             'DesplegarInicial'
             ],

    models: ['Inventari',
             'Inventarios',
             'Inventario.Item',
             'Correlativo',
             'Inventariodesplegar'],

    views: ['inventario_inicial.Principal',
            'inventario_inicial.Ingresar',
            'inventario_inicial.Desplegar',
            'inventario_inicial.BuscarInventario',
            'inventario_inicial.BuscarProductos'

            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
            ref: 'inventarioprincipal',
            selector: 'inventarioprincipal'
        },{
            ref: 'inventario',
            selector: 'inventario'
        },{
            ref: 'topmenus',
            selector: 'topmenus'
        },{
            ref: 'panelprincipal',
            selector: 'panelprincipal'
        },{
            ref: 'buscarinventario',
            selector: 'buscarinventario'
        },{
            ref: 'desplegarinventario',
            selector: 'desplegarinventario'
        },{
            ref: 'buscarproductosinicial',
            selector: 'buscarproductosinicial'
        }




       

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'topmenus menuitem[action=minventario]': {
                click: this.minventario
            },
            'inventarioprincipal button[action=inventario]': {
                click: this.inventario
            },
            'inventario button[action=inventariograbar]': {
                click: this.inventariograbar
            },
            'inventarioprincipal button[action=inventariocerrar]': {
                click: this.inventariocerrar
            },
            'inventario button[action=agregarInventarioInicial]': {
                click: this.agregarInventarioInicial
            },
            'inventario button[action=grabarInventarioInicial]': {
                click: this.grabarInventarioInicial
            },
            'inventario button[action=eliminarInventarioInicial]': {
                click: this.eliminarInventarioInicial
            },
            'inventarioprincipal button[action=editarinventario]': {
                click: this.editarinventario
            },
            'desplegarinventario button[action=eliminardespliegaInventarioInicial]': {
                click: this.eliminardespliegaInventarioInicial
            },
            'desplegarinventario button[action=imprimeinventario]': {
                click: this.imprimeinventario
            },
            'inventarioprincipal button[action=exportarexcelinventario]': {
                click: this.exportarexcelinventario
            },
            'inventario button[action=buscarproductosinicial]': {
                click: this.buscarproductosinicial
            },
            'buscarproductosinicial button[action=seleccionarproductosiniical]': {
                click: this.seleccionarproductosiniical
            },
            'buscarproductosinicial button[action=buscar]': {
                click: this.buscar
            },

        });
    },

    buscar: function(){

        var view = this.getBuscarproductosinicial()
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    seleccionarproductosiniical: function(){

        var view = this.getBuscarproductosinicial();        
        var viewIngresa = this.getInventario();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }


      
       
    },

    buscarproductosinicial: function(){

        Ext.create('Ferrital_web.view.inventario_inicial.BuscarProductos').show();
    },

     exportarexcelinventario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getInventarioprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelInventario?cols='+Ext.JSON.encode(jsonCol));
 
    },

    imprimeinventario: function(){

        var view = this.getDesplegarinventario();
        var numinventario =  view.down('#num_inventarioId').getValue();
        window.open(preurl +'inventario/exportPDF/?inventario='+numinventario);
       
    },

    minventario: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'inventarioprincipal'});

    },

    editarinventario: function(){


       var view = this.getInventarioprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.inventario_inicial.Desplegar').show();
            edit.down('form').loadRecord(row);
            var view = this.getDesplegarinventario()
            var st = this.getDesplegarInicialStore()
            var nombre = view.down('#num_inventarioId').getValue()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },    

    buscarinventario: function(){
        var view = this.getInventarioprincipal()
        var st = this.getInventariStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
       
    
    },

    inventario: function(){

       Ext.create('Ferrital_web.view.inventario_inicial.Ingresar').show();

    },
    
    inventariograbar: function(){
        
    },

    inventariocerrar: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },

    eliminarInventarioInicial: function(){

        var view = this.getInventario();
        var grid  = view.down('#inventarioinicialId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    eliminardespliegaInventarioInicial: function(){

        var view = this.getDesplegarinventario();
        var grid  = view.down('#desplegarinicialId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var data = (row.data.id);
            console.log(data)
            Ext.Ajax.request({
                url: preurl + 'inventario/eliminada',
                params: {
                    data : data
                },

                success: function(response){
                    var text = response.responseText;
                    Ext.Msg.alert('Informacion', 'Eliminada Exitosamente.');
                    grid.getStore().remove(row);
            }

            
        });

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    grabarInventarioInicial: function(){

        var indice = 3;
        var viewIngresa = this.getInventario();
        var st = this.getInventariStore();
        var sat = this.getInventariosStore();
        var stItem = this.getInventarioInicialStore();
        var grid  = viewIngresa.down('#inventarioinicialId');
        var bodega =  viewIngresa.down('#tipobodegaId');
        var dataItems = new Array();
        var producto = this.getProductosStore();
        
        stItem.each(function(r){
            dataItems.push(r.data)
        });


        Ext.Ajax.request({
                url: preurl + 'inventario/save',
                params: {
                    indice : indice,
                    bodega : bodega,
                    items: Ext.JSON.encode(dataItems),
                },

                success: function(response){
                    var text = response.responseText;
                    Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                    producto.load();
                    viewIngresa.close();
                    st.load();
                    sat.load();
                }
        });
    },


    agregarInventarioInicial: function(){
        
        var view = this.getInventario()
        var st = view.down("#inventarioinicialId").getStore();
      
        if(!view.down("#cantidadId").getValue() || !view.down("#tipobodegaId").getValue() || !view.down("#productoId").getValue()){
            Ext.Msg.alert('Alerta', 'Selecciona los campos.');
            return;  
        }
        var exists = 0
        st.each(function(r){
            if(r.data.producto == view.down("#productoId").getValue()  && r.data.fecha == view.down("#fechaid").getSubmitValue() && r.data.bodega==view.down("#tipobodegaId").getValue() ){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                return; 
            }
        });
        if(exists == 1)
            return;

        st.add({
            n_bodega: view.down("#tipobodegaId").getRawValue(),
            n_producto: view.down("#productoId").getRawValue(),

            bodega: view.down("#tipobodegaId").getValue(),
            producto: view.down("#productoId").getValue(),

            cantidad: view.down("#cantidadId").getValue(),
            fecha: view.down("#fechaid").getSubmitValue()
        });

        st.sync();

        view.down("#tipobodegaId").setDisabled(true);
        view.down("#fechaid").setDisabled(true);
    },
  
});










