Ext.define('Ferrital_web.controller.Ordencompra', {
    extend: 'Ext.app.Controller',

    stores: ['Orden_compra', 'Proveedores', 'ordencompra.Items',
              'Recepcion', 'Orden_compradetalle', 
              'Ordencomprarecepcion',
              'Ordencompraforzada',
              'Contacto_clientes',
              'Orden_compradetallerec',
              'estados'],

    models: ['Orden_compra', 'ordencompra.Item'],

    views: [
        'ordencompra.Ingresar',
        'ordencompra.Recepcionforzada',
        'ordencompra.BusquedaProveedor',
        'ordencompra.Principal',
        'ordencompra.Principal_recepcion',
        'ordencompra.Principal_forzada',
        'TopMenus',
        'ordencompra.BuscarProductos',
        'ordencompra.Buscarcontactos'
    ],

    refs: [{
        ref: 'ordencompraingresar',
        selector: 'ordencompraingresar'
    },{
        ref: 'busquedaproveedor',
        selector: 'busquedaproveedor'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'ordencompraprincipal',
        selector: 'ordencompraprincipal'
    },{
        ref: 'ordencompraprincipalrecepcion',
        selector: 'ordencompraprincipalrecepcion'
    },{
        ref: 'ordencomprarecepcion',
        selector: 'ordencomprarecepcion'
    },{
        ref: 'ordencomprarecepcionfinal',
        selector: 'ordencomprarecepcionfinal'
    },{
        ref: 'buscarproductos',
        selector: 'buscarproductos'
    },{
        ref: 'formularioexportar',
        selector: 'formularioexportar'
    },{
        ref: 'ordencompraprincipalforzada',
        selector: 'ordencompraprincipalforzada'
    },{
        ref: 'ordencomprarecepcionforzada',
        selector: 'ordencomprarecepcionforzada'
    },{
        ref: 'buscarcontactos',
        selector: 'buscarcontactos'
    }



 
    ],

    init: function() {

        this.control({
        	'ordencompraingresar button[action=grabar]': {
        		click: this.grabar
        	},
            'ordencompraingresar button[action=wbuscarproveedor]': {
                click: this.wbuscarproveedor
            },
            'busquedaproveedor button[action=buscarproveedor]': {
                click: this.buscarproveedor
            },
            'busquedaproveedor button[action=seleccionarproveedor]': {
                click: this.seleccionarproveedor
            },
            'ordencompraingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'ordencompraingresar #productoId': {
                select: this.selectItem
            },
            'ordencompraingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'ordencompraingresar #finaldescuentoId': {
                change: this.changedctofinal
            },
            'ordencompraingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'ordencompraprincipal button[action=agregarordencompra]': {
                click: this.agregarordencompra
            },
            'ordencompraprincipal button[action=recepcionarordencompra]': {
                click: this.recepcionarordencompra
            },
            'ordencompraprincipal button[action=recepcionforzada]': {
                click: this.recepcionforzada
            },
            'ordencompraprincipalrecepcion button[action=recepcionarordencompradef]': {
                click: this.recepcionarordencompradef
            },

            'ordencompraprincipal button[action=exportarordencompra]': {
                click: this.exportarordencompra
            },
            'topmenus menuitem[action=mordencompra]': {
                click: this.mordencompra
            },
            'topmenus menuitem[action=mordencomprarec]': {
                click: this.mordencomprarec
            },
            'topmenus menuitem[action=mordencomprafor]': {
                click: this.mordencomprafor
            },

            'ordencomprarecepcion button[action=grabarrecepcion]': {
                click: this.grabarrecepcion
            },
            'ordencomprarecepcionforzada button[action=grabarrecepcionforzada]': {
                click: this.grabarrecepcionforzada
            },
            'ordencomprarecepcionfinal button[action=grabarrecepcionfinal]': {
                click: this.grabarrecepcionfinal
            },
            'buscarproductos button[action=seleccionarproductos2]': {
                click: this.seleccionarproductos2
            },
            'ordencompraprincipalrecepcion button[action=exportarordencomprarecepcion]': {
                click: this.exportarordencomprarecepcion
            },
            'formularioexportar button[action=exportarExcelrecepcion]': {
                click: this.exportarExcelrecepcion
            },
            'ordencompraprincipal button[action=cerrarordendecompra]': {
                click: this.cerrarordendecompra
            },
            'ordencompraprincipalrecepcion button[action=cerrarordendecompra]': {
                click: this.cerrarordendecompra
            },
            'ordencompraprincipalforzada button[action=cerrarordendecompraforzada]': {
                click: this.cerrarordendecompraforzada
            },
            'ordencompraprincipalrecepcion button[action=generapdf]': {
                click: this.generapdf
            },
             'ordencompraingresar button[action=buscarcontactos]': {
                click: this.buscarcontactos
            },
             'buscarcontactos button[action=seleccionarcontactos]': {
                click: this.seleccionarcontactos
            },




        });
    },

    grabarrecepcionforzada: function(){

        var view = this.getOrdencomprarecepcionforzada();
        var id = view.down('#Id').getValue();
        var stOrden = this.getOrden_compraStore();
        var stforzada = this.getOrdencompraforzadaStore();
               
        Ext.Ajax.request({
            url: preurl + 'ordencompra/updateforzada',
            params: {
                id: id,               
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Grabada Exitosamente.');
                stOrden.load();
                stforzada.load();
                view.close();
            }
        });

    },

    generapdf: function(){

        var view = this.getOrdencompraprincipalrecepcion();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'ordencompra/exportPDF/?idordencompra=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        

    },

    cerrarordendecompra: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    cerrarordendecompraforzada: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    exportarExcelrecepcion: function(){

        var view =this.getFormularioexportar()
        var idestado = view.down('#estadosId').getValue()
        if (!idestado){

             Ext.Msg.alert('Alerta', 'Selecciona un Estado.');
            return;
        }
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getOrdencompraprincipalrecepcion()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })  
        
        window.open(preurl + 'adminServicesExcel/exportarExcelordenrecepcion?estado='+idestado+'&cols='+Ext.JSON.encode(jsonCol));   
        view.close();                 
        },



    exportarordencomprarecepcion: function(){
        Ext.create('Ferrital_web.view.ordencompra.Exportar').show();
    },

    buscarproductos: function(){

        Ext.create('Ferrital_web.view.ordencompra.BuscarProductos').show();
    },

    buscarcontactos: function(){

        var view = this.getOrdencompraingresar();
        var idCliente = view.down('#idproveedor').getValue();

      if (idCliente){
         var edit = Ext.create('Ferrital_web.view.ordencompra.Buscarcontactos').show();
          var st = this.getContacto_clientesStore();
          st.proxy.extraParams = {nombre : idCliente};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Proveedor.');
            return;
       }
        
    },

    seleccionarcontactos: function(){

        var view = this.getBuscarcontactos();
        var viewIngresa = this.getOrdencompraingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#nombre_contactoId').setValue(row.data.nombre);
            viewIngresa.down('#fono_contactoId').setValue(row.data.fono);
            viewIngresa.down('#mail_contactoId').setValue(row.data.email);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }       
       
    },

    seleccionarproductos2: function(){

        var view = this.getBuscarproductos();        
        var viewIngresa = this.getOrdencompraingresar();
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

    grabarrecepcion: function(){

        var view = this.getOrdencomprarecepcion();
        var id = view.down('#Id').getValue();
        var idbodega = view.down('#bodegaId').getValue();
        var numero = view.down('#numeroId').getValue();
        var recepcion = view.down('#recepcionId').getValue();
        var fecha = view.down('#fechaordenId').getValue();

        if (!idbodega){

             Ext.Msg.alert('Debe Ingresar Bodega');
             return;
            

        };

        if (!recepcion){

             Ext.Msg.alert('Debe Ingresar Docuemnto Recepcion');
             return;
            

        };

        var stOrden = this.getOrden_compraStore();
        var stItem = this.getOrden_compradetalleStore();
      
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data);
            cant = (r.data.stock)
        });

         if (!cant){
             Ext.Msg.alert('Recepcione producto');
             return;
        };

       
        Ext.Ajax.request({
            url: preurl + 'ordencompra/update',
            params: {
                items: Ext.JSON.encode(dataItems),
                id: id,
                idbodega: idbodega,
                numero: numero,
                fecha: fecha
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Grabada Exitosamente.');
                stOrden.load();
                view.close();
            }
        });

    },

    grabarrecepcionfinal: function(){

        var view = this.getordencomprarecepcionfinal();
        var id = view.down('#Id').getValue();
        var idbodega = view.down('#bodegaId').getValue();
        var numero = view.down('#numeroId').getValue();
        var recepcion = view.down('#recepcionId').getValue();
        var fecha = view.down('#fechaordenId').getValue();

        if (!idbodega){

             Ext.Msg.alert('Debe Ingresar Bodega');
             return;
            

        };

        if (!recepcion){

             Ext.Msg.alert('Debe Ingresar Docuemnto Recepcion');
             return;
            

        };

        var stOrden = this.getOrden_compraStore();
        var stItem = this.getOrden_compradetalleStore();
      
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data);
            cant = (r.data.stock)
        });

         if (!cant){
             Ext.Msg.alert('Recepcione producto');
             return;
        };

        Ext.Ajax.request({
            url: preurl + 'ordencompra/update',
            params: {
                items: Ext.JSON.encode(dataItems),
                id: id,
                idbodega: idbodega,
                numero: numero,
                fecha: fecha
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Grabada Exitosamente.');
                stOrden.load();
                view.close();
            }
        });

    },

    mordencompra: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'ordencompraprincipal'});
    },

    mordencomprarec: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'ordencompraprincipalrecepcion'});
    },

     mordencomprafor: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'ordencompraprincipalforzada'});
    },

    exportarordencompra: function(){
        var view = this.getOrdencompraprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            console.log(row.data.id);
            window.open(preurl +'ordencompra/exportPDF/?idordencompra=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarordencompra: function(){
        Ext.create('Ferrital_web.view.ordencompra.Ingresar').show();
    },

    recepcionarordencompra: function(){

        var view = this.getOrdencompraprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.ordencompra.Recepcion').show();
            var nombre = (row.get('id'));
            console.log(nombre)
            edit.down('form').loadRecord(row);
            var st = this.getOrden_compradetalleStore()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        };
        
    },

    recepcionforzada: function(){

        var view = this.getOrdencompraprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.ordencompra.Recepcionforzada').show();
            var nombre = (row.get('id'));
            edit.down('form').loadRecord(row);
            var st = this.getOrden_compradetalleStore()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        };
        
    },

    recepcionarordencompradef: function(){

        var view = this.getOrdencompraprincipalrecepcion();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var nombre = (row.get('id'));
            var cumplida = (row.get('cumplida'));
            if (cumplida=="SI"){

            Ext.Msg.alert('Alerta', 'Orden de Compra Recepcionada');
            return;
                

            }else{

                var edit = Ext.create('Ferrital_web.view.ordencompra.Recepcionfinal').show();
                edit.down('form').loadRecord(row);
                var st = this.getOrden_compradetallerecStore()
                st.proxy.extraParams = {nombre : nombre}
                st.load();
           

            };
           
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        };
        
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },
    recalcularFinal: function(){
        var view = this.getOrdencompraingresar();
        var stItem = this.getOrdencompraItemsStore();
        var pretotal = 0;
        var total = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + r.data.totaliva
        });
        pretotalfinal = (pretotal * dcto)  / 100;
        total = pretotal - pretotalfinal;
        neto = (total / 1.19);
        iva = (total - neto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));        view.down('#finaltotalpostId').setValue(total);
        view.down('#finalpretotalId').setValue(Ext.util.Format.number(neto, '0,000'));
        view.down('#finalpretotalnId').setValue(pretotal);
        view.down('#ivaId').setValue(Ext.util.Format.number(iva, '0,000'));
        
          
    },

    eliminaritem: function() {
        var view = this.getOrdencompraingresar();
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

        var view = this.getOrdencompraingresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;

        view.down('#precioId').setValue(record.p_venta);
    },

    agregarItem: function() {

        var view = this.getOrdencompraingresar();
        var stItem = this.getOrdencompraItemsStore();
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

        stItem.add(new Ferrital_web.model.ordencompra.Item({
            id: record.id,
            nombre: record.nombre,
            horas: record.horas,
            precio_base: view.down('#precioId').getValue(),
            cantidad: cantidad,
            total: total,
            totaliva: (total * config_iva / 100) + total,
            dcto: pretotal,
            descuentoprct: dcto
        }));
        this.recalcularFinal();
    },

    seleccionarproveedor: function() {

        var viewIngresa = this.getOrdencompraingresar();
        var view = this.getBusquedaproveedor();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#idproveedor').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#nom_giroId').setValue(row.data.giro);
            viewIngresa.down('#giroId').setValue(row.data.id_giro);
            viewIngresa.down('#mail_contactoId').setValue(row.data.e_mail_contacto);
            viewIngresa.down('#nombre_contactoId').setValue(row.data.nombre_contacto);
            viewIngresa.down('#nombreId').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#fono_contactoId').setValue(row.data.fono_contacto);
            viewIngresa.down('#fonoId').setValue(row.data.fono);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    buscarproveedor: function() {
        var view = this.getBusquedaproveedor();
        var st = this.getProveedoresStore()
        var nombre = view.down('#bproveedornombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    wbuscarproveedor: function() {
        Ext.create('Ferrital_web.view.ordencompra.BusquedaProveedor').show();
    },

    grabar: function() {
        var view = this.getOrdencompraingresar();
        var idproveedor = view.down('#idproveedor').getValue();


        var total1 = view.down('#finaltotalpostId').getValue();
        var total2 = view.down('#finalpretotalnId').getValue();
       
        var stItem = this.getOrdencompraItemsStore();
        var stCotiz = this.getOrden_compraStore();

        var dataproveedor = {
            mail_contacto: view.down('#mail_contactoId').getValue(),
            nombre_contacto: view.down('#nombre_contactoId').getValue(),
            telefono_contacto: view.down('#fono_contactoId').getValue(),
        };

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'ordencompra/save',
            params: {
                idproveedor: idproveedor,
                dataproveedor: Ext.JSON.encode(dataproveedor),
                items: Ext.JSON.encode(dataItems),
                fpretotal: view.down('#finalpretotalnId').getValue(),
                fdcto: total2 - total1,
                ftotal: view.down('#finaltotalpostId').getValue()
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                view.close();
                stCotiz.load();
            }
        });

    }
});










