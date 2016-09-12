Ext.define('Ferrital_web.store.cod_activ_econ.Items', {
    extend: 'Ext.data.Store',
    model: 'Ferrital_web.model.Cod_activ_econ.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});