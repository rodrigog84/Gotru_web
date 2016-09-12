Ext.define('Ferrital_web.controller.Facturacion', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['productos.Items',
             'facturas.Items',
             'Factura',
             'Clientes',
             'Productosf',
             'Tipo_documento',
             'Sucursales_clientes'],

    models: ['Facturas.Item',
             'Factura',
             'Tipo_documento',
             'Sucursales_clientes'],

    views: ['ventas.Ventas', 'ventas.Ejemplo','ventas.Facturas',
             'clientes.BuscarClientes','productos.BuscarProductos',
             'ventas.Principalfactura',
             'ventas.BuscarSucursales'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'facturasingresar',
        selector: 'facturasingresar'
    },{
        ref: 'ventasejemplo',
        selector: 'ventasejemplo'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'facturasprincipal',
        selector: 'facturasprincipal'
    },{
        ref: 'buscarclientes',
        selector: 'buscarclientes'
    },{
        ref: 'buscarproductos',
        selector: 'buscarproductos'
    },{
        ref: 'buscarsucursalesclientes',
        selector: 'buscarsucursalesclientes'
    }



 
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'facturasprincipal button[action=mfactura]': {
                click: this.mfactura
            },
           
            'topmenus menuitem[action=mejemplo]': {
                click: this.mejemplo
            },
            'facturasingresar button[action=buscarclientes]': {
                click: this.buscarclientes
            },
            'facturasingresar button[action=buscarsucursalfactura]': {
                click: this.buscarsucursalfactura
            },
            'facturasingresar button[action=buscarvendedor]': {
                click: this.buscarvendedor
            },
            'facturasingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'facturasingresar button[action=validarut]': {
                click: this.validarut
            },
            'facturasingresar button[action=grabarfactura]': {
                click: this.grabarfactura
            },
            'facturasprincipal button[action=cerrarfactura]': {
                click: this.cerrarfactura
            },
            'facturasprincipal button[action=generarfacturapdf]': {
                click: this.generarfacturapdf
            },
            'buscarclientes button[action=buscar]': {
                click: this.buscar
            },
            'buscarclientes button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarproductos button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductos button[action=buscar]': {
                click: this.buscarp
            },
            'facturasingresar #tipoDocumentoId': {
                select: this.selectItemdocuemento
            },
            'buscarsucursalesclientes button[action=seleccionarsucursalcliente]': {
                click: this.seleccionarsucursalcliente
            },
            'facturasingresar #tipocondpagoId': {
                select: this.selecttipocondpago
            },





        });
    },

     selecttipocondpago: function() {
        
        var view =this.getFacturasingresar();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
                

        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;
        
        Ext.Ajax.request({
            url: preurl + 'facturas/calculofechas',
            params: {
                dias: dias,
                fechafactura : fechafactura
            },
            success: function(response){
               var resp = Ext.JSON.decode(response.responseText);
               var fecha_final= resp.fecha_final;
               view.down("#fechavencId").setValue(fecha_final);
                           
            }
           
        });
       
            
    },

    seleccionarsucursalcliente: function(){

        var view = this.getBuscarsucursalesclientes();
        var viewIngresa = this.getFacturasingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_sucursalID').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#tipoCiudadId').setValue(row.data.nombre_ciudad);
            viewIngresa.down('#tipoComunaId').setValue(row.data.nombre_comuna);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscar: function(){

        var view = this.getBuscarclientes()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    buscarsucursalfactura: function(){

       var busca = this.getFacturasingresar()
       var nombre = busca.down('#id_cliente').getValue();
       console.log(nombre)
       if (nombre){
         var edit = Ext.create('Ferrital_web.view.ventas.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar ClienteS.');
            return;
       }
      
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientes();
        var viewIngresa = this.getFacturasingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#tipoCiudadId').setValue(row.data.nombre_ciudad);
            viewIngresa.down('#tipoComunaId').setValue(row.data.nombre_comuna);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#giroId').setValue(row.data.giro);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#tipocondpagoId').setValue(row.data.id_pago);
            view.close();
            var condicion = viewIngresa.down('#tipocondpagoId');
            var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
            var stCombo = condicion.getStore();
            var record = stCombo.findRecord('id', condicion.getValue()).data;
            dias = record.dias;
        
            Ext.Ajax.request({
                url: preurl + 'facturas/calculofechas',
                params: {
                    dias: dias,
                    fechafactura : fechafactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);
                   var fecha_final= resp.fecha_final;
                   viewIngresa.down("#fechavencId").setValue(fecha_final);
                               
            }
           
        });
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },
    

    generarfacturapdf: function(){
        var view = this.getFacturasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'facturas/exportPDF/?idfactura=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    
    grabarfactura: function() {

        var viewIngresa = this.getFacturasingresar();
        var tipo_documento = viewIngresa.down('#tipoDocumentoId');
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var idtipo= viewIngresa.down('#tipoDocumentoId').getValue();
        var idsucursal= viewIngresa.down('#id_sucursalID').getValue();
        var idcondventa= viewIngresa.down('#tipocondpagoId').getValue();
        var idfactura = viewIngresa.down('#idfactura').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getProductosItemsStore();
        var stFactura = this.getFacturaStore();

        if(vendedor==0  && tipo_documento.getValue() == 1){
            Ext.Msg.alert('Ingrese Datos del Vendedor');
            return;   
        }


        if(numfactura==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
            }

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'facturas/save',
            params: {
                idcliente: idcliente,
                idfactura: idfactura,
                idsucursal: idsucursal,
                idcondventa: idcondventa,
                idtipo:idtipo,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                numfactura : numfactura,
                fechafactura : fechafactura,
                fechavenc: fechavenc,
                tipodocumento : tipo_documento.getValue(),
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 stFactura.load();
                 window.open(preurl + 'facturas/exportPDF/?idfactura='+idfactura);

            }
           
        });

       
      
        
    },

    cerrarfactura: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    selectItemdocuemento: function() {
        
        var view =this.getFacturasingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var grid  = view.down('#itemsgridId');        

        var stCombo = tipo_documento.getStore();
        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        correlanue = record.correlativo;
        correlanue = (parseInt(correlanue)+1);
        view.down('#idfactura').setValue(record.id);
        view.down('#numfacturaId').setValue(correlanue);

        var bolDisabled = tipo_documento.getValue() == 1 ? false : true; // campos se habilitan sólo en factura

        if(bolDisabled == true){  // limpiar campos
           view.down('#rutId').setValue('19');
           this.validaboleta();
           
        }

        view.down('#rutId').setDisabled(bolDisabled);
        view.down('#buscarBtn').setDisabled(bolDisabled);
        view.down('#nombre_id').setDisabled(bolDisabled);
        view.down('#direccionId').setDisabled(bolDisabled);
        view.down('#giroId').setDisabled(bolDisabled);
        view.down('#tipoCiudadId').setDisabled(bolDisabled);
        view.down('#tipoComunaId').setDisabled(bolDisabled);
        view.down('#sucursalId').setDisabled(bolDisabled);
        view.down('#tipoVendedorId').setDisabled(bolDisabled);
        view.down('#tipocondpagoId').setDisabled(bolDisabled);
        grid.getStore().removeAll();  
        var controller = this.getController('Productos');
        controller.recalcularFinal();

    },

    validaboleta: function(){

        var view =this.getFacturasingresar();
        var rut = view.down('#rutId').getValue();
        
        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad)
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)
                        view.down("#tipocondpagoId").setValue(cliente.id_pago)
                        view.down("#rutId").setValue(rut)                       
                    }
                    
                }
            }

        });       
       
    },

    validarut: function(){

        var view =this.getFacturasingresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

        if(numero==0){
            var edit = Ext.create('Ferrital_web.view.clientes.BuscarClientes');            
                  
        }else{
       
        if(numero>9){            
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;            
        }else{
            if(numero>13){
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;   
            }
        }

        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad)
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)
                        view.down("#rutId").setValue(rut)                       
                    }else{
                         Ext.Msg.alert('Rut No Exite');
                         view.down("#rutId").setValue(cero); 
                        return;   
                    }
                    
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      view.down("#rutId").setValue(cero);
                      return;
                      
                }

                view.close();

            }

        });       
        }
    },
    
    mfactura: function(){

         Ext.create('Ferrital_web.view.ventas.Facturas').show();

     
    },

    mejemplo: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'facturasprincipal'});
    },

    buscarvendedor: function(){

        Ext.create('Ferrital_web.view.vendedores.BuscarVendedor').show();
    },

    buscarproductos: function(){

        Ext.create('Ferrital_web.view.productos.BuscarProductos').show();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductos();
        var viewIngresa = this.getFacturasingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

     buscarp: function(){
        var view = this.getBuscarproductos();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },
  
});










