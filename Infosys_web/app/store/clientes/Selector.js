Ext.define('Infosys_web.store.clientes.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"Nombre", "nombre":"Nombre"},
        {"id":"Rut", "nombre":"Rut"},
        {"id":"Numero", "nombre":"Numero"},
        {"id":"Sigla", "nombre":"Sigla"},
        {"id":"Todos", "nombre":"Todos"}           
    ]
});