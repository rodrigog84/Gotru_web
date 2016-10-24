Ext.define('Infosys_web.controller.Precios', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Precios',
             'precios.Items',
             'Precios2',
             'productos.Selector2',
             'Productosbusca'          
             ],

    models: ['Precios',
            'Precios.Item',
            'Precios2'
             ],

    views: ['precios.Principal',
            'precios.Subir',
            'precios.Ingreso',
            'precios.Eliminar',
            'precios.Editar'
            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'preciosprincipal',
        selector: 'preciosprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'subirprecios',
        selector: 'subirprecios'
    },{
        ref: 'preciosingresar',
        selector: 'preciosingresar'
    },{
        ref: 'buscarproductosprecios',
        selector: 'buscarproductosprecios'
    },{
        ref: 'eliminar',
        selector: 'eliminar'
    },{
        ref: 'precioseditar',
        selector: 'precioseditar'
    },{
        ref: 'buscarproductosprecios2',
        selector: 'buscarproductosprecios2'
    }
  
    ],
    
    init: function() {
    	
        this.control({

            'topmenus menuitem[action=mprecios]': {
                click: this.mprecios
            },
            'preciosprincipal button[action=cerrarprecios]': {
                click: this.cerrarprecios
            },
            'preciosprincipal button[action=editar]': {
                click: this.editar
            },
            'preciosprincipal button[action=ingresar]': {
                click: this.ingresar
            },
            'preciosingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'precioseditar button[action=agregarItem2]': {
                click: this.agregarItem2
            },
            'preciosingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'precioseditar button[action=eliminaritem2]': {
                click: this.eliminaritem2
            },
            'preciosingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'precioseditar button[action=buscarproductos2]': {
                click: this.buscarproductos2
            },
            'buscarproductosprecios button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductosprecios button[action=buscarproprecios]': {
                click: this.buscarproprecios
            },
            'buscarproductosprecios2 button[action=buscarproprecios2]': {
                click: this.buscarproprecios2
            },
            'buscarproductosprecios2 button[action=seleccionarproductos2]': {
                click: this.seleccionarproductos2
            },
            'preciosingresar button[action=grabaringreso]': {
                click: this.grabaringreso
            },
            'precioseditar button[action=grabareditar]': {
                click: this.grabareditar
            },
            'preciosprincipal button[action=actualizar]': {
                click: this.actualizar
            },
            'eliminar button[action=actualizarprecios]': {
                click: this.actualizarprecios
            },
            'eliminar button[action=salirprecios]': {
                click: this.salirprecios
            },
            'preciosprincipal button[action=exportarexcelproductos]': {
                click: this.exportarexcelproductos
            },
            'precioseditar button[action=exportarexcelproductos2]': {
                click: this.exportarexcelproductos2
            },
           'precioseditar button[action=actualizarproductos]': {
                click: this.recalcularprecios
            },


            
        });
    },

    buscarproprecios: function(){
          
        var viewIngresa = this.getBuscarproductosprecios();        
        var nombre = view.down('#nombreId').getValue();
        var idlista = view.down('#listaId').getValue();
        var opcion = view.down('#tipoSeleccionId').getValue();                
        
        var st = this.getProductosfStore()
        st.proxy.extraParams = {nombre: nombre,
                                opcion: opcion,
                                lista: idlista}
        st.load();
        
    },

    buscarproprecios2: function(){
          
        var viewIngresa = this.getBuscarproductosprecios2();        
        var nombre = viewIngresa.down('#nombreId').getValue();
        var idlista = viewIngresa.down('#listaId').getValue();
        var opcion = viewIngresa.down('#tipoSeleccionId').getValue();       
        var st = this.getProductosbuscaStore()
        st.proxy.extraParams = {nombre: nombre,
                                opcion: opcion,
                                lista: idlista}
        st.load();
        
    },

    buscarproductos: function(){

        var view = this.getPrecioseditar();
        console.log("llegamos")
        var viewedit = Ext.create('Infosys_web.view.precios.BuscarProductos').show();
        var idlista = view.down('#idId').getValue();
        viewedit.down('#listaId').setValue(idlista);            

    },

    buscarproprecios: function(){

        var view = this.getBuscarproductosprecios();
       
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    recalcularprecios: function(){

        var viewIngresa = this.getPrecioseditar();
        var bolEnable = true;
        viewIngresa.down('#actualizapId').setDisabled(bolEnable);
        viewIngresa.down('#grabarprecios').setDisabled(bolEnable);
        var margen = viewIngresa.down('#margenId').getValue();
        var idlista = viewIngresa.down('#idId').getValue();
        var stp = this.getPreciosStore();    
        
        
        Ext.Ajax.request({
            url: preurl + 'precios/actualiza',
            waitMsg: 'Actualizando...',
            params: {
                id: 1,
                margen: margen,
                idlista: idlista
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                
                    viewIngresa.close();
                    stp.load();                                
                    Ext.Msg.alert('Datos Actualizados Exitosamente');
                    return;              
                                   

                 }else{

                    st.load();
                    Ext.Msg.alert('Datos No Actualizados');
                    return;
                     
                 };
                
        }
        });

        var st = this.getPrecios2Store()
        st.proxy.extraParams = {nombre : idlista}
        st.load();
        stp.load();

        
    },

    exportarexcelproductos2: function(){
        
        var viewIngresa = this.getPrecioseditar();
        var numero = viewIngresa.down('#numeroId').getValue();
        var nombre = viewIngresa.down('#nombreId').getValue();        
        var fecha = viewIngresa.down('#fechaId').getValue();
        var margen = viewIngresa.down('#margenId').getValue();
        var id = viewIngresa.down('#idId').getValue(); 
                         
        window.open(preurl + 'adminServicesExcel/exportarExcellistaProductos2?id='+id);
 
    },

    exportarexcelproductos: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPreciosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcellistaProductos?cols='+Ext.JSON.encode(jsonCol));
 
    },


    salirprecios: function(){

        var view = this.getEliminar();
        var st = this.getPreciosStore();
        Ext.Ajax.request({
            url: preurl + 'precios/borrar',
            params: {

                id: 1
                
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {

                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Eliminados Exitosamente');
                    return; 
                                   

                 }else{

                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos No Actualizados');
                    return;
                     
                 };
                
        }
        });

    },


    actualizar: function(){

        Ext.create('Infosys_web.view.precios.Eliminar').show();
            
    },

    actualizarprecios: function() {

        var view = this.getEliminar();
        var st = this.getPreciosStore();
        Ext.Ajax.request({
            url: preurl + 'precios/actualiza',
            waitMsg: 'Actualizando...',
            params: {

                id: 1
                
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {

                    view.close();
                    st.load(); 
                    Ext.Msg.alert('Datos Actualizados Exitosamente');
                    return; 
                                   

                 }else{

                    view.close();
                    st.load();
                    Ext.Msg.alert('Datos No Actualizados');
                    return;
                     
                 };
                
        }
        });
        
              
    },

    grabareditar: function() {

        var viewIngresa = this.getPrecioseditar();
        var bolEnable = true;
        viewIngresa.down('#grabarprecios').setDisabled(bolEnable);
        var numero = viewIngresa.down('#numeroId').getValue();
        var nombre = viewIngresa.down('#nombreId').getValue();        
        var fecha = viewIngresa.down('#fechaId').getValue();
        var margen = viewIngresa.down('#margenId').getValue();
        var id = viewIngresa.down('#idId').getValue();
        
        var stItem = this.getPrecios2Store();
        var stPrecio = this.getPreciosStore();

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'precios/update',            
            params: {
                items: Ext.JSON.encode(dataItems),
                numero: numero,
                id: id,
                nombre: nombre,
                fecha : Ext.Date.format(fecha,'Y-m-d'),
                margen : margen
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                viewIngresa.close();
                stPrecio.load();
                
            }
           
        });        
    },

    grabaringreso: function() {

        var viewIngresa = this.getPreciosingresar();
        var bolEnable = true;
        viewIngresa.down('#grabarprecios').setDisabled(bolEnable);
        var numero = viewIngresa.down('#numeroId').getValue();
        var nombre = viewIngresa.down('#nombreId').getValue();        
        var fecha = viewIngresa.down('#fechaId').getValue();
        var margen = viewIngresa.down('#margenId').getValue();
        
        var stItem = this.getPreciosItemsStore();
        var stPrecio = this.getPreciosStore();

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'precios/save',            
            params: {
                items: Ext.JSON.encode(dataItems),
                numero: numero,
                nombre: nombre,
                fecha : Ext.Date.format(fecha,'Y-m-d'),
                margen : margen
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                viewIngresa.close();
                stPrecio.load();
                
            }
           
        });        
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosprecios();
        var viewIngresa = this.getPreciosingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#nomproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#valorOriginalId').setValue(row.data.p_venta);
            viewIngresa.down('#tipounimedidaId').setValue(row.data.id_uni_medida);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    seleccionarproductos2: function(){

        var view = this.getBuscarproductosprecios2();
        var viewIngresa = this.getPrecioseditar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#nomproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#valorOriginalId').setValue(row.data.p_venta);
            viewIngresa.down('#tipounimedidaId').setValue(row.data.id_uni_medida);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    

    buscarproductos2: function(){

        var view = this.getPrecioseditar();
        var viewedit = Ext.create('Infosys_web.view.precios.BuscarProductos2').show();
        var idlista = view.down('#idId').getValue();
        viewedit.down('#listaId').setValue(idlista);
        var stItem = this.getProductosbuscaStore();
        stItem.proxy.extraParams = {lista: idlista}
        stItem.load();

       
    },

    eliminaritem: function() {
        var view = this.getPreciosingresar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    eliminaritem2: function() {
        var view = this.getPrecioseditar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarItem: function() {

        var view = this.getPreciosingresar();
        var stItem = this.getPreciosItemsStore();
        var producto = view.down('#productoId').getValue();
        var nomproducto = view.down('#nomproductoId').getValue();
        var nombre = view.down('#nombreId').getValue();
        /*if(!nombre){
            Ext.Ajax.request({
                url: preurl + 'precios/verificar',            
                params: {
                    nombre: nombre
                },
                 success: function(response){
                    var resp = Ext.JSON.decode(response.responseText);
                     if (resp.success == true) {
                        Ext.Msg.alert('Alerta', 'Nombre de Liatdo Ya Existe');
                        return false;
                    }
                    
                }
               
            });
        }else{

            Ext.Msg.alert('Alerta', 'Ingrese Nombre de Listdo');
            return false;
            

        };*/

        var codigo = view.down('#codigoId').getValue();
        var margen = view.down('#margenId').getValue();
        var medida = view.down('#tipounimedidaId').getValue();        
        var precio_ori = view.down('#valorOriginalId').getValue();
        var precio_nue = view.down('#nuevovalorId').getValue();
        exists = 0;
        
        if(precio_nue==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        };

        if(!producto){
            Ext.Msg.alert('Alerta', 'Debe Selecionar Producto');
            return false;
        };

        if(!margen){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Margen');
            return false;
        };

        stItem.each(function(r){
        if(r.data.id == producto){
            Ext.Msg.alert('Alerta', 'El registro ya existe.');
            exists = 1;
            cero="";
            view.down('#codigoId').setValue(cero);
            view.down('#nomproductoId').setValue(cero);
            view.down('#productoId').setValue(cero);
            view.down('#nuevovalorId').setValue(cero);
            view.down('#valorOriginalId').setValue(cero);
            return; 
        }
        });

        if(exists == 1)
        return;
        stItem.add(new Infosys_web.model.Precios.Item({
            id: producto,
            id_producto: producto,
            codigo: codigo,
            nom_producto: nomproducto,
            id_medida: medida,
            porcentaje: margen,
            valor: precio_ori,
            valor_lista: precio_nue  
        }));

        cero="";
        view.down('#codigoId').setValue(cero);
        view.down('#nomproductoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nuevovalorId').setValue(cero);
        view.down('#valorOriginalId').setValue(cero);
        view.down("#buscarproc").focus();

        
    },

    agregarItem2: function() {

        var view = this.getPrecioseditar();
        var stItem = this.getPrecios2Store();
        var producto = view.down('#productoId').getValue();
        var nomproducto = view.down('#nomproductoId').getValue();
        var nombre = view.down('#nombreId').getValue();
        /*if(!nombre){
            Ext.Ajax.request({
                url: preurl + 'precios/verificar',            
                params: {
                    nombre: nombre
                },
                 success: function(response){
                    var resp = Ext.JSON.decode(response.responseText);
                     if (resp.success == true) {
                        Ext.Msg.alert('Alerta', 'Nombre de Liatdo Ya Existe');
                        return false;
                    }
                    
                }
               
            });
        }else{

            Ext.Msg.alert('Alerta', 'Ingrese Nombre de Listdo');
            return false;
            

        };*/

        var codigo = view.down('#codigoId').getValue();
        var margen = view.down('#margenId').getValue();
        var medida = view.down('#tipounimedidaId').getValue();        
        var precio_ori = view.down('#valorOriginalId').getValue();
        var precio_nue = view.down('#nuevovalorId').getValue();
        exists = 0;
        
        if(precio_nue==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        };

        if(!producto){
            Ext.Msg.alert('Alerta', 'Debe Selecionar Producto');
            return false;
        };

        if(!margen){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Margen');
            return false;
        };

        stItem.each(function(r){
        if(r.data.id == producto){
            Ext.Msg.alert('Alerta', 'El registro ya existe.');
            exists = 1;
            cero="";
            view.down('#codigoId').setValue(cero);
            view.down('#nomproductoId').setValue(cero);
            view.down('#productoId').setValue(cero);
            view.down('#nuevovalorId').setValue(cero);
            view.down('#valorOriginalId').setValue(cero);
            return; 
        }
        });

        if(exists == 1)
        return;
        stItem.add(new Infosys_web.model.Precios2({
            id: producto,
            id_producto: producto,
            codigo: codigo,
            nom_producto: nomproducto,
            id_medida: medida,
            porcentaje: margen,
            valor: precio_ori,
            valor_lista: precio_nue  
        }));

        cero="";
        view.down('#nomproductoId').setValue(cero);
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nuevovalorId').setValue(cero);
        view.down('#valorOriginalId').setValue(cero);
        view.down("#buscarproc").focus();

        
    },

    editar: function(){

        var view = this.getPreciosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var viewIngresa = Ext.create('Infosys_web.view.precios.Editar').show();  
            viewIngresa.down('#idId').setValue(row.data.id);
            viewIngresa.down('#numeroId').setValue(row.data.numero);
            viewIngresa.down('#nombreId').setValue(row.data.nombre);
            viewIngresa.down('#fechaId').setValue(row.data.fecha);
            viewIngresa.down('#margenId').setValue(row.data.margen);
            var st = this.getPrecios2Store()
            st.proxy.extraParams = {nombre : row.data.id}
            st.load();
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }         

    },

    ingresar: function(){

        nombre ="18";

        Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.precios.Ingreso').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#numeroId").setValue(correlanue);
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }
            }            
        });
        

    },

    subirexcel: function(){

        nombre ="17";

        Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.precios.Subir').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#numeroId").setValue(correlanue);
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });
        

    },

    Subir : function(){

          var view = this.getSubirprecios();
          var stPrecio = this.getPreciosStore();            
          var form = view.down('form').getForm();
            if(form.isValid()){
                form.submit({
                    url:preurl + 'precios/rescatar',
                    waitMsg: 'Cargando Excel...',
                    success: function(success) {
                        Ext.Msg.alert('Atención', 'Subio Correctamente');
                        view.close();
                        stPrecio.load();

                    }
                });
            }
    },    
    
    buscar: function(){

        var view = this.getBuscarclientesnotaventa();
        var st = this.getClientesStore();
        var rut = view.down('#rutId').getValue();
        var nombre = view.down('#nombreId').getValue();

        if (!rut){            
             var opcion = "Nombre";
        };
      
        if (!nombre){
            var opcion = "Rut";
            var nombre = view.down('#rutId').getValue();
        };

        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    mprecios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'preciosprincipal'});
    }, 
    
    cerrarprecios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










