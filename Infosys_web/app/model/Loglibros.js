Ext.define('Infosys_web.model.Loglibros', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'nro'},
    	{name: 'mes'},
    	{name: 'anno'},
    	{name: 'tipo_libro'},
        {name: 'archivo'},
        {name: 'estado'},
        {name: 'fecha_solicita'},
    	{name: 'fecha_creacion'}
    ]
});