Ext.define('Infosys_web.controller.Pago_caja', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Venta',
             'Tipo_documento',
             'Cond_pago',
             'Preventa_detalle',
             'recaudacion.Items',
             'Factura5',
             'Preventa',
             'Sucursales_clientes',
             'Boleta',
             'Productoslista',
             'productos.Items'
             ],

    models: ['Venta.Item',
              'Cond_pag',
              'Preventa_detalle',
              'Recaudacion',
              'Recaudacion_detalle',
              'recaudacion.Item',
              'Factura',
              'Boletas',
              'Producto'],

    views: ['Pago_caja.Genera_pago',
            'Pago_caja.Principal',
            'Pago_caja.Facturas',
            'Pago_caja.Apertura',
            'Pago_caja.BuscarSucursales',
            'Pago_caja.Observaciones',
            'Pago_caja.BuscarClientes'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'pagocajaprincipal',
        selector: 'pagocajaprincipal'
    },{    
        ref: 'generapagoingresar',
        selector: 'generapagoingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'boletaingresar',
        selector: 'boletaingresar'
    },{    
        ref: 'aperturacaja',
        selector: 'aperturacaja'
    },{    
        ref: 'buscarsucursalesfactura',
        selector: 'buscarsucursalesfactura'
    },{    
        ref: 'observacionesfacturas',
        selector: 'observacionesfacturas'
    },{    
        ref: 'buscarclientesboleta',
        selector: 'buscarclientesboleta'    
    },{    
        ref: 'buscarproductosboletas',
        selector: 'buscarproductosboletas'
    }

    ],
    
    init: function() {
    	
        this.control({

            'topmenus menuitem[action=mpagocaja]': {
                click: this.mpagocaja
            },
            'pagocajaprincipal button[action=generarpago]': {
                click: this.generarpago
            },
            'pagocajaprincipal button[action=exportarexcelpagocaja]': {
                click: this.exportarexcelpagocaja
            },
            'pagocajaprincipal button[action=cerrarcajaventa]': {
                click: this.cerrarcajaventa
            },
            'generapagoingresar #tipoDocumentoId': {
                select: this.selectItemdocuemento
            },
            'boletaingresar #condpagoId': {
                select: this.selectcondpago
            },
            'generapagoingresar #cajaId': {
                select: this.selectItemcaja                
            },
            'boletaingresar #valorcancelaId': {
                specialkey: this.special,
                blur: this.selectItemcancela                    
            },
            'generapagoingresar button[action=agregarrecaudacion]': {
                click: this.agregarrecaudacion
            },
            'generapagoingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'boletaingresar button[action=grabarboleta]': {
                click: this.grabarboleta
            },
            'aperturacaja button[action=mpagocaja2]': {
                click: this.mpagocaja2
            },
            'aperturacaja #cajeroId': {
                select: this.aperturacaja  
            },
            'facturasvizualizar button[action=grabarfactura]': {
                click: this.grabarfactura
            },
            'facturasvizualizar button[action=buscarsucursalfactura]': {
                click: this.buscarsucursalfactura
            },
            'buscarsucursalesfactura button[action=seleccionarsucursalfact]': {
                click: this.seleccionarsucursalfact
            },
            'pagocajaprincipal button[action=generaticket]': {
                click: this.generaticket
            },
            'pagocajaprincipal #nombresId': {
                specialkey: this.special5
            },
            'facturasvizualizar button[action=observaciones]': {
                click: this.observaciones
            },
            'observacionesfacturas button[action=ingresaobs]': {
                click: this.ingresaobs
            },
            'boletaingresar button[action=validarut]': {
                click: this.validarut
            },
            'boletaingresar #rutId': {
                specialkey: this.special6
            },
            'buscarclientesboleta button[action=buscar]': {
                click: this.buscar
            },
            'buscarclientesboleta button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'boletaingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'buscarproductosboletas button[action=buscar]': {
                click: this.buscarp
            },
            'buscarproductosboletas button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'boletaingresar button[action=agregarItem]': {
                click: this.agregarItem
            }
        });
    },

    mpagocaja2: function(){

        var view = this.getAperturacaja();
        var cajero = view.down('#cajeroId');        
        var efectivo = view.down('#efectuvoId').getValue();
        var cheques = view.down('#totchequesId').getValue();
        var otros = view.down('#otrosmontosId').getValue();
        var fecha = view.down('#fechaaperturaId').getValue();
        var recauda = view.down('#recaudaId').getValue();
        
        var stCombo = cajero.getStore();
        var idcajero = stCombo.findRecord('id', cajero.getValue()).data;
        var caje = idcajero.id;

        var caja = view.down('#cajaId');
        
        var stCombo = caja.getStore();
        var idcaja = stCombo.findRecord('id', caja.getValue()).data;
        correlanue = idcaja.correlativo;
        correlanue = (parseInt(correlanue)+1);
        var caj = idcaja.id;       
       
        if (!caje){
            Ext.Msg.alert('Alerta', 'Selecciona un Cajero.');
            return;
        };

        if (!caj){

            Ext.Msg.alert('Alerta', 'Selecciona una Caja.');
            return;
        };

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'pagocajaprincipal'});
        var viewedit = this.getPagocajaprincipal();        
        viewedit.down('#comprobanteId').setValue(correlanue);
        viewedit.down('#nomcajaId').setValue(idcaja.nombre);
        viewedit.down("#cajaId").setValue(idcaja.id);
        viewedit.down('#nomcajeroId').setValue(idcajero.nombre);
        viewedit.down('#recaudaId').setValue(recauda);
                
        viewedit.down("#cajeroId").setValue(idcajero.id);
        viewedit.down('#efectivonId').setValue(efectivo);
        viewedit.down('#efectivoId').setValue(Ext.util.Format.number(efectivo, '0,00'));        
        viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
        viewedit.down('#totchequesnId').setValue(cheques);
        viewedit.down('#otrosmontosnId').setValue(otros);
        viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));
        viewedit.down('#fechaaperturaId').setValue(fecha);
        //var stPreventa = this.getPreventaStore();
        //stPreventa.proxy.extraParams = {fecha : fecha}
        //stPreventa.load();
        
        Ext.Ajax.request({
            
            url: preurl + 'genera_pagos/grabar',
            params: {
                cajero: caje,
                caja: caj,
                fecha: Ext.Date.format(fecha,'Y-m-d'),
                efectivo: efectivo,
                cheques: cheques,
                otros: otros 
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                //myMask.hide();
                recauda = (resp.recauda);
                viewedit.down('#recaudaId').setValue(recauda);
                view.close();
                
            }
           
        });
        //viewedit.down("#nombresId").focus() 

        
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcularFinal: function(){

        var view = this.getBoletaingresar();
        var stItem = this.getProductosItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        
        stItem.each(function(r){
            pretotal = pretotal + ((r.data.total))
            //iva = iva + r.data.iva
            //neto = neto + r.data.neto
        });

        neto = (Math.round(pretotal /1.19));
        iva = ((pretotal - neto));
        afecto = neto;
        neto = neto;
        pretotalfinal = pretotal;
        
        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
         
    },

    agregarItem: function() {

        var view = this.getBoletaingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var numdoc = view.down('#numboletaId').getValue();
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var idbodega = view.down('#bodegaId').getValue();
        if(!idbodega){            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar Bodega');
            return false;
        }
        var tipopago = 1;
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;
        
        var tot = ((cantidad * precio) - descuento);
        var neto = (Math.round(tot / 1.19));
        var exists = 0;
        var iva = (tot - neto);
        var neto = (tot - iva);
        var total = (neto + iva );
        
        if(!producto){
            
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
            if(r.data.id == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
                
        stItem.add(new Infosys_web.model.Productos.Item({
            id: producto,
            id_producto: producto,
            codigo: codigo,
            id_descuento: iddescuento,
            id_bodega: idbodega,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            total: total,
            iva: iva,
            dcto: descuento
        }));
        this.recalcularFinal();

        cero="";
        cero1=0;
        cero2=1;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#totdescuentoId').setValue(cero1);
        view.down('#DescuentoproId').setValue(cero);
        view.down('#condpagoId').setValue(tipopago);
        view.down('#numboleta2Id').setValue(numdoc);
        view.down("#buscarproc").focus();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosboletas();
        var viewIngresa = this.getBoletaingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            viewIngresa.down('#nombreproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo_barra);
            viewIngresa.down('#precioId').setValue(row.data.valor_lista);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            viewIngresa.down("#cantidadId").focus();
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    buscarproductos: function(){
          
        var viewIngresa = this.getBoletaingresar();
        var codigo = viewIngresa.down('#codigoId').getValue()
        var rut = viewIngresa.down('#rutId').getValue()
        if(!rut){
             Ext.Msg.alert('Alerta', 'Debe Seleccionar Cliente');
                        return;  
            
        }
        var lista = 1;
        var idbodega = 1;
                  
        if (!codigo){
            var st = this.getProductoslistaStore()
            st.proxy.extraParams = {idlista: lista,
                                    idbodega: idbodega}
            st.load();
            var view = Ext.create('Infosys_web.view.Pago_caja.BuscarProductos').show();
            view.down('#listaId').setValue(lista);
            view.down('#bodegaId').setValue(idbodega);
        }else{

            Ext.Ajax.request({
            url: preurl + 'productosfact/buscacodigoboleta',
            params: {
                id: 1,
                codigo : codigo,
                idlista : lista
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true){                    
                    if(resp.cliente){
                        var cliente = resp.cliente;                        
                        viewIngresa.down('#productoId').setValue(cliente.id_producto);
                        viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                        viewIngresa.down('#codigoId').setValue(cliente.codigo_barra);
                        viewIngresa.down('#precioId').setValue(cliente.valor_lista);
                        viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                        viewIngresa.down("#cantidadId").focus();                                             
                    }                    
                }else{
                       Ext.Msg.alert('Alerta', 'Producto no existe');
                        return;                   
                }              
            }

        });
        }
        
    },

    buscarp: function(){
        var view = this.getBuscarproductosboletas();
        var st = this.getProductoslistaStore()
        var nombre = view.down('#nombreId').getValue();
        var lista = view.down('#listaId').getValue();
        var idbodega = view.down('#bodegaId').getValue();                

        st.proxy.extraParams = {nombre : nombre,
                                idlista: lista,
                                idbodega: idbodega}
        st.load();
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientesboleta();
        var viewIngresa = this.getBoletaingresar();
        var viewedit = this.getPagocajaprincipal();
        var idcaja = viewedit.down('#cajaId').getValue();
        var idcajero = viewedit.down('#cajeroId').getValue();
        
        var lista = 1;
        var bodega = 1;
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#bodegaId').setValue(bodega);
            viewIngresa.down('#listaId').setValue(lista);
            viewIngresa.down('#cajeroId').setValue(idcajero)
            viewIngresa.down('#cajaId').setValue(idcaja)
            
            view.close();     
       
                 
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },    


    buscar: function(){

        var view = this.getBuscarclientesboleta()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    special6: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

   
   validarut: function(){

        var viewedit = this.getPagocajaprincipal();
        var idcaja = viewedit.down('#cajaId').getValue();
        var nomcaja = viewedit.down('#nomcajaId').getValue();
        var contado = viewedit.down('#efectivonId').getValue();
        var cheques = viewedit.down('#totchequesnId').getValue();
        var otros = viewedit.down('#otrosmontosnId').getValue();
        var idcajero = viewedit.down('#cajeroId').getValue();
        var nomcajero = viewedit.down('#nomcajeroId').getValue();
        var view = this.getBoletaingresar();
        var rut = view.down('#rutId').getValue();
        var okey = "SI";
        var cero = " ";
        var lista = 1;
        var idbodega = 1;
        
        if (!rut){
            
           var edit = Ext.create('Infosys_web.view.Pago_caja.BuscarClientes');            
           
        };

        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {                    
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#rutId").setValue(rut)
                        view.down('#bodegaId').setValue(idbodega)
                        view.down('#listaId').setValue(lista)
                        view.down('#cajeroId').setValue(idcajero)
                        view.down('#cajaId').setValue(idcaja)
            
                    }
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      return false
                }

                //view.close()
            }

        });
        
        view.down("#codigoId").focus();   

    },


    observaciones: function(){

        var viewIngresa = this.getFacturasvizualizar();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var view = Ext.create('Infosys_web.view.Pago_caja.Observaciones').show();
        view.down("#rutId").focus();
        view.down("#FactId").setValue(numfactura);

    },

    special5: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.generaticket()
        }
    },

    
    aperturacaja: function(){

         var view = this.getAperturacaja();
         var cajero = view.down('#cajeroId').getValue();
         var caja = view.down('#cajaId').getValue();
         var fecha = view.down('#fechaaperturaId').getValue();
       
         if (cajero){

            Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    
                }else{

                     view.down("#efectuvoId").focus();
                    
                         


                }
            }
           
            });            
        };

    },

   
    buscarsucursalfactura: function(){

       var busca = this.getFacturasvizualizar()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.Pago_caja.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar ClienteS.');
            return;
       }
      
    },

    
    eliminaritem: function() {
        var view = this.getGenerapagoingresar();
        var grid  = view.down('#recaudacionId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    grabarboleta: function() {

        var view = this.getBoletaingresar();
        var bolEnable = true;
        view.down('#grababoletaId').setDisabled(bolEnable);
        var idcajero = view.down('#cajeroId').getValue();
        var idcaja = view.down('#cajaId').getValue();
        var tipdocumento = view.down('#tipodocumentoId').getValue();
        var fechaboleta =  view.down("#fechaboletaId").getValue();
        var numdoc = view.down('#numboleta2Id').getValue();
        var idcliente = view.down('#id_cliente').getValue();
        var totaldocumento = view.down('#finaltotalpostId').getValue();
        var viewedit = this.getPagocajaprincipal();
        var otros = 0;         
        var stItem = this.getProductosItemsStore();
        var st = this.getBoletaStore();
        var banco = view.down('#bancoId').getValue(); 
        var fechapago = view.down('#fechachequeId').getValue(); 
        var numcheque = view.down('#numchequeId').getValue();
        var bodega = view.down('#bodegaId').getValue();
        var formapago = view.down('#condpagoId');
        var stCombo = formapago.getStore();
        var record = stCombo.findRecord('id', formapago.getValue()).data;
        var condpago = (record.id);        

        var valorcancela = view.down('#valorcancelaId').getValue(); 
        var valorvuelto = view.down('#valorvueltoId').getValue();

        var viewedit = this.getPagocajaprincipal();
        var contado =  viewedit.down('#efectivonId').getValue();
        var cheques =  viewedit.down('#totchequesnId').getValue();
        var otros =  viewedit.down('#otrosmontosnId').getValue();
        var recauda =  viewedit.down('#recaudaId').getValue();

        var valorapagar = parseInt(view.down('#finaltotalpostId').getValue());
        var valorpagado = parseInt(view.down('#valorcancelaId').getValue());
        

        if (valorapagar>valorpagado){

            var bolEnable = false;
            view.down('#grababoletaId').setDisabled(bolEnable);
            Ext.Msg.alert('Valor Pagado Es Menor a Total Boleta');
                    return;
        };


        if (!valorcancela){

            var bolEnable = false;
            view.down('#grababoletaId').setDisabled(bolEnable);        
            Ext.Msg.alert('Alerta', 'Debe Cancelar Documento');
            return;
        }
               
        if (record.nombre == "CONTADO") {
                   
            var valortotal = ((valorcancela))-((valorvuelto)) ;
            var valort = ((valorcancela))-((valorvuelto)) ;
            var contado = ((contado)) + ((valortotal));
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var nombrebanco = "Venta al Contado";                    

        };

        if (record.nombre == "PAGO CHEQUE ") {

            if (!banco){

                var bolEnable = false;
                view.down('#grababoletaId').setDisabled(bolEnable);
        

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;
                

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;          
            
            } 

            var valortotal = ((valorcancela));
            var valort = (valorcancela);
            var cheques = (cheques) + (valortotal); 
                       
            if (!numcheque){

             var bolEnable = false;
             view.down('#grababoletaId').setDisabled(bolEnable);
             Ext.Msg.alert('Alerta', 'Ingrese Numero de Cheque');
             return; 
            };

        };

        if (record.nombre == "TARJETA DEBITO") {

            
            var otros = (otros) + (valortotal);
            view.down('#validapagoId').setValue(vali);
            if(numcheque==0){

                var bolEnable = false;
                view.down('#grababoletaId').setDisabled(bolEnable);
        
        

                 Ext.Msg.alert('Alerta', 'Debe Ingresar Numero Documento');
                return;
                
            };

            if (!banco){

                var bolEnable = false;
                view.down('#grababoletaId').setDisabled(bolEnable);
             

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;
                var valortotal = (valorcancela);
                var valort = (valorcancela);         
            
            }                 

        };

        if (record.nombre == "TARJETA CREDITO") {

            var otros = (otros) + (valortotal);
            view.down('#validapagoId').setValue(vali);
            if(numcheque==0){

                var bolEnable = false;
                view.down('#grababoletaId').setDisabled(bolEnable);
        
        

                 Ext.Msg.alert('Alerta', 'Debe Ingresar Numero Documento');
                return;
                
            };
            if (!banco){

                var bolEnable = false;
                view.down('#grababoletaId').setDisabled(bolEnable);
        
        

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;
                var valortotal = (valorcancela);
                var valort = (valorcancela);        
            
            }                                

        };     


        viewedit.down('#efectivonId').setValue(contado);
        viewedit.down('#efectivoId').setValue(Ext.util.Format.number(contado, '0,00'));        
        viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
        viewedit.down('#totchequesnId').setValue(cheques);
        viewedit.down('#otrosmontosnId').setValue(otros);
        viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));


        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'recaudacion/save',
            params: {
                fecha : Ext.Date.format(fechaboleta,'Y-m-d'),
                fechapago : Ext.Date.format(fechapago,'Y-m-d'),
                numboleta: numdoc,
                tipdocumento: tipdocumento, 
                numcheque: numcheque,
                items: Ext.JSON.encode(dataItems),                
                id_cliente : idcliente,
                id_caja : idcaja,
                id_cajero : idcajero,
                valorcancela: valorcancela,
                valorvuelto: valorvuelto,
                contado: contado,
                cheques: cheques,
                otros: otros,
                condpago: condpago,
                banco: banco,
                totaldocumento: totaldocumento,
                bodega: bodega,
                idrecauda: recauda 
            },

            success: function(response){
                var text = response.responseText;
                var resp = Ext.JSON.decode(response.responseText);
                var idboleta= resp.idboleta;

                view.close();
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                st.load();
                window.open(preurl + 'facturas/exportPDF/?idfactura='+idboleta);
            }
        });

    this.generarpago();       
    },
  

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.selectItemcancela()
        }
    },

    selectItemcancela : function() {
        
        var view =this.getBoletaingresar();
        var valorapagar = parseInt(view.down('#finaltotalpostId').getValue());
        var valorpagado = parseInt(view.down('#valorcancelaId').getValue());
        var condpago = view.down('#condpagoId');
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;

        if (valida == "CONTADO") {

        if (valorapagar<valorpagado){

            calculo = (parseInt(valorpagado))-(parseInt(valorapagar));
            view.down('#valorvueltoId').setValue(calculo);
                   

        }

        if (valorapagar==valorpagado){

            calculo = 0;
            view.down('#valorvueltoId').setValue(calculo);
                   

        };

        if (valorapagar>valorpagado){

            Ext.Msg.alert('Valor Pagado Es Menor a Total Boleta');
                    return;
        };

        }

        
    },

    selectItemcaja : function() {
        
        var view = this.getPagocajaprincipal();
        var tipo_caja = view.down('#cajaId').getValue();
        var stCombo = tipo_caja.getStore();
        var record = stCombo.findRecord('id', tipo_caja.getValue()).data;
        correlanue = record.correlativo;
        correlanue = (parseInt(correlanue)+1);
        view.down('#comprobanteId').setValue(correlanue);
        this.selectItemdocuemento();        
    },

    exportarexcelpagocaja: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPagocajaprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelPagocaja?cols='+Ext.JSON.encode(jsonCol));
 
    },

     salir : function() {
        var view =this.getFacturasvizualizar();
        view.close()
     },

     
    selectcondpago: function() {
      
        var view =this.getBoletaingresar();
        var condpago = view.down('#condpagoId');
        var totdocu = view.down('#finaltotalId').getValue();
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;

        var bolDisabled = valida == "CONTADO" ? true : false; // campos se habilitan sólo en factura
        
        view.down('#numchequeId').setDisabled(bolDisabled);
        view.down('#bancoId').setDisabled(bolDisabled);        

        if (valida == "PAGO CHEQUE "){
            view.down("#numchequeId").focus();
        };
               
        if (valida == "CONTADO"){

           view.down('#valorvueltoId').setDisabled(false);
           var nombrebanco = "";
           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);
           view.down("#valorcancelaId").focus();  
        
        };

        if (valida == "TARJETA CREDITO"){

           var numcheque = 0;
           view.down("#numchequeId").setValue(numcheque);
           view.down('#valorvueltoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);           
           view.down("#numchequeId").focus();
        
        };

        if (valida == "TARJETA DEBITO"){
           var numcheque = 0;
           view.down("#numchequeId").setValue(numcheque);
           view.down('#valorvueltoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);
           view.down("#numchequeId").focus();
        
        };

        if (valida == "CREDITO 30 DIAS"){

           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);           
           view.down('#numchequeId').setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down('#bancoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);
           view.down("#valorcancelaId").focus();
        
        };

        if (valida == "CREDITO 60 DIAS"){
           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);            
           view.down('#numchequeId').setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down('#bancoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);
           view.down("#valorcancelaId").focus();
                
        };

    },

    
    mpagocaja: function(){
       
        var cajero = "1";
        var caja = "1";
        var fecha = 0;
                
        Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var view = Ext.create('Infosys_web.view.Pago_caja.Apertura').show();
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    view.down('#cajaId').setValue(caja.id_caja);
                    view.down('#cajeroId').setValue(caja.id_cajero);
                    view.down('#efectuvoId').focus();                 
                    
                }else{

                 var caja1 = "1";
                 var cajero1 = "1";

                 view.down('#efectuvoId').focus();
                 view.down('#cajaId').setValue(caja1);   
                 view.down('#cajeroId').setValue(cajero1);   
                }
            }
           
        });

    },

    
    generarpago: function(){

            var viewedit = this.getPagocajaprincipal();
            var recauda = viewedit.down('#recaudaId').getValue();
            var idcaja = viewedit.down('#cajaId').getValue();
            var nomcaja = viewedit.down('#nomcajaId').getValue();
            var contado = viewedit.down('#efectivonId').getValue();
            var cheques = viewedit.down('#totchequesnId').getValue();
            var otros = viewedit.down('#otrosmontosnId').getValue();
            var idcajero = viewedit.down('#cajeroId').getValue();
            var nomcajero = viewedit.down('#nomcajeroId').getValue();     

            var view = Ext.create('Infosys_web.view.Pago_caja.Facturas').show();                   
            var nombre = "2";
            var tipdocumento = "2";
            var rut = "19";
            var nombrec = "Clientes Varios";
            var lista = 1;
            var idbodega = 1;
            var id = 1;
            view.down("#codigoId").focus();

            Ext.Ajax.request({

            url: preurl + 'correlativos/generabol?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    view.down("#numboletaId").setValue(correlanue);  
                    view.down("#nomdocumentoId").setValue(cliente.nombre); 
                    view.down("#tipodocumentoId").setValue(tipdocumento);
                    view.down("#recaudaId").setValue(recauda);
                    view.down("#id_cliente").setValue(id)
                    view.down("#rutId").setValue(rut);
                    view.down("#nombre_id").setValue(nombrec);
                    view.down('#bodegaId').setValue(idbodega)
                    view.down('#listaId').setValue(lista)
                    view.down('#cajeroId').setValue(idcajero)
                    view.down('#cajaId').setValue(idcaja)                           
                    
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }

            }            
                }); 
            //this.validarut();          
    },

    cerrarcajaventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










