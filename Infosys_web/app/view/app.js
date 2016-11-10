Ext.util.Format.thousandSeparator = '.';
//variables globales

//var gbl_site = 'http://localhost/Ferrital_web/';

var gbl_site = 'http://190.151.60.139/Ferrital_web/';
var preurl = gbl_site + 'core/index.php/';
var preurl_img = gbl_site + 'core/archivos/';

var config_iva = 19;
var rol =  "";


Ext.application({
    
	controllers: ["General", "Clientes", "Proveedores", "Productos", 
	              "Ventas", "Facturacion", "Inventario", "Tipo_movimientos",
	              "Correlativos", "Ordencompra", "Cuentas_centralizacion", 
                  "Existencias", "Bitacora", "Tipo_movimientos_inventario",
                  "Preventa", "Pago_caja","CuentasCorrientes","Cotizacion",
                  "Recaudacion", "Notacredito","Caja","Guiasdespacho",
                  "Comisiones", "PedidosCaja"],
    
    views: [
        'Ferrital_web.view.WLogin',
        'Ferrital_web.view.Login',
        'Ferrital_web.view.usuarios.WinAddEditUsuarios',
        'Ferrital_web.view.usuarios.AdminUsuarios',
        'Ferrital_web.view.roles.AdminRoles',
        'Ferrital_web.view.roles.WinAddEditRoles',
        'Ferrital_web.view.CambioPass',
        'Ferrital_web.view.movimiento_diario_inventario.BuscarProductos'
    ],

    name: 'Ferrital_web',
	launch: function() {
        _myAppGlobal = this;

        if(!data_sess.modules){
            Ext.create('Ferrital_web.view.Login');
        }else{
            var vport = Ext.create('Ferrital_web.view.Viewport');
            var mtop = vport.down("topmenus")
            var modules = data_sess.modules
            _myAppGlobal.getController('General').modules_security(modules, mtop);
        }
    }
});