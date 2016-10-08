Ext.define('Infosys_web.store.Sectores', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Sectores',
    autoLoad: true,
    //pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'sectores/save', 
            read: preurl + 'sectores/getAll',
            update: preurl + 'sectores/update'
            //destroy: 'php/deletaContacto.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});