Ext.define('Infosys_web.controller.Cobradores', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Cobrador'],

    models: ['Cobrador'],

    views: ['cobradores.Principal',
            'cobradores.Ingresar'],

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
        ref: 'Cobradorprincipal',
        selector: 'Cobradorprincipal'
    },{
        ref: 'Cobradoringresar',
        selector: 'Cobradoringresar'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mCobrador]': {
                click: this.mCobrador
            },
            'Cobradorprincipal button[action=buscarcontrolcaja]': {
                click: this.buscarcontrolcaja
            },
            'Cobradorprincipal button[action=cerrarCobrador]': {
                click: this.cerrarCobrador
            },
            'Cobradorprincipal button[action=exportarexcelcontrolcaja]': {
                click: this.exportarexcelcontrolcaja
            },
            'Cobradorprincipal button[action=agregarCobrador]': {
                click: this.agregarCobrador
            },
            'Cobradoringresar button[action=grabarCobrador]': {
                click: this.grabarCobrador
            },
            'Cobradorprincipal button[action=editarCobrador]': {
                click: this.editarCobrador
            },
           
        });
    },

    editarCobrador: function(){
        
        var view = this.getCobradorprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.cobradores.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    grabarCobrador: function(){

            
        var win    = this.getCobradoringresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getCobradorStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Cobrador');
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

    agregarCobrador: function(){
        
        Ext.create('Infosys_web.view.cobradores.Ingresar').show();
        
    },

    editarcontrolcaja: function(){

        
    },


    cerrarCobrador: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mCobrador: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'Cobradorprincipal'});
    },

   
    exportarexcelcontrolcaja: function(){

        

    },

    buscarcontrolcaja: function(){

        var view = this.getCobradorprincipal()
        var st = this.getCobradorStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    
  
});










