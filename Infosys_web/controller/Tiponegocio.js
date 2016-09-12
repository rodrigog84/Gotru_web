Ext.define('Infosys_web.controller.Tiponegocio', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Tiponegocio'],

    models: ['Tiponegocio'],

    views: ['Tiponegocio.Principal',
            'Tiponegocio.Ingresar'],

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
        ref: 'Tiponegocioprincipal',
        selector: 'Tiponegocioprincipal'
    },{
        ref: 'Tiponegocioingresar',
        selector: 'Tiponegocioingresar'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mTiponegocio]': {
                click: this.mTiponegocio
            },
            'Tiponegocioprincipal button[action=buscarcontrolcaja]': {
                click: this.buscarcontrolcaja
            },
            'Tiponegocioprincipal button[action=cerrarTiponegocio]': {
                click: this.cerrarTiponegocio
            },
            'Tiponegocioprincipal button[action=exportarexcelcontrolcaja]': {
                click: this.exportarexcelcontrolcaja
            },
            'Tiponegocioprincipal button[action=agregarTiponegocio]': {
                click: this.agregarTiponegocio
            },
            'Tiponegocioingresar button[action=grabarTiponegocios]': {
                click: this.grabarTiponegocios
            },
            'Tiponegocioprincipal button[action=editarTiponegocio]': {
                click: this.editarTiponegocio
            },
           
        });
    },

    editarTiponegocio: function(){
        
        var view = this.getTiponegocioprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.Tiponegocio.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    grabarTiponegocios: function(){

            
        var win    = this.getTiponegocioingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getTiponegocioStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Tiponegocio');
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

    agregarTiponegocio: function(){
        
        Ext.create('Infosys_web.view.Tiponegocio.Ingresar').show();
        
    },

    editarcontrolcaja: function(){

        
    },


    cerrarTiponegocio: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mTiponegocio: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'Tiponegocioprincipal'});
    },

   
    exportarexcelcontrolcaja: function(){

        

    },

    buscarcontrolcaja: function(){

        var view = this.getTiponegocioprincipal()
        var st = this.getTiponegocioStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    
  
});










