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
            fields: ['anno'],
            proxy: {
              type: 'ajax',
                url : preurl +'facturas/get_annos',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
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
                                            //value: new Date("2015"),
                                            //value: '2016',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            displayField: 'anno',
                                            valueField: 'anno',
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
                                            xtype: 'textfield',
                                            itemId: 'valorselector',
                                            fieldLabel: '',
                                            name: 'valorselector',
                                            labelWidth: 50,
                                            width: 250,
                                            valueField: 'id',
                                            maxHeight: 25,
                                            listConfig: {
                                                minWidth: 450
                                            }
                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'idselector',
                                            fieldLabel: '',
                                            name: 'idselector',
                                            labelWidth: 50,
                                            width: 250,
                                            maxHeight: 25,
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'tiposelector',
                                            fieldLabel: '',
                                            name: 'tiposelector',
                                            labelWidth: 50,
                                            width: 250,
                                            maxHeight: 25,
                                            hidden : true                                            
                                        },/*{
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
                                            
                                        },*/{
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
                                                    
                                                    Ext.Ajax.request({
                                                    async: false,
                                                    url: preurl + 'estadisticas/ventas',
                                                    params: {
                                                        idselector: me.down('#idselector').getValue(),
                                                        tiposelector: me.down('#tiposelector').getValue()
                                                    },
                                                   success: function(response_statics, opts) {
                                                        obj_statics = Ext.decode(response_statics.responseText);

                                                        me.down('#enero1Id').setValue(obj_statics.vmes1);
                                                        me.down('#febrero1Id').setValue(obj_statics.vmes2);
                                                        me.down('#marzo1Id').setValue(obj_statics.vmes3);
                                                        me.down('#abril1Id').setValue(obj_statics.vmes4);
                                                        me.down('#mayo1Id').setValue(obj_statics.vmes5);
                                                        me.down('#junio1Id').setValue(obj_statics.vmes6);
                                                        me.down('#julio1Id').setValue(obj_statics.vmes7);
                                                        me.down('#agosto1Id').setValue(obj_statics.vmes8);
                                                        me.down('#septiembre1Id').setValue(obj_statics.vmes9);
                                                        me.down('#octubre1Id').setValue(obj_statics.vmes10);
                                                        me.down('#noviembre1Id').setValue(obj_statics.vmes11);
                                                        me.down('#diciembre1Id').setValue(obj_statics.vmes12);

                                                        me.down('#enero2Id').setValue(obj_statics.cmes1);
                                                        me.down('#febrero2Id').setValue(obj_statics.cmes2);
                                                        me.down('#marzo2Id').setValue(obj_statics.cmes3);
                                                        me.down('#abril2Id').setValue(obj_statics.cmes4);
                                                        me.down('#mayo2Id').setValue(obj_statics.cmes5);
                                                        me.down('#junio2Id').setValue(obj_statics.cmes6);
                                                        me.down('#julio2Id').setValue(obj_statics.cmes7);
                                                        me.down('#agosto2Id').setValue(obj_statics.cmes8);
                                                        me.down('#septiembre2Id').setValue(obj_statics.cmes9);
                                                        me.down('#octubre2Id').setValue(obj_statics.cmes10);
                                                        me.down('#noviembre2Id').setValue(obj_statics.cmes11);
                                                        me.down('#diciembre2Id').setValue(obj_statics.cmes12);                                                    

                                                        me.down('#enero3Id').setValue(obj_statics.dmes1);
                                                        me.down('#febrero3Id').setValue(obj_statics.dmes2);
                                                        me.down('#marzo3Id').setValue(obj_statics.dmes3);
                                                        me.down('#abril3Id').setValue(obj_statics.dmes4);
                                                        me.down('#mayo3Id').setValue(obj_statics.dmes5);
                                                        me.down('#junio3Id').setValue(obj_statics.dmes6);
                                                        me.down('#julio3Id').setValue(obj_statics.dmes7);
                                                        me.down('#agosto3Id').setValue(obj_statics.dmes8);
                                                        me.down('#septiembre3Id').setValue(obj_statics.dmes9);
                                                        me.down('#octubre3Id').setValue(obj_statics.dmes10);
                                                        me.down('#noviembre3Id').setValue(obj_statics.dmes11);
                                                        me.down('#diciembre3Id').setValue(obj_statics.dmes12);    
                                                   },
                                                   failure: function(response, opts) {
                                                      console.log('server-side failure with status code ' + response.status);
                                                   }
                                                });

                                                

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
                                        fieldLabel: '<b>COSTO</b>',
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                    },{
                                        xtype: 'displayfield',
                                        align: 'center',
                                        width: 150,
                                        fieldLabel: '<b>DIFERENCIA</b>',
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
                                            itemId: 'diciembre2Id',
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
