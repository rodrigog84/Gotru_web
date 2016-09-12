
Ext.define('Infosys_web.model.Productos.Item', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'nombre'},
        {name: 'direccion'},
        {name: 'id_producto'},
        {name: 'id_descuento'},
        {name: 'codigo'},
        {name: 'codigo_barra'},
        {name: 'p_ult_compra'},
        {name: 'p_may_compra'},
        {name: 'p_venta', decimalPrecision:3},
        {name: 'p_costo'},
        {name: 'nom_uni_medida'},
        {name: 'id_marca'},
        {name: 'nom_marca'},
        {name: 'id_uni_medida'},
        {name: 'nom_ubi_prod'},
        {name: 'id_ubi_prod'},
        {name: 'p_promedio'},
        {name: 'nom_familia'},
        {name: 'id_familia'},
        {name: 'id_bodega'},
        {name: 'id_agrupacion'},
        {name: 'id_subfamilia'},
        {name: 'foto'},
        {name: 'nom_agrupacion'},
        {name: 'nom_subfamilia'},
        {name: 'stock'},
        {name: 'nom_bodega'},
        {name: 'cantidad', decimalPrecision:3},
        {name: 'dcto', decimalPrecision:3},
        {name: 'total'},
        {name: 'iva'},
        {name: 'neto', decimalPrecision:3},
        {name: 'totaliva'},
        {name: 'precio', decimalPrecision:3},
        {name: 'descuento', decimalPrecision:3}  
        
        
        
        

    ]
});