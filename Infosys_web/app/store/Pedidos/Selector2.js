Ext.define('Infosys_web.store.Pedidos.Selector2', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"08:30"},
        {"id":"2", "nombre":"09:00"},
        {"id":"3", "nombre":"10:30"},
        {"id":"4", "nombre":"12:30"},
        {"id":"5", "nombre":"16:30"}          
    ]
});