<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Procesos extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}


	public function lectura_csv_fe(){

		 	$archivo = "./facturacion_electronica/csv/FACTURAS.CSV";
			$this->load->model('facturaelectronica');
			$codproceso = $this->facturaelectronica->guarda_csv($archivo);
			$this->facturaelectronica->crea_dte_csv($codproceso);


	}


	public function lectura_csv_fe_manual(){

			$archivo = "./facturacion_electronica/csv/procesados/FACT_PROC_2016084114.CSV";
			$this->load->model('facturaelectronica');
			$codproceso = $this->facturaelectronica->guarda_csv($archivo);
			$this->facturaelectronica->crea_dte_csv($codproceso);


	}


	public function genera_libros_pendientes(){

		$this->db->trans_start();
		// respuesta en texto plano
		set_time_limit(0);
		//header('Content-type: text/plain; charset=ISO-8859-1');

		$this->load->model('facturaelectronica');
		$datos_libros = $this->facturaelectronica->log_libros(NULL,NULL,'P');
		if($datos_libros['total'] > 0){

			$libro_genera = isset($datos_libros['data'][0]) ? $datos_libros['data'][0] : false;
			$id_libro = $libro_genera->id;
			$tipo_libro = $libro_genera->tipo_libro;
			$mes = str_pad($libro_genera->mes,2,"0",STR_PAD_LEFT);
			$anno = $libro_genera->anno;			

			if($tipo_libro == 'VENTA'){
				$lista_facturas = $this->facturaelectronica->datos_dte_periodo($mes,$anno);
			}else{ // COMPRAS
				$lista_facturas = $this->facturaelectronica->datos_dte_proveedores_periodo($mes,$anno);
			}


			//NO TIENE MOVIMIENTOS
			if(count($lista_facturas) == 0){

				$result['success'] = true;
				$result['valido'] = false;
				$result['message'] = "No existen movimientos";
				echo json_encode($result);
				exit;
			}



			$config = $this->facturaelectronica->genera_config();
			include $this->facturaelectronica->ruta_libredte();		

			// Objetos de Firma y LibroCompraVenta
			$Firma = new \sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital
			$LibroCompraVenta = new \sasco\LibreDTE\Sii\LibroCompraVenta();

			
			$empresa = $this->facturaelectronica->get_empresa();

			$rut = $Firma->getId(); 
			$rut_consultante = explode("-",$rut);

			// caratula del libro
			$caratula = [
			    'RutEmisorLibro' => $empresa->rut."-".$empresa->dv,
			    'RutEnvia' => $rut_consultante[0]."-".$rut_consultante[1],
			    'PeriodoTributario' => $anno."-".$mes,
			    'FchResol' => $empresa->fec_resolucion,
			    'NroResol' => $empresa->nro_resolucion,
			    'TipoOperacion' => $tipo_libro,
			    'TipoLibro' => 'MENSUAL',
			    'TipoEnvio' => 'TOTAL',
			    //'FolioNotificacion' => 102006,
			];

			// datos del emisor
			$Emisor = [
			    'RUTEmisor' => $empresa->rut.'-'.$empresa->dv,
			    'RznSoc' => $empresa->razon_social,
			    'GiroEmis' => $empresa->giro,
			    'Acteco' => $empresa->cod_actividad,
			    'DirOrigen' => $empresa->dir_origen,
			    'CmnaOrigen' => $empresa->comuna_origen,
			];


			// generar cada DTE y agregar su resumen al detalle del libro

			foreach ($lista_facturas as $factura) {
				if($factura->dte != ''){ # SOLO CONSIDERA CAMPO DTE.  
					$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
					$EnvioDte->loadXML($factura->dte);
					$Documentos = $EnvioDte->getDocumentos();
					$Documento = $Documentos[0];
				    $LibroCompraVenta->agregar($Documento->getResumen(), false); // agregar detalle sin normalizar
			    }
			}
			
			// enviar libro de ventas y mostrar resultado del envío: track id o bien =false si hubo error
			$LibroCompraVenta->setCaratula($caratula);
			$LibroCompraVenta->setFirma($Firma);
			$xml_libro = $LibroCompraVenta->generar(); 

			if(!file_exists('./facturacion_electronica/tmp/')){
				mkdir('./facturacion_electronica/tmp/',0777,true);
			}		
			//genera archivo		
			//$nombre_archivo = "LIBRO_".$tipo_libro."_".date("YmdHis").".xml";
			$nombre_archivo = "LIBRO_".$tipo_libro."_".$anno.$mes.".xml";
			$f_nombre_archivo = fopen('./facturacion_electronica/libros/'.$nombre_archivo,'w');
			fwrite($f_nombre_archivo,$xml_libro);
			fclose($f_nombre_archivo);

			$existe = $this->facturaelectronica->genera_libro($id_libro,$tipo_libro,$nombre_archivo,$xml_libro);

			$result['success'] = true;
			$result['valido'] = true;
			$result['message'] = $tipo_libro == "COMPRA" ? "Libro de Compras Generado Correctamente" : "Libro de Ventas Generado Correctamente";
			$result['nombre_archivo'] = $nombre_archivo;

			echo json_encode($result);


		}
		$this->db->trans_complete();



	}		


	public function libera_folios(){

			$this->db->where('estado', 'T');
			$this->db->update('folios_caf',array(
											'estado' => 'P')); 



	}	


	public function envio_programado_sii(){
		set_time_limit(0);
		$this->load->model('facturaelectronica');
		$facturas = $this->facturaelectronica->get_factura_no_enviada();

		

		foreach ($facturas as $factura) {
			$idfactura = $factura->idfactura;
			$factura = $this->facturaelectronica->datos_dte($idfactura);
			$config = $this->facturaelectronica->genera_config();
			include $this->facturaelectronica->ruta_libredte();


			$token = \sasco\LibreDTE\Sii\Autenticacion::getToken($config['firma']);
			if (!$token) {
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
			    	$result['error'] = true;

			    }
			    $result['message'] = "Error de conexión con SII";		   
			   	echo json_encode($result);
			    exit;
			}

			$Firma = new \sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital
			$rut = $Firma->getId(); 
			$rut_consultante = explode("-",$rut);
			$RutEnvia = $rut_consultante[0]."-".$rut_consultante[1];

			//$xml = $factura->dte;
			$archivo = "./facturacion_electronica/dte/".$factura->path_dte.$factura->archivo_dte;
		 	if(file_exists($archivo)){
		 		$xml = file_get_contents($archivo);
		 	}else{
		 		$xml = $factura->dte;
		 	}


			$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
			$EnvioDte->loadXML($xml);
			$Documentos = $EnvioDte->getDocumentos();	

			$DTE = $Documentos[0];
			$RutEmisor = $DTE->getEmisor(); 

			// enviar DTE
			$result_envio = \sasco\LibreDTE\Sii::enviar($RutEnvia, $RutEmisor, $xml, $token);

			// si hubo algún error al enviar al servidor mostrar
			if ($result_envio===false) {
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
			        $result['error'] = true;
			    }
			    $result['message'] = "Error de envío de DTE";		   
			   	echo json_encode($result);
			    exit;
			}

			// Mostrar resultado del envío
			if ($result_envio->STATUS!='0') {
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
					$result['error'] = true;
			    }
			    $result['message'] = "Error de envío de DTE";		   
			   	echo json_encode($result);
			    exit;
			}


			$track_id = 0;
			$track_id = (int)$result_envio->TRACKID;
		    $this->db->where('id', $factura->id);
			$this->db->update('folios_caf',array('trackid' => $track_id)); 

			$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);
			
			if($track_id != 0 && $datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
				$this->facturaelectronica->envio_mail_dte($idfactura);
			}

			echo "idfactura: " .$factura->id." -- folio : ".$factura->folio." -- trackid : ". $track_id . "<br>";
			ob_flush(); 

			$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);
			if($track_id != 0 && $datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
				$this->facturaelectronica->envio_mail_dte($idfactura);
			}
			

			$result['success'] = true;
			$result['message'] = $track_id != 0 ? "DTE enviado correctamente" : "Error en env&iacute;o de DTE";
			$result['trackid'] = $track_id;
			echo json_encode($result);
			
		}

	}	

}









