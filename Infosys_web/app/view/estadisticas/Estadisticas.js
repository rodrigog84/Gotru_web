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
        var infoano = Ext.create('Ext.data.Store', {
        fields: ['id', 'nombre'],
        data : [
            {"id":1, "nombre":"2016"},
            {"id":2, "nombre":"2017"},
            {"id":3, "nombre":"2018"},
            {"id":4, "nombre":"2019"},
            {"id":5, "nombre":"2020"},
            {"id":6, "nombre":"2021"},
            {"id":7, "nombre":"2022"}
        ]
        }); 
        var informe = Ext.create('Ext.data.Store', {
        fields: ['id', 'nombre'],
        data : [
            {"id":1, "nombre":"CLIENTE"},
            {"id":2, "nombre":"CIUDAD"},
            {"id":3, "nombre":"COMUNA"},
            {"id":4, "nombre":"SECTOR"},
            {"id":5, "nombre":"VENDEDORES"},
            {"id":6, "nombre":"TIPO NEGOCIO"},
            {"id":7, "nombre":"SUCURSALES"},
            {"id":8, "nombre":"COBRADORES"},
            {"id":9, "nombre":"REPARTIDORES"}
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
                                            xtype: 'combo',
                                            itemId: 'anoId',
                                            fieldLabel: 'AÑO',
                                            name: 'ano',
                                            store: infoano,
                                            labelWidth: 30,
                                            width: 120,
                                            value: 1,
                                            queryMode: 'local',
                                            forceSelection: true,
                                            displayField: 'nombre',
                                            valueField: 'id',
                                            maxHeight: 25
                                            
                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                           
                                        },{
                                            xtype: 'combo',
                                            itemId: 'selectId',
                                            fieldLabel: 'SELECCION',
                                            labelWidth: 80,
                                            width: 285,
                                            name: 'id_seleccion',
                                            store: informe,
                                            queryMode: 'local',
                                            forceSelection: true,
                                            displayField: 'nombre',
                                            valueField: 'id',
                                            maxHeight: 25,
                                             listConfig: {
                                                minWidth: 450
                                            }
                                            
                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                           
                                        },{
                                            xtype: 'combo',
                                            itemId: 'tipoComunaId',
                                            fieldLabel: '',
                                            name: 'id',
                                            labelWidth: 50,
                                            width: 250,
                                            store: 'TipoComunas',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            displayField: 'nombre',
                                            valueField: 'id',
                                            maxHeight: 25,
                                            listConfig: {
                                                minWidth: 450
                                            }
                                            
                                        },{
                                            xtype: 'displayfield',
                                            width: 20
                                           
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Buscar',
                                            maxHeight: 25,
                                            width: 80,
                                            itemId: 'buscarBtn',
                                            handler: function(){
                                                    
                                                    response_statics = Ext.Ajax.request({
                                                    async: false,
                                                    url: preurl + 'facturas/estadisticas'});
                                                    obj_statics = Ext.decode(response_statics.responseText);
                                                    
                                                    me.down('#enero1Id').setValue(obj_statics.mes1);
                                                    me.down('#febrero1Id').setValue(obj_statics.mes2);
                                                    me.down('#marzo1Id').setValue(obj_statics.mes3);
                                                    me.down('#abril1Id').setValue(obj_statics.mes4);
                                                    me.down('#mayo1Id').setValue(obj_statics.mes5);
                                                    me.down('#junio1Id').setValue(obj_statics.mes6);
                                                    me.down('#julio1Id').setValue(obj_statics.mes7);
                                                    me.down('#agosto1Id').setValue(obj_statics.mes8);
                                                    me.down('#septiembre1Id').setValue(obj_statics.mes9);
                                                    me.down('#octubre1Id').setValue(obj_statics.mes10);
                                                    me.down('#noviembre1Id').setValue(obj_statics.mes11);
                                                    me.down('#diciembre1Id').setValue(obj_statics.mes12);


                                                    //Ext.Msg.alert('Atención', obj_email.message);
                                                    //Ext.Msg.alert('Atención', "Email enviado. Favor verificar casilla de correos");
                                            }                                             
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
