Ext.define('Ferrital_web.controller.Clientes', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Clientes',
            'Cod_activ',
            'Sucursales_clientes',
            'clientes.Clientes',
            'clientes.Selector'
             ],

    models: ['Cliente',
            'Sucursales_clientes'],

    views: ['clientes.Principal',
            'clientes.BusquedaClientes',
            'clientes.Ingresar',
            'clientes.Desplegar',
            'clientes.Validar',
            'clientes.Desplieguesucursales',
            'clientes.IngresarSucursales'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
        ref: 'clientesprincipal',
        selector: 'clientesprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
    
        ref: 'clientesingresar',
        selector: 'clientesingresar'
    },{
    
        ref: 'busquedaclientes',
        selector: 'busquedaclientes'
    },{
    
        ref: 'clientesdesplegar',
        selector: 'clientesdesplegar'
    },{
        ref: 'clientesvalidar',
        selector: 'clientesvalidar'
    },{
        ref: 'desplegarsucursales',
        selector: 'desplegarsucursales'
    },{
        ref: 'sucursalesingresarclientes',
        selector: 'sucursalesingresarclientes'
    }





    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'clientesprincipal button[action=validar]': {
                click: this.validar
            },
            'clientesvalidar button[action=validarut]': {
                click: this.validarut
            },

            'clientesprincipal button[action=buscarclientes]': {
                click: this.buscarclientes
            },
            
            'clientesprincipal button[action=exportarexcelclientes]': {
                click: this.exportarexcelclientes
            },
            'clientesprincipal button[action=filtroClientes]': {
                click: this.filtroClientes
            },
            'clientesingresar button[action=grabarclientes]': {
                click: this.grabarclientes
            },
            
           'clientesprincipal button[action=agregarclientes]': {
                click: this.agregarclientes
            },
            'clientesprincipal button[action=editarclientes]': {
                click: this.editarclientes
            },
            'clientesprincipal button[action=cerrarclientes]': {
                click: this.cerrarclientes
            },
            'clientesprincipal button[action=despliegasucursales]': {
                click: this.despliegasucursales
            },  
            'clientesdesplegar button[action=desplegarclientes]': {
                click: this.desplegarclientes
            },  
            'sucursalesingresarclientes button[action=grabarsucursales]': {
                click: this.grabarsucursales
            },  
            'desplegarsucursales button[action=agregaSucursalesclientes]': {
                click: this.agregaSucursalesclientes
            }
        });
    },

    agregaSucursalesclientes : function(){

        var edit = Ext.create('Ferrital_web.view.clientes.IngresarSucursales').show();
        edit.close()
        var view = this.getDesplegarsucursales();
        var idCliente = view.down('#id_clienteID').getValue();
        var viewedit = Ext.create('Ferrital_web.view.clientes.IngresarSucursales').show();
        viewedit.down("#id_clienteID").setValue(idCliente);

    },

    grabarsucursales : function(){

        var viewIngresa = this.getSucursalesingresarclientes();
        var idcliente = viewIngresa.down('#id_clienteID').getValue();
        var direccion = viewIngresa.down('#direccionId').getValue();
        var ciudad = viewIngresa.down('#tipoCiudadId').getValue();
        var comuna = viewIngresa.down('#tipoComunaId').getValue();
        var email = viewIngresa.down('#emailId').getValue();
        var contacto = viewIngresa.down('#contactoId').getValue();
        var fono = viewIngresa.down('#fonoId').getValue();

        Ext.Ajax.request({
            url: preurl + 'sucursales_clientes/save',
            params: {
                idcliente: idcliente,
                direccion: direccion,
                ciudad: ciudad,
                comuna: comuna,
                email: email,
                contacto: contacto,
                fono: fono
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                viewIngresa.close();
               
            }
        });

        var edit = this.getDesplegarsucursales();
        edit.close();

       
    
    },
    
    despliegasucursales: function(){
        
        var view = this.getClientesprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.clientes.Desplieguesucursales').show();
            var nombre = (row.get('id'));
            var razon = (row.get('nombres'));
            edit.down("#id_clienteID").setValue(nombre);
            edit.down("#nombreId").setValue(razon);
            var st = this.getSucursales_clientesStore();
            st.proxy.extraParams = {nombre : nombre};
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    validar: function(){
        
    Ext.create('Ferrital_web.view.clientes.Validar').show();

    },

    validarut: function(){

        var view =this.getClientesvalidar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

        if(numero == 9){
                var1 = rut.substr(0,2);
                var2 = rut.substr(2,3);
                var3 = rut.substr(4,3);
                var4 = rut.substr(6,3);
                var5 = rut.substr(8,1);
                rutdes = var1 + "." +var2 + "." + var3 + "." + var4 + "-" + var5;
                
        }
       
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

                if (resp.success == true) {
                    
                    
                    var edit = Ext.create('Ferrital_web.view.clientes.Ingresar').show();
                    if(resp.cliente){
                        var cliente = resp.cliente;

                        edit.down("#id_cliente").setValue(cliente.id)
                        edit.down("#nombre_id").setValue(cliente.nombres)
                        edit.down("#tipoCiudadId").setValue(cliente.nombre_ciudad)
                        edit.down("#tipoComunaId").setValue(cliente.nombre_comuna)
                        edit.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        edit.down("#fonoId").setValue(cliente.fono)
                        edit.down("#giroId").setValue(cliente.id_giro)
                        edit.down("#descuentoId").setValue(cliente.descuento)
                        edit.down("#direccionId").setValue(cliente.direccion)
                        edit.down("#e_mailId").setValue(cliente.e_mail)
                        edit.down("#fecha_incripcionId").setValue(cliente.fecha_incripcion)
                        edit.down("#fecha_ult_actualizId").setValue(cliente.fecha_ult_actualiz)
                        edit.down("#tipopagoId").setValue(cliente.id_pago)
                        edit.down("#tipoEstadoId").setValue(cliente.estado)
                        edit.down("#rutId").setValue(rutdes)
                        //edit.down("#disponibleId").setValue(cupo_disponible)
                        edit.down("#impuestoId").setValue(imp_adicional)
                    }else{
                        edit.down("#rutId").setValue(rut)
                    }
                    
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      return false
                }

                view.close()
            }

        });       
      
    },

    exportarexcelclientes: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getClientesprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelClientes?cols='+Ext.JSON.encode(jsonCol));
 
    },

    buscarclientes: function(){
        
        var view = this.getClientesprincipal()
        var st = this.getClientesStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    
    grabarclientes: function(){
        var win    = this.getClientesingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

             
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }


        var st = this.getClientesStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Ferrital_web.model.Cliente');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync({
            success: function(){
                st.load();
            }
        }

        );
    },

    desplegarclientes: function(){

        var view = this.getClientesdesplegar();
        var rut = view.down('#rutId').getValue();
        var nombre = view.down('#nombre_id').getValue();
        var idcliente = view.down('#id_cliente').getValue();
        var direccion = view.down('#direccionId').getValue();
        var ciudad = view.down('#tipoCiudadId').getValue();
        var comuna = view.down('#tipoComunaId').getValue();
        var giro = view.down('#giroId').getValue();
        var fono = view.down('#fonoId').getValue();
        var mail = view.down('#e_mailId').getValue();
        var vendedor = view.down('#tipoVendedorId').getValue();
        var descuento = view.down('#descuentoId').getValue();
        var tipopago = view.down('#tipopagoId').getValue();
        var disponible = view.down('#disponibleId').getValue();
        var impuesto = view.down('#impuestoId').getValue();
        var fechaincorporacion = view.down('#fecha_incripcionId').getValue();
        var fechaactualiza = view.down('#fecha_ult_actualizId').getValue();
        var estado = view.down('#tipoEstadoId').getValue();
        var tipocliente = view.down('#tipoClienteId').getValue();
        var st = this.getClientesStore();

         Ext.Ajax.request({
            url: preurl + 'clientes/update',
            params: {
                rut: rut,
                nombre: nombre,
                idcliente: idcliente,
                direccion: direccion,
                ciudad: ciudad,
                comuna: comuna,
                giro : giro,
                fono : fono,
                mail : mail,
                vendedor : vendedor,
                descuento: descuento,
                tipopago: tipopago,
                disponible: disponible,
                impuesto: impuesto,
                fechaincorporacion : fechaincorporacion,
                fechaactualiza : fechaactualiza,
                estado : estado,
                tipocliente : tipocliente
            },
             success: function(response){
                view.close();
                st.load();

            }
           
        });

    },
        
    editarclientes: function(){
        
        var view = this.getClientesprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.clientes.Desplegar').show();
            edit.down('form').loadRecord(row);
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarclientes: function(){
        Ext.create('Ferrital_web.view.clientes.Ingresar').show();
    },

    cerrarclientes: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










