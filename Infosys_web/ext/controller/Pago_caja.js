Ext.define('Ferrital_web.controller.Pago_caja', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Venta',
             'Tipo_documento',
             'Cond_pago',
             'Preventa_detalle',
             'recaudacion.Items',
             'Preventa',
             'Sucursales_clientes'
             ],

    models: ['Venta.Item',
              'Cond_pag',
              'Preventa_detalle',
              'Recaudacion',
              'Recaudacion_detalle',
              'recaudacion.Item',
              'Factura'],

    views: ['Pago_caja.Genera_pago',
            'Pago_caja.Principal',
            'Pago_caja.Facturas',
            'Pago_caja.Apertura',
            'Pago_caja.BuscarSucursales'],

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
        ref: 'facturasvizualizar',
        selector: 'facturasvizualizar'
    },{    
        ref: 'aperturacaja',
        selector: 'aperturacaja'
    },{    
        ref: 'buscarsucursalesfactura',
        selector: 'buscarsucursalesfactura'
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
            'generapagoingresar #condpagoId': {
                select: this.selectcondpago
            },
            'generapagoingresar button[action=visualizar]': {
                click: this.visualizar
            },

            'facturasvizualizar button[action=salir]': {
                click: this.salir
            },
            'generapagoingresar #cajaId': {
                select: this.selectItemcaja                
            },
            'generapagoingresar #valorcancelaId': {
                specialkey: this.special,
                blur: this.selectItemcancela                    
            },
            'generapagoingresar button[action=agregarrecaudacion]': {
                click: this.agregarrecaudacion
            },
            'generapagoingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'generapagoingresar button[action=grabarecaudacion]': {
                click: this.grabarecaudacion
            },
            'aperturacaja button[action=mpagocaja2]': {
                click: this.mpagocaja2
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

        });
    },

     seleccionarsucursalfact: function(){

        var view = this.getBuscarsucursalesfactura();
        var viewIngresa = this.getFacturasvizualizar();
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

    buscarsucursalfactura: function(){

       var busca = this.getFacturasvizualizar()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Ferrital_web.view.Pago_caja.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar ClienteS.');
            return;
       }
      
    },

    grabarfactura: function() {

        var viewIngresa = this.getFacturasvizualizar();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var tipo_documento= viewIngresa.down('#tipodocumentoId').getValue();
        var idsucursal= viewIngresa.down('#id_sucursalID').getValue();
        var vendedor = viewIngresa.down('#vendedorId').getValue();
        var idvendedor = viewIngresa.down('#idvendedorId').getValue();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getPreventa_detalleStore();
      

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
            url: preurl + 'facturasvizualiza/save',
            params: {
                idcliente: idcliente,
                idsucursal: idsucursal,
                items: Ext.JSON.encode(dataItems),
                idvendedor : idvendedor,
                numfactura : numfactura,
                fechafactura : fechafactura,
                fechavenc : fechavenc, 
                tipodocumento : tipo_documento,
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 //stFactura.load();
                 window.open(preurl + 'facturas/exportPDF/?idfactura='+idfactura);

            }
           
        });

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


    grabarecaudacion: function() {

        var view = this.getGenerapagoingresar();
        var idcajero = view.down('#cajeroId').getValue();
        var idcaja = view.down('#cajaId').getValue();
        var fechatransac =  view.down("#fechafacturaId").getValue();
        var documento = view.down('#tipoDocumentoId');
        var numdoc = view.down('#numfacturaId').getValue();
        var comprobante = view.down('#comprobanteId').getValue();
        var idcliente = view.down('#id_cliente').getValue();
        var ticketid =  view.down('#idticketId').getValue();
        var ticket =  view.down('#ticketId').getValue();
        var dataItems = new Array();
        var stItem = this.getRecaudacionItemsStore();
        var preventa = this.getPreventaStore();
        var valida = view.down('#validaId').getValue();
        var viewedit = this.getPagocajaprincipal();
        var contado =  view.down('#contadoId').getValue();
        var cheques =  view.down('#chequesId').getValue();
        var otros =  view.down('#otrosId').getValue();
        viewedit.down('#efectivonId').setValue(contado);
        viewedit.down('#efectivoId').setValue(Ext.util.Format.number(contado, '0,00'));        
        viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
        viewedit.down('#totchequesnId').setValue(cheques);
        viewedit.down('#otrosmontosnId').setValue(otros);
        viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));

        if (valida == 0 ) {

             Ext.Msg.alert('Alerta', 'Debe Cancelar Documento');
             return; 
            

        }

        stItem.each(function(r){
            dataItems.push(r.data)
        });


        Ext.Ajax.request({
                url: preurl + 'recaudacion/save',
                params: {
                    num_comprobante : comprobante,
                    fecha : fechatransac,
                    num_documento : numdoc,
                    id_cliente : idcliente,
                    id_caja : idcaja,
                    ticket : ticket,
                    idticket : ticketid,
                    id_cajero : idcajero,
                    items: Ext.JSON.encode(dataItems),
                },

                success: function(response){
                    var text = response.responseText;
                    var resp = Ext.JSON.decode(response.responseText);
                    var idrecauda= resp.idrecauda;
                    Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                    preventa.load();
                    view.close();
                    window.open(preurl +'recaudacion/exportRecaudacionPDF/?idrecaudacion='+idrecauda);
                    
                }
        });
    },


    agregarrecaudacion: function() {

        var view = this.getGenerapagoingresar();
        var stItem = this.getRecaudacionItemsStore();
        var formapago = view.down('#condpagoId');
        var stCombo = formapago.getStore();
        var record = stCombo.findRecord('id', formapago.getValue()).data;
        var numcheque = view.down('#numchequeId').getValue();
        var fechacheque = view.down('#fechacheqId').getValue();
        var fechatransac = view.down('#fechafacturaId').getValue();
        var valortotal = view.down('#valortotalId').getValue(); 
        var valorpago = view.down('#valorpagoId').getValue();
        var valorcancela = view.down('#valorcancelaId').getValue();
        var documento = view.down('#tipoDocumentoId');
        var stCombo = documento.getStore();
        var iddocumento = stCombo.findRecord('id', documento.getValue()).data;
        var numdoc = view.down('#numfacturaId').getValue();
        var comprobante = view.down('#comprobanteId').getValue();
        var valorvuelto = view.down('#valorvueltoId').getValue();
        var contado = view.down('#contadoId').getValue();
        var cheques = view.down('#chequesId').getValue();
        var otros = view.down('#otrosId').getValue();

        if (!contado){
            
            var contado = 0;
        }

        if (!valorvuelto){
            
            var valorvuelto = 0;
        }

        if (!cheques){
            
            var cheques = 0;
        }

        if (!otros){
            
            var otros = 0;
        }



        var cero = 0;
        var valida = 1;
        
               

        if (record.nombre == "CONTADO") {

                   
            var valortotal = (parseInt(valorcancela))-(parseInt(valorvuelto)) ;
            var valort = (parseInt(valorcancela))-(parseInt(valorvuelto)) ;
        }

        if (record.nombre == "PAGO CHEQUE ") {

            var banco = view.down('#bancoId');
            var stCombo = banco.getStore();
            var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
            var nombrevanco = nombrebanco.nombre;
            var id_banco = nombrebanco.id;

            var valortotal = (parseInt(valorcancela));
            var valort = (valorcancela);

                       
            if (!numcheque){

             Ext.Msg.alert('Alerta', 'Ingrese Numero de Cheque');
             return; 
            };

        } 


        if (record.nombre == "CREDITO 30 DIAS") {

            var valorvuelto = view.down('#valorvueltoId').getValue();
            var nombrebanco = "";
            var idbanco = "";
            var valortotal = (parseInt(valorcancela));
            var valort = (valorcancela);

        }

        if (record.nombre == "CONTADO") {

            var contado = (parseInt(contado)) + (parseInt(valort));
                     

        }

       

        if (record.nombre == "PAGO CHEQUE ") {

            var cheques = (parseInt(cheques)) + (parseInt(valort));
                     

        }

        if (record.nombre == "CREDITO 30 DIAS") {

            var otros = (parseInt(otros)) + (parseInt(valort));
                     

        }
      
                
        if (valortotal > valorpago ) {

            Ext.Msg.alert('Alerta', 'Valor Mayor a lo  Cancelado');
             return;
        }
        
        
        if (!valorcancela){

             Ext.Msg.alert('Alerta', 'Ingrese Monto a Cancelar');
             return; 
        };

        if (!numdoc){

             Ext.Msg.alert('Alerta', 'Seleccione Tipo Documento');
             return; 
        };

        if (!comprobante){

             Ext.Msg.alert('Alerta', 'Seleccione Caja');
             return; 
        };

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

        stItem.add(new Ferrital_web.model.recaudacion.Item({
            id: record.id,
            nom_forma: record.nombre,
            num_doc : numdoc,            
            id_num_doc : iddocumento.id, 
            id_forma: record.id,
            num_cheque: numcheque,
            fecha_comp: fechacheque,
            fecha_transac: fechatransac,            
            nom_banco: nombrebanco,
            id_banco: idbanco,
            valor_pago: valorpago,
            valor_cancelado: valorcancela,
            valor_vuelto: valorvuelto
        }));

        view.down('#valorvueltoId').setValue(cero);
        view.down('#valorcancelaId').setValue(cero);
        var valortotal = (parseInt(valorpago)) - (parseInt(valorcancela)-parseInt(valorvuelto));
        view.down('#valorpagoId').setValue(valortotal);
        view.down('#valortotalId').setValue(valortotal);
        view.down('#validaId').setValue(valida);
        view.down('#contadoId').setValue(contado);
        view.down('#chequesId').setValue(cheques);
        view.down('#otrosId').setValue(otros);
        
        
        
    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.selectItemcancela()
        }
    },

    selectItemcancela : function() {
        
        var view =this.getGenerapagoingresar();
        var valorapagar = view.down('#valorpagoId').getValue();
        var valorpagado = view.down('#valorcancelaId').getValue();
        var condpago = view.down('#condpagoId');
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;

        if (valida == "CONTADO") {

        if (valorapagar<valorpagado){

            calculo = (parseInt(valorpagado))-(parseInt(valorapagar));
            view.down('#valorvueltoId').setValue(calculo);          

        }

        }else {

            if (valorapagar<valorpagado){

             Ext.Msg.alert('Alerta', 'Valor Cancelado debe ser Menor o Igual a Valor a Pagar');
            return;
            

        }
            


        }

        
    },

    selectItemcaja : function() {
        
        console.log("llegamos")
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

     visualizar : function() {

        var view =this.getGenerapagoingresar();
        var factura = view.down('#tipoDocumentoId').getRawValue();
        var numfactura = view.down('#numfacturaId').getValue();
        var rut = view.down('#rutId').getValue();
        var idcliente = view.down('#id_cliente').getValue();
        var nombre = view.down('#nombre_id').getValue();
        var direccion = view.down('#direccionId').getValue();
        var giro = view.down('#giroId').getValue();
        var comuna = view.down('#tipoComunaId').getValue();
        var ciudad = view.down('#tipoCiudadId').getValue();
        var vendedor = view.down('#VendedorId').getRawValue();
        var idvendedor = view.down('#idVendedorId').getRawValue();
        var neto = view.down('#netoaId').getValue();
        var descuento = view.down('#descuentoaId').getValue();
        var afecto = view.down('#afectoaId').getValue();
        var iva = view.down('#ivaaId').getValue();
        var total = view.down('#totalaId').getValue();

        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;
    
        if (!numfactura){

             Ext.Msg.alert('Alerta', 'Seleccione Documento');
             return; 
        };


        
        if (factura){
              var st = this.getPreventa_detalleStore()
              var ticket = view.down('#ticketId').getValue();
              st.proxy.extraParams = {ticket : ticket}
              st.load();

              var newview =Ext.create('Ferrital_web.view.Pago_caja.Facturas').show(); 
              Ext.Ajax.request({
                    url: preurl + 'facturas/calculofechas',
                    params: {
                        dias: dias,
                        fechafactura : fechafactura
                    },
                    success: function(response){
                       var resp = Ext.JSON.decode(response.responseText);
                       var fecha_final = resp.fecha_final;
                       newview.down("#fechavencId").setValue(fecha_final);
                       newview.down("#tipodocumentoId").setValue(factura);
                       newview.down("#numfacturaId").setValue(numfactura);
                       newview.down("#rutId").setValue(rut);
                       newview.down("#nombre_id").setValue(nombre);
                       newview.down("#direccionId").setValue(direccion);
                       newview.down("#giroId").setValue(giro);
                       newview.down("#tipoComunaId").setValue(comuna);
                       newview.down("#tipoCiudadId").setValue(ciudad);
                       newview.down("#idvendedorId").setValue(idvendedor);
                       newview.down("#vendedorId").setValue(vendedor);
                       newview.down("#id_cliente").setValue(idcliente);
                       newview.down("#finaltotalnetoId").setValue(neto);
                       newview.down("#finaldescuentoId").setValue(descuento);
                       newview.down("#finalafectoId").setValue(afecto);
                       newview.down("#finaltotalivaId").setValue(iva);
                       newview.down("#finaltotalId").setValue(total);
                       newview.down("#finaltotalpostId").setValue(total);
                                   
                    }
              });
                      
        }else{

             Ext.Msg.alert('Alerta', 'Debe seleccionar Documento.');
            return;
        }


     },

    selectcondpago: function() {
        
        var view =this.getGenerapagoingresar();
        var condpago = view.down('#condpagoId');
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        valida = record.nombre;

        var bolDisabled = valida == "CONTADO" ? true : false; // campos se habilitan sólo en factura
        
        view.down('#numchequeId').setDisabled(bolDisabled);
        view.down('#bancoId').setDisabled(bolDisabled);
               
        if (valida == "CONTADO"){
        view.down('#valorvueltoId').setDisabled(false);
        
        }else{
           view.down('#valorvueltoId').setDisabled(true);
          
        };

        view.down("#valorcancelaId").focus();


    },


    selectItemdocuemento: function() {
        
        var view =this.getGenerapagoingresar();      
        var tipo_documento = view.down('#tipoDocumentoId');
        var stCombo = tipo_documento.getStore();
        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        correlanue = record.correlativo;
        correlanue = (parseInt(correlanue)+1);
        view.down('#numfacturaId').setValue(correlanue);

        var bolDisabled = tipo_documento.getValue() == 1 ? false : true; // campos se habilitan sólo en factura

        view.down('#rutId').setDisabled(bolDisabled);
        view.down('#nombre_id').setDisabled(bolDisabled);
        view.down('#direccionId').setDisabled(bolDisabled);
        view.down('#giroId').setDisabled(bolDisabled);
        view.down('#tipoCiudadId').setDisabled(bolDisabled);
        view.down('#tipoComunaId').setDisabled(bolDisabled);
    },

    mpagocaja: function(){
       
        Ext.create('Ferrital_web.view.Pago_caja.Apertura').show(); 
    },



    mpagocaja2: function(){

        var view = this.getAperturacaja();
        var cajero = view.down('#cajeroId');
        var efectivo = view.down('#efectuvoId').getValue();
        var cheques = view.down('#totchequesId').getValue();
        var otros = view.down('#otrosmontosId').getValue();
        var fecha = view.down('#fechaaperturaId').getValue();
        var stCombo = cajero.getStore();
        var idcajero = stCombo.findRecord('id', cajero.getValue()).data;
       
        var caja = view.down('#cajaId');
        var stCombo = caja.getStore();
        var idcaja = stCombo.findRecord('id', caja.getValue()).data;
        correlanue = idcaja.correlativo;
        correlanue = (parseInt(correlanue)+1);
        
        var caje = idcajero.id;
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
        viewedit.down("#cajeroId").setValue(idcajero.id);
        viewedit.down('#efectivonId').setValue(efectivo);
        viewedit.down('#efectivoId').setValue(Ext.util.Format.number(efectivo, '0,00'));        
        viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
        viewedit.down('#totchequesnId').setValue(cheques);
        viewedit.down('#otrosmontosnId').setValue(otros);
        viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));
        viewedit.down('#fechaaperturaId').setValue(fecha);
        view.close();
    },

    generarpago: function(){

        var view = this.getPagocajaprincipal();
        var idcaja = view.down('#cajaId').getValue();
        var nomcaja = view.down('#nomcajaId').getValue();
        var comprobante = view.down('#comprobanteId').getValue();
        var condventa = view.down('#comprobanteId').getValue();
        var contado = view.down('#efectivonId').getValue();
        var cheques = view.down('#totchequesnId').getValue();
        var otros = view.down('#otrosmontosnId').getValue();
        var idcajero = view.down('#cajeroId').getValue();
        var nomcajero = view.down('#nomcajeroId').getValue();

       
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var ticket = (row.get('num_ticket'));
            var idticket = (row.get('id'));
            var idcliente = (row.get('id_cliente'));
            var tipo_docu = (row.get('id_tip_docu'));
            var id_vendedor = (row.get('id_vendedor'));
            var id_pago = (row.get('id_pago'));
            var nom_vendedor = (row.get('nom_vendedor'))
            var neto = (row.get('neto'));
            var desc = (row.get('desc'));
            var total = (row.get('total'));
            var afecto = (neto-desc);
            var iva = (total-afecto);
            
            Ext.Ajax.request({
            url: preurl + 'clientes/getallc?idcliente='+idcliente,
            params: {
                id: 1,
                idcliente: idcliente
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {                     
                    
                    if(resp.cliente){
                        var view = Ext.create('Ferrital_web.view.Pago_caja.Genera_pago').show();                   
                        view.down("#ticketId").setValue(ticket);
                        view.down("#idticketId").setValue(idticket);
                        view.down("#netoId").setValue(neto);
                        view.down("#descuentoId").setValue(desc);
                        view.down("#ivaId").setValue(iva);
                        view.down("#afectoId").setValue(afecto);
                        view.down("#totalId").setValue(total);
                        view.down("#valorpagoId").setValue(total);
                        view.down("#tipocondpagoId").setValue(id_pago);
                        //view.down("#tipoDocumentoId").setValue(tipo_docu);
                        view.down("#comprobanteId").setValue(comprobante);
                        view.down("#netoaId").setValue(Ext.util.Format.number(neto, '0,000'));
                        view.down("#descuentoaId").setValue(Ext.util.Format.number(desc, '0,000'));
                        view.down("#ivaaId").setValue(Ext.util.Format.number(iva, '0,000'));
                        view.down("#afectoaId").setValue(Ext.util.Format.number(afecto, '0,000'));
                        view.down("#totalaId").setValue(Ext.util.Format.number(total, '0,000'));
                        
                        view.down("#cajaId").setValue(idcaja);
                        view.down("#nomcajaId").setValue(nomcaja);
                        view.down("#cajeroId").setValue(idcajero);
                        view.down("#nomcajeroId").setValue(nomcajero);


                        view.down("#contadoId").setValue(contado);
                        view.down("#chequesId").setValue(cheques);
                        view.down("#otrosId").setValue(otros);

                        var cliente = resp.cliente;
                        view.down("#nombre_id").setValue(cliente.nombres);
                        view.down("#id_cliente").setValue(cliente.id);
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad);
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna);
                        view.down("#giroId").setValue(cliente.giro);
                        view.down("#direccionId").setValue(cliente.direccion);
                        view.down("#rutId").setValue(cliente.rut);
                        view.down("#idVendedorId").setValue(id_vendedor);
                        view.down("#VendedorId").setValue(nom_vendedor);
                                                                   
                    }
                    
                }
            }

        });       

           
                       
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        
           

       
       
    },

    cerrarcajaventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










