Ext.define('Infosys_web.controller.Repartidor', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Repartidor'],

    models: ['Repartidor'],

    views: ['repartidor.Principal',
            'repartidor.Ingresar'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'Repartidorprincipal',
        selector: 'Repartidorprincipal'
    },{
        ref: 'Repartidoringresar',
        selector: 'Repartidoringresar'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mRepartidor]': {
                click: this.mRepartidor
            },
            'Repartidorprincipal button[action=buscarcontrolcaja]': {
                click: this.buscarcontrolcaja
            },
            'Repartidorprincipal button[action=cerrarRepartidor]': {
                click: this.cerrarRepartidor
            },
            'Repartidorprincipal button[action=exportarexcelcontrolcaja]': {
                click: this.exportarexcelcontrolcaja
            },
            'Repartidorprincipal button[action=agregarRepartidor]': {
                click: this.agregarRepartidor
            },
            'Repartidoringresar button[action=grabarRepartidor]': {
                click: this.grabarRepartidor
            },
            'Repartidorprincipal button[action=editarRepartidor]': {
                click: this.editarRepartidor
            },
           
        });
    },

    editarRepartidor: function(){
        
        var view = this.getRepartidorprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.Repartidor.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    grabarRepartidor: function(){

            
        var win    = this.getRepartidoringresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getRepartidorStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Repartidor');
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

    agregarRepartidor: function(){
        
        Ext.create('Infosys_web.view.repartidor.Ingresar').show();
        
    },

    editarcontrolcaja: function(){

        
    },


    cerrarRepartidor: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mRepartidor: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'Repartidorprincipal'});
    },

   
    exportarexcelcontrolcaja: function(){

        

    },

    buscarcontrolcaja: function(){

        var view = this.getRepartidorprincipal()
        var st = this.getRepartidorStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    
  
});










