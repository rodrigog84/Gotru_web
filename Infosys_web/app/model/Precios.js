
Ext.define('Infosys_web.model.Precios', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'nombre'},
        {name: 'numero'},
        {name: 'margen'},
        {name: 'usuario'},
        {name: 'id_bodega'},
        {name: 'nom_bodega'},
        {name: 'valor'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"}     
    ]
});