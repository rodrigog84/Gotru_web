Ext.define('Infosys_web.controller.Sectores', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Sectores'],

    models: ['Sectores'],

    views: ['Sectores.Principal',
            'Sectores.Ingresar'],

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
        ref: 'sectoresprincipal',
        selector: 'sectoresprincipal'
    },{
        ref: 'sectoresingresar',
        selector: 'sectoresingresar'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mSectores]': {
                click: this.mSectores
            },
            'sectoresprincipal button[action=buscarcontrolcaja]': {
                click: this.buscarcontrolcaja
            },
            'sectoresprincipal button[action=cerrarsectores]': {
                click: this.cerrarsectores
            },
            'sectoresprincipal button[action=exportarexcelcontrolcaja]': {
                click: this.exportarexcelcontrolcaja
            },
            'sectoresprincipal button[action=agregarsectores]': {
                click: this.agregarsectores
            },
            'sectoresingresar button[action=grabarsectores]': {
                click: this.grabarsectores
            },
            'sectoresprincipal button[action=editarsectores]': {
                click: this.editarsectores
            },
           
        });
    },

    editarsectores: function(){
        
        var view = this.getSectoresprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.Sectores.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    grabarsectores: function(){

            
        var win    = this.getSectoresingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getSectoresStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        }else{
            record = Ext.create('Infosys_web.model.Sectores');
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

    agregarsectores: function(){
        
        Ext.create('Infosys_web.view.Sectores.Ingresar').show();
        
    },

    editarcontrolcaja: function(){

        
    },


    cerrarsectores: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mSectores: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'sectoresprincipal'});
    },

   
    exportarexcelcontrolcaja: function(){

        

    },

    buscarcontrolcaja: function(){

        var view = this.getSectoresprincipal()
        var st = this.getSectoresStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    
  
});










