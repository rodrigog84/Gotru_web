Ext.define('Ferrital_web.controller.Productos', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Productos','Ubicas', 'productos.Items', 'Existencias2'],

    models: ['Producto','Ubica', 'Productos.Item'],

    views: ['productos.Principal', 'productos.BuscarProductos', 'productos.Ingresar', 
    'productos.Desplegar', 'productos.Productos', 'ventas.Facturas',
    'productos.detalle_existenciasproductos'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
        ref: 'productosprincipal',
        selector: 'productosprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
    
        ref: 'productosingresar',
        selector: 'productosingresar'
    },{
    
        ref: 'busquedaproductos',
        selector: 'busquedaproductos'
    },{
    
        ref: 'productosdesplegar',
        selector: 'productosdesplegar'
    },{
    
        ref: 'facturasingresar',
        selector: 'facturasingresar'
    },{
        ref: 'detalleexistenciasproductos',
        selector: 'detalleexistenciasproductos'
    }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'productosprincipal button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            
            'productosprincipal button[action=exportarexcelproductos]': {
                click: this.exportarexcelproductos
            },
            'productosprincipal button[action=filtroProductos]': {
                click: this.filtroProductos
            },
            'productosingresar button[action=grabarproductos]': {
                click: this.grabarproductos
            },
            'productosdesplegar button[action=grabarproductos2]': {
                click: this.grabarproductos2
            },
            'productosprincipal button[action=agregarproductos]': {
                click: this.agregarproductos
            },
            'productosprincipal button[action=editarproductos]': {
                click: this.editarproductos
            },
            'productosprincipal button[action=cerrarproductos]': {
                click: this.cerrarproductos
            },
            'facturasingresar #productoId': {
                select: this.selectItem
            },
            'facturasingresar #buscarproductos': {
                select: this.selectCodigo
            },
            'facturasingresar #finaldescuentoId': {
                change: this.changedctofinal
            },
            'facturasingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
             'facturasingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'detalleexistenciasproductos button[action=exportarexcelexistenciadetalleproducto]': {
                click: this.exportarexcelexistenciadetalleproducto
            },
            'productosprincipal button[action=detalleexistenciasproductos]': {
                click: this.detalleexistenciasproductos
            },
        });
    },

     detalleexistenciasproductos : function(){

        var view = this.getProductosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.productos.detalle_existenciasproductos').show();
            var nombre = (row.get('id'));
            edit.down('#productoId').setValue(nombre);
            var st = this.getExistencias2Store()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

     exportarexcelexistenciadetalleproducto : function(){

        var view =this.getDetalleexistenciasproductos()
        var idproducto = view.down('#productoId').getValue()
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getDetalleexistenciasproductos()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelExistenciadetalle?idproducto='+idproducto+'&cols='+Ext.JSON.encode(jsonCol));
        view.close();

   },

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcularFinal: function(){
        var view = this.getFacturasingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var stItem = this.getProductosItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + r.data.totaliva
            iva = iva + r.data.iva
            neto = neto + r.data.total
        });
        pretotalfinal = ((pretotal * dcto)  / 100);
        total = ((pretotal) - parseInt(pretotalfinal));
           

        afecto = tipo_documento.getValue() == 1 ? (neto) : total;
        iva = tipo_documento.getValue() == 1 ? (iva) : 0;
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        //view.down('#finalpretotalId').setValue(Ext.util.Format.number(pretotal, '0,000'));
    },

    eliminaritem: function() {
        var view = this.getFacturasingresar();
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

    agregarItem: function() {
        var view = this.getFacturasingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var rut = view.down('#rutId').getValue();
        var dcto = view.down('#descuentoId').getValue(); 


        if (!dcto){
            
            descuento = 0;
        }else{

            var descuento = ((parseInt(cantidad * precio)) * parseInt(dcto)) / 100;
            
        }

        var boleta = view.down('#precioId').getValue();
        var precio = view.down('#precioId').getValue(); 
        var precioun = (view.down('#precioId').getValue() / 1.19);

        var pretotal = ((cantidad * precio) - descuento);
        var tot = ((cantidad * precio) - descuento);
        var neto = (parseInt(pretotal / 1.19));
        var exists = 0;


        var iva = tipo_documento.getValue() == 1 ? (tot - neto) : 0;
        var totaliva = (pretotal);

        if(tipo_documento.getValue() == 1){
            
            var totaliva = (pretotal + iva);
        }else{

            var iva = 0;
            var pretotal = ((cantidad * boleta) * dcto) / 100;
            var total = (cantidad * boleta) - pretotal;
            var totaliva = total;
            var precio = boleta;
            

        };

        if(tipo_documento.getValue() == null ){
            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Tipo de Documento');
            return false;
        }


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

        
        if(rut.length==0 && tipo_documento.getValue() == 1){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
            console.log("llegamos 1")
        }else{
           
            console.log("llegamos 2")
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
        
        stItem.add(new Ferrital_web.model.Productos.Item({
            id: record.id,
            nombre: record.nombre,
            precio: precio,
            cantidad: cantidad,
            total: neto,
            totaliva: tot,
            iva: iva,
            dcto: descuento,
            descuentoprct: dcto
        }));
        this.recalcularFinal();
    },

    selectItem: function() {
        var view = this.getFacturasingresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    selectCodigo: function() {

        var view = this.getFacturasingresar();
        var producto = view.down('#codigoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;

        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
    },

    exportarexcelproductos: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getProductosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelProductos?cols='+Ext.JSON.encode(jsonCol));
 
    },

    buscarproductos: function(){
        
        var view = this.getProductosprincipal();
        var st = this.getProductosStore();
        var cero ="";
        var nombre = view.down('#nombresId').getValue();
        var familia = view.down('#tipofamiliaId').getValue();
        var agrupacion = view.down('#tipoagrupacionId').getValue();
        var subfamilia = view.down('#tiposubfamiliaId').getValue();
        
        st.proxy.extraParams = {nombre : nombre, 
                                familia : familia, 
                                agrupacion : agrupacion,
                                subfamilia : subfamilia}

        view.down('#nombresId').setValue(cero);
        view.down('#tipofamiliaId').setValue(cero);
        view.down('#tipoagrupacionId').setValue(cero);
        view.down('#tiposubfamiliaId').setValue(cero);
        st.load();

    },

    facturarproductos: function(){
        
        var view = this.getFacturasingresar()
        var st = this.getProductosStore()
        var codigo = view.down('#codigoId').getValue()
             
        st.proxy.extraParams = {codigo : codigo 
                                }
        st.load();
    },

    
    grabarproductos: function(){

        var win    = this.getProductosingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getProductosStore();
        
        form.getForm().submit({
            url: preurl + 'productos/save',
            success: function(){
                st.load();
                win.close();
            }

        });

    },

    grabarproductos2: function(){

        var win    = this.getProductosdesplegar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }

        var st = this.getProductosStore();

        form.getForm().submit({
          
            url: preurl + 'productos/update',
            success: function(){
                st.load();
                win.close();
            }

        });
    },

        
    editarproductos: function(){

          
        var view = this.getProductosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.productos.Desplegar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarproductos: function(){
        Ext.create('Ferrital_web.view.productos.Ingresar').show();
    },

    cerrarproductos: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










