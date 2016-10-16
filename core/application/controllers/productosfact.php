<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Productosfact extends CI_Controller {

	public function __construct()
	{
		parent::__construct();		
		$this->load->database();
	}

	public function buscacodigoboleta(){

		$resp = array();
		$nombres = $this->input->post('codigo');
		$idlista = $this->input->post('idlista');
		$idbodega = $this->input->post('idlista');


		$query2 = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.codigo_barra = "'.$nombres.'"');

		if($query2->num_rows()>0){
	   			$row = $query2->first_row();
			   	$id_producto=$row->id;
			   	$query = $this->db->query('SELECT acc.*, ca.nombre as nom_medida, p.stock as stock, p.codigo as codigo, p.nombre as nombre, p.codigo_barra as codigo_barra
				FROM detalle_lista_precios acc
				left join mae_medida ca on (acc.id_medida = ca.id)
				left join productos p on (acc.id_producto = p.id)		
				WHERE acc.id_lista = "'.$idlista.'" and acc.id_producto = "'.$id_producto.'" ');

				if($query->num_rows()>0){
			   			$row = $query->first_row();
			   			$query2 = $this->db->query('SELECT acc.*, c.nombre as nom_bodega FROM existencia acc
					left join bodegas c on (acc.id_bodega = c.id)
					WHERE acc.id_producto = "'.$id_producto.'" and acc.id_bodega = "'.$idbodega.'" ');
		            foreach ($query2->result() as $row2)
					{
						$stock = $row2->stock;
						$nombodega = $row2->nom_bodega;
					}

					$row->stock=$stock;
					$row->nom_bodega=$nombodega;

					$data[] = $row;
					   	$resp['cliente'] = $row;
				        $resp['success'] = true;
			   	}else{

			   		 $resp['success'] = false;

			   	}
	   	}else{

	   		 $resp['success'] = false;

	   		
	   	};	

	   	
        echo json_encode($resp);

	}

	public function buscacodigo(){

		$resp = array();
		$nombres = $this->input->post('codigo');
		$idlista = $this->input->post('idlista');
		$idbodega = $this->input->post('idlista');


		$query2 = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.codigo = "'.$nombres.'"');

		if($query2->num_rows()>0){
	   			$row = $query2->first_row();
			   	$id_producto=$row->id;
			   	$query = $this->db->query('SELECT acc.*, ca.nombre as nom_medida, p.stock as stock, p.codigo as codigo, p.nombre as nombre 
				FROM detalle_lista_precios acc
				left join mae_medida ca on (acc.id_medida = ca.id)
				left join productos p on (acc.id_producto = p.id)		
				WHERE acc.id_lista = "'.$idlista.'" and acc.id_producto = "'.$id_producto.'" ');

				if($query->num_rows()>0){
			   			$row = $query->first_row();
			   			$query2 = $this->db->query('SELECT acc.*, c.nombre as nom_bodega FROM existencia acc
					left join bodegas c on (acc.id_bodega = c.id)
					WHERE acc.id_producto = "'.$id_producto.'" and acc.id_bodega = "'.$idbodega.'" ');
		            foreach ($query2->result() as $row2)
					{
						$stock = $row2->stock;
						$nombodega = $row2->nom_bodega;
					}

					$row->stock=$stock;
					$row->nom_bodega=$nombodega;

					$data[] = $row;
					   	$resp['cliente'] = $row;
				        $resp['success'] = true;
			   	}else{

			   		 $resp['success'] = false;

			   	}
	   	}else{

	   		 $resp['success'] = false;

	   		
	   	};	

	   	
        echo json_encode($resp);

	}

	public function getAlllista(){

		$resp = array();

        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $cero=0;
        //filtro por nombre
        $idlista = $this->input->get('idlista');
        $nombres = $this->input->get('nombre');
        $idbodega = $this->input->get('idbodega');
		$countAll = $this->db->count_all_results("detalle_lista_precios");

		
		if($nombres){

			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "p.nombre like '%".$nombre."%' and ";
	        }
	        
			$query = $this->db->query('SELECT acc.*, ca.nombre as nom_medida, p.stock as stock, p.codigo as codigo, p.codigo_barra as codigo_barra, p.nombre as nombre FROM detalle_lista_precios acc
			left join mae_medida ca on (acc.id_medida = ca.id)
			left join productos p on (acc.id_producto = p.id)
			WHERE acc.id_lista = "'.$idlista.'" and ' . $sql_nombre . ' 1 = 1');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

		}else{
			$query = $this->db->query('SELECT acc.*, ca.nombre as nom_medida, p.stock as stock, p.codigo as codigo, p.codigo_barra as codigo_barra, p.nombre as nombre FROM detalle_lista_precios acc
			left join mae_medida ca on (acc.id_medida = ca.id)
			left join productos p on (acc.id_producto = p.id)
			WHERE acc.id_lista = "'.$idlista.'"
			limit '.$start.', '.$limit.'
		     ' );
		}

		$data = array();
		
		foreach ($query->result() as $row)
		{
            $query2 = $this->db->query('SELECT acc.*, c.nombre as nom_bodega FROM existencia acc
			left join bodegas c on (acc.id_bodega = c.id)
			WHERE acc.id_producto = "'.$row->id_producto.'" and acc.id_bodega = "'.$idbodega.'" ');
            foreach ($query2->result() as $row2)
			{
				$stock = $row2->stock;
				$nombodega = $row2->nom_bodega;
			}

			//$row->stock=$stock;
			//$row->nom_bodega=$nombodega;

			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAlllista2(){

		$resp = array();
        $nombre = $this->input->get('nombre');
        $opcion = $this->input->get('opcion');
        $lista = $this->input->get('lista');

        if(!$opcion){        	
        	$opcion="Todos";
        };
       
        if($opcion=="Codigo"){

        	$query = $this->db->query('SELECT acc.*, c.nombre as nombre, c.codigo as 	
        	codigo, b.nombre as nom_bodega, acc.valor as p_venta
        	FROM detalle_lista_precios acc
			left join bodegas b on (acc.id_bodega = b.id)	
			left join productos c on (acc.id_producto = c.id)
			left join mae_medida m on (acc.id_medida = m.id)
			WHERE c.codigo = "'.$nombre.'" and acc.id_lista = "'.$lista.'"');        	

        };

        if($opcion=="Nombre"){

        	$query = $this->db->query('SELECT acc.*, c.nombre as nombre, c.codigo as 	
        	codigo, b.nombre as nom_bodega, acc.valor as p_venta
        	FROM detalle_lista_precios acc
			left join bodegas b on (acc.id_bodega = b.id)	
			left join productos c on (acc.id_producto = c.id)
			left join mae_medida m on (acc.id_medida = m.id)
			WHERE c.nombre = "'.$nombre.'" and acc.id_lista = "'.$lista.'"');        	

        };

        if($opcion=="Todos"){

        	$query = $this->db->query('SELECT acc.*, c.nombre as nombre, c.codigo as 	
        	codigo, b.nombre as nom_bodega, acc.valor as p_venta
        	FROM detalle_lista_precios acc
			left join bodegas b on (acc.id_bodega = b.id)	
			left join productos c on (acc.id_producto = c.id)
			left join mae_medida m on (acc.id_medida = m.id)
			WHERE acc.id_lista = "'.$lista.'"');       	

        };

        foreach ($query->result() as $row)
		{
			$data[] = $row;
		}
        $resp['success'] = true;
        //$resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);

	}	
	
	public function getAll(){
		$resp = array();

        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        //filtro por nombre
        $nombres = $this->input->get('nombre');
        $familia = $this->input->get('familia');
        $subfamilia = $this->input->get('subfamilia');
        $agrupacion = $this->input->get('agrupacion');
        
		$countAll = $this->db->count_all_results("productos");
        
		if($nombres){

			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "acc.nombre like '%".$nombre."%' and ";
	        }
	        
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia, ca.nombre as nom_medida, ca.cantidad as cantidad_medida FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE ' . $sql_nombre . ' 1 = 1');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

		}else if($familia) {
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia, ca.nombre as nom_medida, ca.cantidad as cantidad_medida FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_familia like "%'.$familia.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			
		}else if($subfamilia) {
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia, ca.nombre as nom_medida, ca.cantidad as cantidad_medida FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_subfamilia like "%'.$subfamilia.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
			

		}else if($agrupacion) {
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia, ca.nombre as nom_medida, ca.cantidad as cantidad_medida FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE acc.id_agrupacion like "%'.$agrupacion.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
			
			

		}else{
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia, ca.nombre as nom_medida, ca.cantidad as cantidad_medida FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			limit '.$start.', '.$limit.'
		     ' );
		}

		$data = array();
		
		foreach ($query->result() as $row)
		{
			$row->p_neto = intval($row->p_venta/1.19);
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}
}
