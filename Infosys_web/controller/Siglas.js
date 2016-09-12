Ext.define('Infosys_web.controller.Siglas', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Siglas'],

    models: ['Siglas'],

    views: ['sigla.Principal',
            'sigla.Ingresar'],

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
        ref: 'siglaprincipal',
        selector: 'siglaprincipal'
    },{
        ref: 'siglaingresar',
        selector: 'siglaingresar'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=msiglas]': {
                click: this.msiglas
            },
            'siglaprincipal button[action=buscarcontrolcaja]': {
                click: this.buscarcontrolcaja
            },
            'siglaprincipal button[action=cerrarsiglas]': {
                click: this.cerrarsiglas
            },
            'siglaprincipal button[action=exportarexcelcontrolcaja]': {
                click: this.exportarexcelcontrolcaja
            },
            'siglaprincipal button[action=agregarsiglas]': {
                click: this.agregarsiglas
            },
            'siglaingresar button[action=grabarsiglas]': {
                click: this.grabarsiglas
            },
            'siglaprincipal button[action=editarsiglas]': {
                click: this.editarsiglas
            },
           
        });
    },

    editarsiglas: function(){
        
        var view = this.getSiglaprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.sigla.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    grabarsiglas: function(){

            
        var win    = this.getSiglaingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getSiglasStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Siglas');
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

    agregarsiglas: function(){
        
        Ext.create('Infosys_web.view.sigla.Ingresar').show();
        
    },

    editarcontrolcaja: function(){

        
    },


    cerrarsiglas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    msiglas: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'siglaprincipal'});
    },

   
    exportarexcelcontrolcaja: function(){

        

    },

    buscarcontrolcaja: function(){

        var view = this.getSiglaprincipal()
        var st = this.getSiglasStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    
  
});










