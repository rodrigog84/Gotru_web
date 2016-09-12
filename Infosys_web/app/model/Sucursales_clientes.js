Ext.define('Infosys_web.model.Sucursales_clientes', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'id_cliente'},
        {name: 'nombres'},
        {name: 'sigla'},
        {name: 'direccion'},
        {name: 'id_lista'},
        {name: 'id_comuna'},
        {name: 'nombre_comuna'},
        {name: 'id_comuna'},
        {name: 'nombre_ciudad'},
        {name: 'id_ciudad'},
    	{name: 'id_ciudad'},
    	{name: 'rut'},
    	{name: 'fono_contacto'},
    	{name: 'mail_contacto'},
    	{name: 'nombre_contacto'}
    ]
});