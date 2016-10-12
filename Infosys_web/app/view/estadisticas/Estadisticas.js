Ext.define('Infosys_web.view.estadisticas.Estadisticas', {
    extend: 'Ext.window.Window',
    alias : 'widget.estadisticasventas',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.button.Button',
        'Ext.form.field.Display',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.form.field.Number',
        'Ext.toolbar.Separator'
    ],

    autoShow: true,
    height: 600,
    width: 1300,
    layout: 'fit',
    title: 'Estadisticas de Ventas',

    initComponent: function() {
        var me = this;
        var tipoInforme = Ext.create('Ext.data.Store', {
        fields: ['id', 'nombre'],
        data : [
            {"id":1, "nombre":"CIUDAD"},
            {"id":2, "nombre":"COMUNA"},
            {"id":3, "nombre":"SECTOR"},
            {"id":4, "nombre":"VENDEDORES"}
        ]
        }); 
        Ext.applyIf(me, {
            items: [
                {
                xtype: 'container',
                margin: 8,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                    items: [
                        {
                            xtype: 'container',
                            height: 640,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    height: 35,
                                    width: 400,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'id_cliente',
                                            name : 'id',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            msgTarget: 'side',
                                            maxHeight: 25,
                                            labelWidth: 40,
                                            width: 150,
                                            fieldLabel: '<b>RUT</b>',
                                            itemId: 'rutId',
                                            name : 'rut'                                           
                                        },{
                                            xtype: 'displayfield',
                                            width: 20
                                           
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Buscar',
                                            maxHeight: 25,
                                            width: 80,
                                            action: 'validarut',
                                            itemId: 'buscarBtn'
                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                           
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>RAZON SOCIAL</b>',
                                            maxHeight: 25,
                                            labelWidth: 80,
                                            width: 555,
                                            itemId: 'nombre_id',
                                            name : 'nombre',
                                            readOnly: true
                                            
                                        },{
                                            xtype: 'displayfield',
                                            width: 20
                                           
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            msgTarget: 'side',
                                            labelWidth: 40,
                                            maxHeight: 25,
                                            width: 100,
                                            fieldLabel: '<b>AÑO</b>',
                                            itemId: 'anoId',
                                            name : 'rut'                                           
                                        },{
                                            xtype: 'displayfield',
                                            width: 20
                                           
                                        },{
                                            xtype: 'combo',
                                            store : tipoInforme,
                                            labelWidth: 60,
                                            itemId: 'tipoonformeId',
                                            width: 310,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            fieldLabel: '<b>INFORME</b>',
                                            forceSelection : true,
                                            name : 'id',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            
                                            //hidden: true
                                            //disabled : true, 
                                        }
                                    ]
                                },{
                                    xtype: 'fieldset',
                                    title: 'Estadisticas',
                                    fieldDefaults: {
                                        labelWidth: 200,
                                        align: 'center'                        
                                    },
                                    items: [
                                    {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>MES</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                        fieldLabel: '<b>VENTAS</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                        fieldLabel: '<b>VENTAS NETAS</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                        fieldLabel: '<b>VENTAS TOTALES</b>',
                                    }]
                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>ENERO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'enero1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'enero2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'enero3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>FEBRERO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'febrero1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'febrero2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'febrero3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>MARZO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'marzo1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'marzo2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'marzo3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>ABRIL</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'abril1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'abril2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'abril3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>MAYO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'mayo1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'mayo2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'mayo3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>JUNIO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'junio1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'junio2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'junio3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>JULIO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'julio1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'julio2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'julio3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>AGOSTO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'agosto1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'agosto2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'agosto3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>SEPTIEMBRE</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'septiembre1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'septiembre2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'septiembre3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>OCTUBRE</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'octubre1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'octubre2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'octubre3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>NOVIEMBRE</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'noviembre1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'noviembre2Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'noviembre3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                },{
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [{
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'center',     
                                    items: [{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        labelWidth: 85,
                                        fieldLabel: '<b>DICIEMBRE</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 15,
                                    },{
                                        xtype: 'textfield',
                                        fieldCls: 'required',
                                        maxHeight: 25,
                                        width: 250,
                                        labelWidth: 150,
                                        allowBlank: false,
                                        name: '',
                                        itemId: 'diciembre1Id',
                                        fieldLabel: '',
                                        readOnly: true
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'diciembre2d',
                                            fieldLabel: '',
                                            readOnly: true


                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 85,
                                    },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            name: '',
                                            itemId: 'diciembre3Id',
                                            fieldLabel: '',
                                            readOnly: true


                                    }]
                                    }]
                                }]
                           }]
                           }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: ['->',
                        {
                            xtype: 'button',
                            iconCls: 'icon-exit',
                            scale: 'large',
                            itemId: 'salidaId',
                            disabled : false,
                            action: '',
                            text: 'Salir'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-exel',
                            scale: 'large',
                            itemId: 'excelId',
                            disabled : false,
                            action: '',
                            text: 'Excel'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-pdf',
                            scale: 'large',
                            itemId: 'pdfId',
                            disabled : false,
                            action: '',
                            text: 'Pdf'
                        },
                        {
                            xtype: 'tbseparator'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        
    }

});
