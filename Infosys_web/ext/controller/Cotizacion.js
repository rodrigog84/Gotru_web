Ext.define('Ferrital_web.controller.Cotizacion', {
    extend: 'Ext.app.Controller',

    stores: ['Cotizaciones', 'Clientes', 'cotizacion.Items'],

    models: ['Cotizacion', 'cotizacion.Item'],

    views: [
        'cotizaciones.Ingresar',
        'cotizaciones.BusquedaCliente',
        'cotizaciones.Principal',
        'cotizaciones.BuscarProductos',
    ],

    refs: [{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'cotizacioningresar',
        selector: 'cotizacioningresar'
    },{
        ref: 'busquedacliente',
        selector: 'busquedacliente'
    },{
        ref: 'cotizacionprincipal',
        selector: 'cotizacionprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'buscarproductos',
        selector: 'buscarproductos'
    }


    ],

    init: function() {

        this.control({
        	'cotizacioningresar button[action=grabar]': {
        		click: this.grabar
        	},
            'cotizacioningresar button[action=wbuscarcliente]': {
                click: this.wbuscarcliente
            },
            'cotizacioningresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'busquedacliente button[action=buscarclientes]': {
                click: this.buscarclientes
            },
            'busquedacliente button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'cotizacioningresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'cotizacioningresar #productoId': {
                select: this.selectItem
            },
            'cotizacioningresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'cotizacioningresar #finaldescuentoId': {
                change: this.changedctofinal
            },
            'cotizacionprincipal button[action=agregarcotizacion]': {
                click: this.agregarcotizacion
            },
            'cotizacionprincipal button[action=exportarcotizacion]': {
                click: this.exportarcotizacion
            },
            'topmenus menuitem[action=mcotizacion]': {
                click: this.mcotizacion
            },
            'buscarproductos button[action=seleccionarproductos3]': {
                click: this.seleccionarproductos3
            },
            'cotizacionprincipal button[action=cerrarcotizacion]': {
                click: this.cerrarcerrarcotizacion
            },


        });
    },

    cerrarcerrarcotizacion: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    seleccionarproductos3: function(){

        var view = this.getBuscarproductos();
        var viewIngresa = this.getCotizacioningresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscarproductos: function(){

        Ext.create('Ferrital_web.view.cotizaciones.BuscarProductos').show();
    },

    mcotizacion: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'cotizacionprincipal'});
    },

    exportarcotizacion: function(){
        var view = this.getCotizacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            //window.location = preurl +'cotizaciones/exportPDF/?idcotizacion=' + row.data.id; 
            window.open(preurl +'cotizaciones/exportPDF/?idcotizacion=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarcotizacion: function(){
        Ext.create('Ferrital_web.view.cotizaciones.Ingresar').show();
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },
    recalcularFinal: function(){
        var view = this.getCotizacioningresar();
        var stItem = this.getCotizacionItemsStore();
        var pretotal = 0;
        var total = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + r.data.total
        });
        pretotalfinal = (pretotal * dcto)  / 100;
        total = pretotal - pretotalfinal;
        neto = (total / 1.19);
        iva = (total - neto);
        total = (neto + iva);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));        view.down('#finaltotalpostId').setValue(total);
        view.down('#finalpretotalId').setValue(Ext.util.Format.number(neto, '0,000'));
        view.down('#finalpretotalnId').setValue(neto);
        view.down('#finaltotalpostId').setValue(total);
        view.down('#ivaId').setValue(Ext.util.Format.number(iva, '0,000'));
        view.down('#ivadId').setValue(iva);

          
    },

    eliminaritem: function() {
        var view = this.getCotizacioningresar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        this.recalcularFinal();
    },

    selectItem: function() {
        var view = this.getCotizacioningresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;

        view.down('#precioId').setValue(record.p_venta);
        view.down('#cantidadOriginalId').setValue(record.stock);
    },
    
    agregarItem: function() {
        var view = this.getCotizacioningresar();
        var stItem = this.getCotizacionItemsStore();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        var cantidad = view.down('#cantidadId').getValue();
        var dcto = view.down('#descuentoId').getValue(); 
        var pretotal = ((cantidad * view.down('#precioId').getValue()) * dcto) / 100;
        var total = (cantidad * view.down('#precioId').getValue()) - pretotal
        var exists = 0;
        
        stItem.each(function(r){
            if(r.data.id == record.id){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                return; 
            }
        });
        if(exists == 1)
            return;

        stItem.add(new Ferrital_web.model.cotizacion.Item({
            id: record.id,
            nombre: record.nombre,
            horas: record.horas,
            precio_base: view.down('#precioId').getValue(),
            cantidad: cantidad,
            total: total,
            dcto: pretotal,
            descuentoprct: dcto
        }));
        this.recalcularFinal();
    },
    
    seleccionarcliente: function() {
        var viewIngresa = this.getCotizacioningresar();
        var view = this.getBusquedacliente();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#idcliente').setValue(row.data.id);
            viewIngresa.down('#nombreId').setValue(row.data.nombres);
            viewIngresa.down('#giroId').setValue(row.data.giro);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },
    buscarclientes: function() {
        var view = this.getBusquedacliente()
        var st = this.getClientesStore()
        var nombre = view.down('#bclientenombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    wbuscarcliente: function() {
        Ext.create('Ferrital_web.view.cotizaciones.BusquedaCliente').show();
    },

    grabar: function() {

        var viewIngresa = this.getCotizacioningresar();
        var view = this.getBusquedacliente();
        var idcliente = viewIngresa.down('#idcliente').getValue();
        var stItem = this.getCotizacionItemsStore();
        var stCotiz = this.getCotizacionesStore();
        var contacto = viewIngresa.down('#nombre_contactoId').getValue();
        var mail = viewIngresa.down('#mail_contactoId').getValue();
        var telefono = viewIngresa.down('#fono_contactoId').getValue();

        if (!idcliente){

            Ext.Msg.alert('Ingrese Datos de Cliente');
            return;
        };

        if (!contacto){

            Ext.Msg.alert('Ingrese Nombre Contacto');
            return;
        };

        if (!mail){

            Ext.Msg.alert('Ingrese Correo Electronico de Contacto');
            return;
        };

        if (!telefono){

            Ext.Msg.alert('Ingrese Telefono de Contacto');
            return;
        };

        var datacliente = {
            contacto: contacto,
            mail: mail,
            telefono: telefono
            
        };

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'cotizaciones/save',
            params: {
                idcliente: idcliente,
                datacliente: Ext.JSON.encode(datacliente),
                items: Ext.JSON.encode(dataItems),
                subtotal: viewIngresa.down('#finalpretotalnId').getValue(),
                iva: viewIngresa.down('#ivadId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                viewIngresa.close();
                stCotiz.load();
            }
        });

    }
});










