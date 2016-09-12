Ext.define('Ferrital_web.controller.CuentasCorrientes', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Inventari',
             'inventario.Items',
             'InventarioInicial',
             'Correlativos',
             'Productos',
             'Inventarios',
             'DesplegarInicial',
             'Clientes',
             'Cuentacorriente',
             'Cartolascuentacorriente',
             'cuentascontable',
             'cuentacorriente.Ctactemovimientos',
             'cuentacorriente.Librodiario',
             'cuentacorriente.Saldodocumentos'
             ],

    models: ['Inventari',
             'Inventarios',
             'Inventario.Item',
             'Correlativo',
             'Inventariodesplegar',
             'Cliente',
             'Cuentacorriente',
             'cuentascontable',
             'cuentacorriente.Ctactemovimientos',
             'cuentacorriente.Librodiario',
             'cuentacorriente.Saldodocumentos'],

    views: ['inventario_inicial.Principal',
            'inventario_inicial.Ingresar',
            'inventario_inicial.Desplegar',
            'inventario_inicial.BuscarInventario',
            'cuentascorrientes.CancelacionesPrincipal',
            'cuentascorrientes.CancelacionesIngresar',
            'cuentascorrientes.OtrosingresosPrincipal',
            'cuentascorrientes.OtrosingresosIngresar',
            'cuentascorrientes.CartolaPrincipal',
            'cuentascorrientes.VerCartola',
            'cuentascorrientes.VerComprobantes',
            'cuentascorrientes.CreacionCuentasPrincipal',
            'cuentascorrientes.AsociaCuenta',
            'cuentascorrientes.ResumenMovimientoPrincipal',
            'cuentascorrientes.LibroDiarioPrincipal',
            'cuentascorrientes.SaldoDocumentosPrincipal'
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
            ref: 'cancelacionesprincipal',
            selector: 'cancelacionesprincipal'
        },{
            ref: 'cancelacionesingresar',
            selector: 'cancelacionesingresar'
        },{
            ref: 'otrosingresosprincipal',
            selector: 'otrosingresosprincipal'
        },{
            ref: 'otrosingresosingresar',
            selector: 'otrosingresosingresar'
        },{
            ref: 'cartolaprincipal',
            selector: 'cartolaprincipal'
        },{
            ref: 'vercartola',
            selector: 'vercartola'
        },{
            ref: 'vercomprobantes',
            selector: 'vercomprobantes'
        },{
            ref: 'creacioncuentasprincipal',
            selector: 'creacioncuentasprincipal'
        },{
            ref: 'asociacuenta',
            selector: 'asociacuenta'
        },{
            ref: 'resumenmovimientoprincipal',
            selector: 'resumenmovimientoprincipal'
        },{
            ref: 'librodiarioprincipal',
            selector: 'librodiarioprincipal'
        },{
            ref: 'saldodocumentosprincipal',
            selector: 'saldodocumentosprincipal'
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
            'cancelacionesprincipal button[action=agregarcancelacion]': {
                click: this.agregarcancelacion
            },  
            'cancelacionesprincipal button[action=buscarctactecancelacion]': {
                click: this.buscarctactecancelacion
            },
            'cancelacionesprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },            
            'creacioncuentasprincipal button[action=buscarcuentacontable]': {
                click: this.buscarcuentacontable
            },      
            'creacioncuentasprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },                    
            'cartolaprincipal button[action=buscarctactecartola]': {
                click: this.buscarctactecartola
            },            
            'otrosingresosprincipal button[action=buscarctacteotrosingresos]': {
                click: this.buscarctacteotrosingresos
            },            
            'cancelacionesprincipal': {
                verCartola: this.verCartola
            },          
                                       
            'otrosingresosprincipal': {
                verCartola: this.verCartola
            },
            'cartolaprincipal': {
                verCartola: this.verCartola
            },      
            'vercomprobantes': {
                verComprobante: this.verComprobantes
            },                                               
            'creacioncuentasprincipal': {
                asociacuenta: this.asociacuenta
            },                                                
            'asociacuenta button[action=grabarasociacuenta]': {
                click: this.grabarasociacuenta
            },      


            'otrosingresosprincipal button[action=agregarotrosingresos]': {
                click: this.agregarotrosingresos
            },    
            'otrosingresosprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },                            
            'cancelacionesingresar button[action=cancelacioningresargrabar]': {
                click: this.cancelacioningresargrabar
            },    
            'otrosingresosingresar button[action=otrosingresosingresargrabar]': {
                click: this.otrosingresosingresargrabar
            },
            'resumenmovimientoprincipal button[action=buscarmovimientos]': {
                click: this.buscarmovimientos
            },                            
            'resumenmovimientoprincipal button[action=exportarresmovimientos]': {
                click: this.exportarresmovimientos
            },                                        
            'resumenmovimientoprincipal button[action=generarresmovpdf]': {
                click: this.generarresmovpdf
            },  
            'resumenmovimientoprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },  
            'librodiarioprincipal button[action=exportarlibrodiario]': {
                click: this.exportarlibrodiario
            },                   
            'librodiarioprincipal button[action=buscarlibrodiario]': {
                click: this.buscarlibrodiario
            },  
            'librodiarioprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },  

            'saldodocumentosprincipal button[action=buscarsaldodocumentos]': {
                click: this.buscarsaldodocumentos
            },     

            'saldodocumentosprincipal button[action=exportarsaldodocumentos]': {
                click: this.exportarsaldodocumentos
            },    
            'saldodocumentosprincipal button[action=cerrarpantalla]': {
                click: this.cerrarpantalla
            },               
                              
            'librodiarioprincipal button[action=generarlibrodiariopdf]': {
                click: this.generarlibrodiariopdf
            },


            'saldodocumentosprincipal button[action=generarsaldodocumentospdf]': {
                click: this.generarsaldodocumentospdf
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
            }

        });
    },


    agregarcancelacion: function(){
        edit = Ext.create('Ferrital_web.view.cuentascorrientes.CancelacionesIngresar').show();
        Ext.Ajax.request({
           //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
           url: preurl + 'cuentacorriente/getCorrelativo/',
                params: {
                    tipoCorrelativo: 'CANCELACIONES CTA CTE'
                },
           success: function(response, opts) {                         
              var obj = Ext.decode(response.responseText);
              edit.down('#numeroId').setValue(obj.data[0].correlativo);
                         // editor.record.set({saldo: obj.data[0].saldo});  
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        });           
    },


    verCartola: function(r,t){
        if(t == 2){
          Ext.create('Ferrital_web.view.cuentascorrientes.VerCartola', {ctacte: r.data.id, 
                                                                        cliente: r.data.cliente,
                                                                        rut : r.data.rut});
        }else{
          Ext.create('Ferrital_web.view.cuentascorrientes.VerComprobantes', {ctacte: r.data.id, 
                                                                        cliente: r.data.cliente,
                                                                        rut : r.data.rut});

        }
        //Ext.create('Ferrital_web.view.cuentascorrientes.VerCartola').show();

    },


    verComprobantes: function(r){
            console.log("sadasdasd");

            console.log(preurl + 'cuentacorriente/verComprobantePDF?idmov='+r.data.idcomprobante);
             window.open(preurl + 'cuentacorriente/verComprobantePDF?idmov='+r.data.idcomprobante);
 
    },


        asociacuenta: function(r){
        edit = Ext.create('Ferrital_web.view.cuentascorrientes.AsociaCuenta').show();
       Ext.Ajax.request({
           //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
           url: preurl + 'cuentacontable/getCuentaById/',
                params: {
                    idcuenta: r.data.id
                },                                                     
           success: function(response, opts) {
              var obj = Ext.decode(response.responseText);
              edit.down('#cuentaId').setValue(r.data.id);
              edit.down('#cuenta').setValue(obj.data[0].nombre);
              edit.down('#imputacion').setValue(obj.data[0].imputacion);
              edit.down('#tipocancelacion').setValue(obj.data[0].tipo_cancelacion);

             // editor.record.set({saldo: obj.data[0].saldo});  
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        });


    },



    grabarasociacuenta: function(){
            var view = this.getAsociacuenta();
            var win = this.getCreacioncuentasprincipal();
            Ext.Ajax.request({
               url: preurl + 'cuentacontable/actualizaCuenta/',
                params: {
                    idcuenta: view.down('#cuentaId').getValue(),
                    imputacion: view.down('#imputacion').getValue(),
                    tipocancelacion: view.down('#tipocancelacion').getValue(),
                },               
               success: function(response, opts) {
                    view.close();
               },
               failure: function(response, opts) {
                  console.log('server-side failure with status code ' + response.status);
               }
            })  

         win.store.reload();              


    },


    buscarcuentacontable: function(){
        var view = this.getCreacioncuentasprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCuentascontableStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacontable/getByName/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },

    buscarctactecancelacion: function(){
        var view = this.getCancelacionesprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getByName/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },



    buscarmovimientos: function(){
        var view = this.getResumenmovimientoprincipal();
        console.log(view);
        fecdesde = view.down('#fecdesdeId').getValue();
        fechasta = view.down('#fechastaId').getValue();

        var stItem = view.store;
        //var stItem = this.getCuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getMovimientos/',
            params: {
                fecdesde: fecdesde,
                fechasta: fechasta
            },               
           success: function(response, opts) {
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        }) 


    },



    buscarlibrodiario: function(){
        var view = this.getLibrodiarioprincipal();
        fecdesde = view.down('#fecdesdeId').getValue();
        fechasta = view.down('#fechastaId').getValue();
        comprobanteid = view.down('#comprobanteId').getValue();

        var stItem = view.store;

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getLibroDiarioByTipoComprobante/',
            params: {
              comprobante : comprobanteid,
              fecdesde : fecdesde,
              fechasta : fechasta,
            },               
           success: function(response, opts) {
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        }) 


    },


    buscarsaldodocumentos: function(){
        var view = this.getSaldodocumentosprincipal();
        rutcliente = view.down('#rutcliente').getValue();
        nombrecliente = view.down('#nombrecliente').getValue();
        cuentacontable = view.down('#cuentacontable').getValue();
        var stItem = view.store;
        if(rutcliente == '' && nombrecliente == '' && cuentacontable == null){
            Ext.Msg.alert('Alerta', 'Debe realizar alg&uacute;n filtro.');      
        }else{
          Ext.Ajax.request({
             url: preurl + 'cuentacorriente/getSaldoDocumentos/',
              params: {
                rutcliente : rutcliente,
                nombrecliente : nombrecliente,
                cuentacontable : cuentacontable,
              },               
             success: function(response, opts) {
                      var jsonData = Ext.decode(response.responseText)
                      var jsonRecords = jsonData.data;
                      stItem.loadData(jsonRecords);            
             },
             failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
             }
          })
        }

    },

    exportarresmovimientos: function(){

        var jsonCol = new Array()
        var i = 0;

        var grid =this.getResumenmovimientoprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'adminServicesExcel/exportarExcelResMov?cols='+Ext.JSON.encode(jsonCol)+'&fecdesde='+fecdesde+'&fechasta='+fechasta);
 
    },


    generarresmovpdf: function(){

        var jsonCol = new Array()
        var i = 0;

        var grid =this.getResumenmovimientoprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'cuentacorriente/exportarResMovPDF?cols='+Ext.JSON.encode(jsonCol)+'&fecdesde='+fecdesde+'&fechasta='+fechasta);
 
    },


    exportarlibrodiario: function(){

        var jsonCol = new Array()
        var i = 0;

        var grid =this.getLibrodiarioprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());
        comprobanteid = grid.down('#comprobanteId').getValue();

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'adminServicesExcel/exportarExcelLibroDiario?cols='+Ext.JSON.encode(jsonCol)+'&comprobante='+comprobanteid+'&fecdesde='+fecdesde+'&fechasta='+fechasta);
 
    },

    


    exportarsaldodocumentos: function(){

        var jsonCol = new Array()
        var i = 0;

        var grid =this.getSaldodocumentosprincipal();
        rutcliente = grid.down('#rutcliente').getValue();
        nombrecliente = grid.down('#nombrecliente').getValue();
        cuentacontable = grid.down('#cuentacontable').getValue();

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'adminServicesExcel/exportarExcelSaldoDocumentos?cols='+Ext.JSON.encode(jsonCol)+'&rutcliente='+rutcliente+'&nombrecliente='+nombrecliente+'&cuentacontable='+cuentacontable);
 
    },


    generarlibrodiariopdf: function(){
        var jsonCol = new Array()
        var i = 0;

        var grid =this.getLibrodiarioprincipal();
        fecdesde = Ext.util.Format.date(grid.down('#fecdesdeId').getValue());
        fechasta = Ext.util.Format.date(grid.down('#fechastaId').getValue());
        comprobanteid = grid.down('#comprobanteId').getValue();

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'cuentacorriente/exportarLibroDiarioPDF?cols='+Ext.JSON.encode(jsonCol)+'&comprobante='+comprobanteid+'&fecdesde='+fecdesde+'&fechasta='+fechasta);

    },


    generarsaldodocumentospdf: function(){
        var jsonCol = new Array()
        var i = 0;

        var grid =this.getSaldodocumentosprincipal();
        rutcliente = grid.down('#rutcliente').getValue();
        nombrecliente = grid.down('#nombrecliente').getValue();
        cuentacontable = grid.down('#cuentacontable').getValue();

        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     

        window.open(preurl + 'cuentacorriente/exportarSaldoDocumentosPDF?cols='+Ext.JSON.encode(jsonCol)+'&rutcliente='+rutcliente+'&nombrecliente='+nombrecliente+'&cuentacontable='+cuentacontable);

    },
    

    buscarctactecartola: function(){
        var view = this.getCartolaprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCartolascuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getByNameCartola/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },


    buscarctacteotrosingresos: function(){
        var view = this.getOtrosingresosprincipal();
        nombre = view.down('#nombreId').getValue();
        //var stItem = view.down("grid").getStore();
        var stItem = this.getCuentacorrienteStore();

        Ext.Ajax.request({
           url: preurl + 'cuentacorriente/getByName/',
            params: {
                nombre: nombre
            },               
           success: function(response, opts) {
                    console.log(Ext.decode(response.responseText));
                    var jsonData = Ext.decode(response.responseText)
                    var jsonRecords = jsonData.data;
                    stItem.loadData(jsonRecords);            
           },
           failure: function(response, opts) {
              console.log('server-side failure with status code ' + response.status);
           }
        })    


    },


    agregarotrosingresos: function(){
      edit =   Ext.create('Ferrital_web.view.cuentascorrientes.OtrosingresosIngresar').show();

      Ext.Ajax.request({
         //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
         url: preurl + 'cuentacorriente/getCorrelativo/',
              params: {
                  tipoCorrelativo: 'OTROS INGRESOS CTA CTE'
              },
         success: function(response, opts) {                         
            var obj = Ext.decode(response.responseText);
            edit.down('#numeroId').setValue(obj.data[0].correlativo);
                       // editor.record.set({saldo: obj.data[0].saldo});  
         },
         failure: function(response, opts) {
            console.log('server-side failure with status code ' + response.status);
         }
      });           



    },

    cancelacioningresargrabar: function(){
        
        var view = this.getCancelacionesingresar();
        var win = this.getCancelacionesprincipal();
        var stItem = view.down("grid").getStore();
        var sumdebe = 0;
        var sumhaber = 0;
        //for(i=0;i<store.count();i++){
            //console.log(store.data.items[i].data);
            //console.log(store.data.items[i].data.debe)
            //console.log(store.data.items[i].data.haber)
          //  sumdebe += parseInt(store.data.items[i].data.debe);
          //  sumhaber += parseInt(store.data.items[i].data.haber);
        //}

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data);
            sumdebe += parseInt(r.data.debe);
            sumhaber += parseInt(r.data.haber);
        });        


        if(view.down('#numeroId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar un Número de Folio.');      
        }else if(view.down('#fechaId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Fecha de Cancelación.');      
        }else if(view.down('#tipoComprobante').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Tipo de Comprobante.');      
        }else if(sumdebe == 0 && sumhaber == 0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar al menos un detalle de cancelacion.');                          
        }else if(sumdebe != sumhaber){
            Ext.Msg.alert('Alerta', 'Totales de Debe y Haber deben coincidir.');
        }else{

            /*var form = view.down('form').getForm();  
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        console.log(action)
                       Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }*/

            Ext.Ajax.request({
               url: preurl + 'cuentacorriente/saveCuentaCorriente/',
                params: {
                    fecha: view.down('#fechaId').getValue(),
                    numero: view.down('#numeroId').getValue(),
                    tipoComprobante: view.down('#tipoComprobante').getValue(),
                    detalle: view.down('#detalleId').getValue(),
                    items: Ext.JSON.encode(dataItems),
                    origen : 'CANCELACION'
                },               
               success: function(response, opts) {
                  win.store.reload();      

                     
               },
               failure: function(response, opts) {
                  console.log('server-side failure with status code ' + response.status);
               }
            })    

         view.close();   
       

             
        }
    // GUARDAR

    },




    otrosingresosingresargrabar: function(){
        
        var view = this.getOtrosingresosingresar();
        var win = this.getOtrosingresosprincipal();
        var stItem = view.down("grid").getStore();
        var sumdebe = 0;
        var sumhaber = 0;

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data);
            sumdebe += parseInt(r.data.debe);
            sumhaber += parseInt(r.data.haber);
        });        


        if(view.down('#numeroId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar un Número de Folio.');      
        }else if(view.down('#fechaId').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Fecha de Cancelación.');      
        }else if(view.down('#tipoComprobante').getValue() == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Tipo de Comprobante.');      
        }else if(sumdebe == 0 && sumhaber == 0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar al menos un detalle de cancelacion.');                          
        }else if(sumdebe != sumhaber){
            Ext.Msg.alert('Alerta', 'Totales de Debe y Haber deben coincidir.');
        }else{

            Ext.Ajax.request({
               url: preurl + 'cuentacorriente/saveCuentaCorriente/',
                params: {
                    fecha: view.down('#fechaId').getValue(),
                    numero: view.down('#numeroId').getValue(),
                    tipoComprobante: view.down('#tipoComprobante').getValue(),
                    detalle: view.down('#detalleId').getValue(),
                    items: Ext.JSON.encode(dataItems),
                    origen : 'OTRO'
                },               
               success: function(response, opts) {
                     win.store.reload();
                     
               },
               failure: function(response, opts) {
                  console.log('server-side failure with status code ' + response.status);
               }
            })    

         view.close();            

            //console.log(form)        
        }
    // GUARDAR

    },




    imprimeinventario: function(){

        var view = this.getDesplegarinventario();
        var numinventario =  view.down('#num_inventarioId').getValue();
        console.log(numinventario)
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


    cerrarpantalla: function(){

        var viewport = this.getPanelprincipal();
        if(typeof viewport !== undefined){
          viewport.removeAll();
        }
        
     
     
    },    
  
});










