Ext.define('Infosys_web.controller.Estadisticas', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: [],

    models: [],

    views: ['estadisticas.Estadisticas',
            'estadisticas.Estadisticas'],

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
        ref: 'estadisticasventas',
        selector: 'estadisticasventas'
    },{
        ref: 'buscarclientesestadisticas',
        selector: 'buscarclientesestadisticas'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({           
           
            'topmenus menuitem[action=mestadisticas]': {
                click: this.mestadisticas
            },

            'buscarclientesestadisticas button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarclientesestadisticas button[action=buscar]': {
                click: this.buscar
            },
            'estadisticasventas #selectId': {
                select: this.selectinforme
            },
            
        });
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientesestadisticas();
        var viewIngresa = this.getFacturasingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscar: function(){

        var view = this.getBuscarclientesestadisticas()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    mestadisticas: function(){

        Ext.create('Infosys_web.view.estadisticas.Estadisticas').show();
    },    

    cerrarCobrador: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    selectinforme: function(){

        var view = this.getEstadisticasventas();
        var tipselec = view.down('#selectId');
        var stCombo = tipselec.getStore();
        var record = stCombo.findRecord('id', tipselec.getValue()).data;
        var id = (record.id);

        if(id==1){
            var edit = Ext.create('Infosys_web.view.ventas.BuscarClientes');
        };
        
    },
    
  
});










