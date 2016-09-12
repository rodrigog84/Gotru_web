Ext.define('Infosys_web.model.Sucursal', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'nombre'},
    	{name: 'direccion'},
        {name: 'id_lista'},
        {name: 'rut'},
    	{name: 'fono'},
    	{name: 'nom_contacto'},
    	{name: 'e_mail'}
    ]
});