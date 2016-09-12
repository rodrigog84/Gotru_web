Ext.define('Ferrital_web.controller.Preventa', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Preventa',
            'preventa.Items',
            'Productosf',
            'Correlativos',
            'Clientes'
             ],

    models: ['Preventa',
             'preventa.Item'],

    views: ['Preventa.Preventa','Preventa.Principal',
            'Preventa.BuscarClientes'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'preventaprincipal',
        selector: 'preventaprincipal'
    },{    
        ref: 'preventaingresar',
        selector: 'preventaingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'buscarclientespreventa',
        selector: 'buscarclientespreventa'
    },{
        ref: 'buscarproductospreventa',
        selector: 'buscarproductospreventa'
    }
    
    ],
    
    init: function() {
    	
        this.control({

            'preventaprincipal button[action=buscarpreventa]': {
                click: this.buscarpreventa
            },
            'preventaprincipal button[action=exportarexcelpreventa]': {
                click: this.exportarexcelpreventa
            },
            'topmenus menuitem[action=mpreventa]': {
                click: this.mpreventa
            },
            'preventaingresar button[action=grabarpreventa]': {
                click: this.grabarpreventa
            },
            'preventaprincipal button[action=agregarpreventa]': {
                click: this.agregarpreventa
            },
            'agregarpreventa button[action=editarpreventa]': {
                click: this.editarpreventa
            },
            'preventaprincipal button[action=cerrarpreventa]': {
                click: this.cerrarpreventa
            },
            'preventaingresar button[action=validarut]': {
                click: this.validarut
            },
            'buscarclientespreventa button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'preventaingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'buscarproductospreventa button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductospreventa button[action=buscar]': {
                click: this.buscarp
            },
            'buscarclientespreventa button[action=buscar]': {
                click: this.buscar
            },
            'preventaingresar button[action=grabarpreventa]': {
                click: this.grabarpreventa
            },
            'preventaingresar #productoId': {
                select: this.selectItem
            },
            'preventaingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'preventaingresar #finaldescuentoId': {
                change: this.changedctofinal
            },
            'preventaingresar #tipoDocumento2Id': {
                select: this.selectItemdocuemento
            },
            'preventaprincipal button[action=exportarpreventa]': {
                click: this.exportarpreventa
            },
            'preventaingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
        });
    },

    eliminaritem: function() {
        var view = this.getPreventaingresar();
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

    exportarpreventa: function(){
        var view = this.getPreventaprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'preventa/exportPDF/?idpreventa=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

     validaboleta: function(){

        var view =this.getPreventaingresar();
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
                        view.down("#rutId").setValue(rut)                       
                    }
                    
                }
            }

        });       
       
    },

    selectItemdocuemento: function() {
        
        var view =this.getPreventaingresar();
        var tipo_documento = view.down('#tipoDocumento2Id');
        var bolDisabled = tipo_documento.getValue() == 2 ? true : false; // campos se habilitan sólo en factura
        
        if(bolDisabled == true){  // limpiar campos
           view.down('#rutId').setValue('19');
           this.validaboleta();
           
        }

        view.down('#rutId').setDisabled(bolDisabled);
        view.down('#buscarBtn').setDisabled(bolDisabled);
        view.down('#nombre_id').setDisabled(bolDisabled);
    },

    exportarexcelpreventa: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPreventaprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelPreventa?cols='+Ext.JSON.encode(jsonCol));
 
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcularFinal: function(){

        var view = this.getPreventaingresar();
        var stItem = this.getPreventaItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + r.data.totaliva
            iva = iva + r.data.iva
            neto = neto + r.data.neto
        });
        pretotalfinal = ((pretotal * dcto)  / 100);
        total = ((pretotal) - parseInt(pretotalfinal));
        afecto = neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        //view.down('#finalpretotalId').setValue(Ext.util.Format.number(pretotal, '0,000'));
    },

    agregarItem: function() {

        var view = this.getPreventaingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getPreventaItemsStore();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var dcto = view.down('#descuentoId').getValue(); 
        var precio = ((view.down('#precioId').getValue()));
        var precioun = ((view.down('#precioId').getValue())/ 1.19);
        if (!dcto){
            
            descuento = 0;
           
        }else{

            var descuento = ((parseInt(cantidad * precio)) * parseInt(dcto)) / 100;
            
        }
        var neto = ((cantidad * precio) - descuento);
        var tot = ((cantidad * precio) - descuento);
        var neto = (parseInt(neto / 1.19));
        var exists = 0;
        var iva = (tot - neto );
        var totaliva = ((neto + iva ));

        
        if(producto.getValue() != null ){
            var record = stCombo.findRecord('id', producto.getValue()).data;
        }else{

            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;

        }

        if(precio==0){

            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
            

        }

        if(cantidad>cantidadori){

            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
            return false;
            

        }

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }

        
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
           
        }

        stItem.each(function(r){
            if(r.data.id == record.id){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#descuentoId').setValue(cero);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
        
        stItem.add(new Ferrital_web.model.preventa.Item({
            id: record.id,
            nombre: record.nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            totaliva: totaliva,
            iva: iva,
            dcto: descuento,
            descuentoprct: descuento
        }));
        this.recalcularFinal();

        cero="";
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#cantidadId').setValue(cero);
        view.down('#descuentoId').setValue(cero);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);

    },

    selectItem: function() {

        var view = this.getPreventaingresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        
        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    buscar: function(){

        var view = this.getBuscarclientespreventa()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductospreventa();
        var viewIngresa = this.getPreventaingresar();
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

    buscarproductos: function(){

        Ext.create('Ferrital_web.view.Preventa.BuscarProductos').show();
    },

    buscarp: function(){
        var view = this.getBuscarproductospreventa();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientespreventa();
        var viewIngresa = this.getPreventaingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    validarut: function(){

        var view = this.getPreventaingresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

        if(numero==0){
            var edit = Ext.create('Ferrital_web.view.Preventa.BuscarClientes');            
                  
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
                console.log(resp);
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)                        
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
            }

        });       
        }
    },

    mpreventa: function(){
       
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'preventaprincipal'});
    },


    buscarpreventa: function(){
        
        var view = this.getPreventaprincipal()
        var st = this.getPreventaStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();


    },

    grabarpreventa: function(){

        var viewIngresa = this.getPreventaingresar();
        var numeroticket = viewIngresa.down('#ticketId').getValue();
        var idtipo = viewIngresa.down('#tipoDocumento2Id').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
      
        var producto = viewIngresa.down('#tipoVendedorId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;

        var vendedor = record.id;
        var fechapreventa = viewIngresa.down('#fechaventaId').getValue();
        var stItem = this.getPreventaItemsStore();
        var stPreventa = this.getPreventaStore();

        console.log(numeroticket)

        if(vendedor==0  && tipo_documento.getValue() == 1){
            Ext.Msg.alert('Ingrese Datos del Vendedor');
            return;   
        }

        
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'preventa/save',
            params: {
                idcliente: idcliente,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                idtipo : idtipo,
                numeroticket : numeroticket,
                fechapreventa : fechapreventa,
                descuento : viewIngresa.down('#finaldescuentoId').getValue(),
                neto : viewIngresa.down('#finaltotalnetoId').getValue(),
                iva : viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 var idpreventa= resp.idpreventa;
                 viewIngresa.close();
                 stPreventa.load();
                 window.open(preurl + 'preventa/exportPDF/?idpreventa='+idpreventa);
               
            }
           
        });
       
    },

        
    editarpreventa: function(){
        
       
    },

    agregarpreventa: function(){

         //var view = this.getPreventaingresar();
         var nombre = "6";    
         Ext.Ajax.request({
            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    var view = Ext.create('Ferrital_web.view.Preventa.Preventa').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    view.down("#ticketId").setValue(correlanue);
                }else{
                    Ext.Msg.alert('Correlativo no Existe');
                    return;
                }

            }

        }); 

       
       
    },

    cerrarpreventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










