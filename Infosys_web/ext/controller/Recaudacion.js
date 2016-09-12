Ext.define('Ferrital_web.controller.Recaudacion', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Recauda'],

    models: ['Recauda'],

    views: ['recaudacion.Principal'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'recaudacionprincipal',
        selector: 'recaudacionprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mrecauda]': {
                click: this.mrecauda
            },
            
            'recaudacionprincipal button[action=cerrarrecaudacion]': {
                click: this.cerrarrecaudacion
            },
            'recaudacionprincipal button[action=exportarexcelexistencia]': {
                click: this.exportarexcelexistencia
            },
            'recaudacionprincipal button[action=editarrecaudacion]': {
                click: this.editarrecaudacion
            },
            'recaudacionprincipal button[action=buscarrecaudacion]': {
                click: this.buscarrecaudacion
            },
            'recaudacionprincipal button[action=exportarrecaudacionPdf]': {
                click: this.exportarrecaudacionPdf
            },
           
        });
    },

    editarrecaudacion: function(){

        var view = this.getRecaudacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Ferrital_web.view.existencia.detalle_existencias').show();
            var nombre = (row.get('id_producto'));
            var stock = (row.get('stock'));
            edit.down('#productoId').setValue(nombre);
            edit.down('#stockId').setValue(stock);
            var st = this.getExistencias2Store()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    exportarrecaudacionPdf: function(){
        var view = this.getRecaudacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'recaudacion/exportRecaudacionPDF/?idrecaudacion=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },


    cerrarrecaudacion: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mrecauda: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        var st = this.getRecaudaStore()
        st.load();
        viewport.add({xtype: 'recaudacionprincipal'});
    },

    exportarexcelexistencia: function(){

        var jsonCol = new Array()
        var i = 0;
        var view = this.getRecaudacionprincipal();
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelExistencia?cols='+Ext.JSON.encode(jsonCol));

   },

   
    buscarrecaudacion: function(){

        var view = this.getRecaudacionprincipal();
        var st = this.getRecaudaStore()
        //var nombre = view.down('#productosId').getValue()
        //st.proxy.extraParams = {nombre : nombre}
        //st.load();

   },

    
  
});










