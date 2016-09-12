
Ext.define('Infosys_web.model.Precios.Item', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'nombre_lista'},
        {name: 'id_producto'},
        {name: 'codigo'},
        {name: 'nom_producto'},
        {name: 'id_medida'},
        {name: 'porcentaje'},
        {name: 'valor'},
        {name: 'valor_lista'}
    ]
});