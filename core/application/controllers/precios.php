<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Precios extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function verificar(){

		$resp = array();
		$nombre = $this->input->post('nombre');

		$query = $this->db->query('SELECT * FROM precios WHERE nombre ='.$nombre.'');
		
		if($query->num_rows()>0){

			 $resp['success'] = true;
		
		}else{

			 $resp['success'] = false;
			

		}	

		echo json_encode($resp);




	}

	public function actualiza(){

		$this->db->trans_start();
		set_time_limit(0);
		$resp = array();
		$idlista = $this->input->post('idlista');
		$margen = $this->input->post('margen');

		$query = $this->db->query('SELECT acc.*, c.codigo as cod_producto,
			c.nombre as nom_producto, c.p_venta as valor_pro FROM detalle_lista_precios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE acc.id_lista = "'.$idlista.'" '
			);
			

		if($query->num_rows()>0){
			$data = $query->result();
	   		foreach ($data as $row)
			{
            $producto = $row->id_producto;
            $id = $row->id;
            $valor = $row->valor_pro;
            $valor = (($valor * $margen)/100);
            $valor = ($row->valor_pro - $valor);
			$datos = array(
			 'valor' => $row->valor_pro,
			 'porcentaje' => $margen,
			 'valor_lista' => $valor,
			 'id_bodega' =>1,
			);

	    	$this->db->where('id', $id);

	    	$this->db->update('detalle_lista_precios', $datos);
	    	};
			$datos2 = array(
			 'margen' => $margen
			);


			$this->db->where('id', $idlista);

	    	$this->db->update('precios', $datos2);

	        $resp['success'] = true;
	        
	   }else{
	   	    $resp['success'] = false;
	   	    
	   };

	  $this->db->trans_complete();

	   echo json_encode($resp);
	   //return false;

	}

	public function borrar(){

		$resp = array();

		$query = $this->db->query('SELECT acc.*, c.codigo as cod_producto,
			c.nombre as nom_producto FROM precios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE acc.estado = " " '
			);
			
			
		if($query->num_rows()>0){

	   		foreach ($query->result() as $row)
			{
            $producto = $row->id_producto;
            $id = $row->id;
            $query = $this->db->query('DELETE FROM precios WHERE id = "'.$id.'"');
		    							
			};

	        $resp['success'] = true;
	        
	   }else{
	   	    $resp['success'] = false;
	   	    
	   };

	   echo json_encode($resp);
	   //return false;

	}

	
	public function save(){

		$resp = array();

		$fecha = $this->input->post('fecha');
		$numero = $this->input->post('numero');
		$nombre = $this->input->post('nombre');
		$margen = $this->input->post('margen');
		$items = json_decode($this->input->post('items'));
		//$usuario = $this->Bitacora->logger;

		$precios = array(
	        'numero' => $numero,
	        'fecha' => $fecha,
	        'margen' => $margen,
	        'nombre' => $nombre
		);

		$this->db->insert('precios', $precios); 
		$idprecio = $this->db->insert_id();
		
		foreach($items as $v){
		$detalleprecios = array(
			'id_lista' => $idprecio,
	        'id_producto' => $v->id_producto,
	        'id_medida' => $v->id_medida,
	        'porcentaje	' => $v->porcentaje,
	        'valor' => $v->valor,
	        'valor_lista' => $v->valor_lista

		);

		$this->db->insert('detalle_lista_precios', $detalleprecios); 
		};

		$resp['success'] = true;
		
        echo json_encode($resp);
	}
	    
	public function update(){

		$resp = array();
		set_time_limit(0);
		$fecha = $this->input->post('fecha');
		$numero = $this->input->post('numero');
		$nombre = $this->input->post('nombre');
		$margen = $this->input->post('margen');
		$id = $this->input->post('id');
		$items = json_decode($this->input->post('items'));
		$uno="1";
		$query = $this->db->query('DELETE FROM detalle_lista_precios WHERE id_lista = "'.$id.'"');

		$precios = array(
	        'numero' => $numero,
	        'fecha' => $fecha,
	        'margen' => $margen,
	        'nombre' => $nombre
		);

		$this->db->where('id', $id);

	    $this->db->update('precios', $precios);

			
		foreach($items as $v){
		$detalleprecios = array(
			'id_lista' => $id,
	        'id_producto' => $v->id_producto,
	        'id_medida' => $v->id_medida,
	        'id_bodega' => $uno,
	        'porcentaje' => $margen,
	        'valor' => $v->valor,
	        'valor_lista' => $v->valor_lista

		);

		$this->db->insert('detalle_lista_precios', $detalleprecios); 
		};


		$resp['success'] = true;
		$resp['lista']=$uno;
		
        echo json_encode($resp);
	}
	
	
	public function rescatar(){

		$resp = array();

        $config['upload_path'] = "./cargas/"	;
        $config['file_name'] = 'archivo_precios';
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;

        $fecha = $this->input->post('fecha_subida');
          //list($dia, $mes, $anio) = explode("-",$fecha);
          //$fecha2 = $anio ."-". $mes ."-". $dia;
		$numero = $this->input->post('numero');
        $this->load->library('upload', $config);

        if (!$this->upload->do_upload("archivo")) {
            print_r($this->upload->data()); 
            print_r($this->upload->display_errors());
            $error = true;
            $message = "Error en subir archivo.  Intente nuevamente";
        };

        $data_file_upload = $this->upload->data();

		$nombre_archivo = $config['upload_path'].$config['file_name'].$data_file_upload['file_ext'];

		$this->load->library('PHPExcel');	       		
				//read file from path
		$objPHPExcel = PHPExcel_IOFactory::load($nombre_archivo);
		 //get only the Cell Collection
		$cell_collection = $objPHPExcel->getActiveSheet()->getCellCollection();

		//extract to a PHP readable array format
		foreach ($cell_collection as $cell) {
			    $column = $objPHPExcel->getActiveSheet()->getCell($cell)->getColumn();
			    $row = $objPHPExcel->getActiveSheet()->getCell($cell)->getRow();

			    $data_value = $objPHPExcel->getActiveSheet()->getCell($cell)->getValue();
			   //header will/should be in row 1 only. of course this can be modified to suit your need.
			    if ($row < 4) {
				$header[$row][$column] = $data_value;
			    } else {
				$arr_data[$row][$column] = $data_value;
			    };
		};

	foreach ($arr_data as $precio) {
		
		$id = $precio['A'];
		$codigo = $precio['B'];
		$nombre = $precio['C'];
		$precio_venta = $precio['D'];
		$stock = $precio['E'];

		if ($id > 0){

		$query = $this->db->query('SELECT * FROM productos WHERE id ='.$id.'');			
		
		foreach ($query->result() as $row)
		{
			$p_venta = $row->p_venta;
		}

		$precios = array(
			'numero' => $numero,
	        'fecha' => date('Y-m-d'),
	        'id_producto' => $id,
	        'valor_original' => $p_venta,
	        'nuevalor' => $precio_venta,
	        'stock' => $stock
		);

		$this->db->insert('precios', $precios);

	    };
		};

		 $resp['success'] = true;
         echo json_encode($resp);	

	}

	public function getAll2(){

		$resp = array();
        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombres = $this->input->get('nombre');
           
		$countAll = $this->db->count_all_results("detalle_lista_precios");

		$query = $this->db->query('SELECT acc.*, c.nombre as nom_producto, c.codigo as codigo, m.nombre as nom_medida, b.nombre as nom_bodega, e.stock as stock FROM detalle_lista_precios acc
		    left join existencia e on (acc.id_producto = e.id)
		    left join bodegas b on (e.id_bodega = b.id)	
			left join productos c on (e.id_producto = c.id)
			left join mae_medida m on (acc.id_medida = m.id)
			
							
			WHERE acc.id_lista = "'.$nombres.'"');
		$data = array();
						
		foreach ($query->result() as $row)
		{
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

		
	

	public function getAll(){
		
		$resp = array();
        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombres = $this->input->get('nombre');
        $opcion =  $this->input->get('opcion');
        
        if (!$opcion){        	
        	$opcion = "Todos";
        };

        $countAll = $this->db->count_all_results("precios");
        
		
		if($opcion == "Nombre"){

			if($nombres) {	        
		
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "acc.nombre like '%".$nombre."%' and ";
	        }

	        $query = $this->db->query('SELECT * FROM precios WHERE ' . $sql_nombre . '');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

		}

		};

		if($opcion == "Todos"){				   
		
			$query = $this->db->query('SELECT * FROM precios ');
			
		}
	
		
		$data = array();
						
		foreach ($query->result() as $row)
		{
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}
}
