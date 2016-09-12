<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cobrador extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function save(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->nombre;

		$data = array(
			'rut' => $data->rut,
	        'nombre' => strtoupper($data->nombre),
	        'direccion' => $data->direccion,
	        'telefono' => $data->telefono,
	        'observacion' => $data->observacion
	          
		);

		$this->db->insert('cobradores', $data); 

        $resp['success'] = true;

        $this->Bitacora->logger("I", 'cobradores', $id);


        echo json_encode($resp);

	}

	public function update(){

		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
	        'rut' => $data->rut,
	        'nombre' => strtoupper($data->nombre),
	        'direccion' => $data->direccion,
	        'telefono' => $data->telefono,
	        'observacion' => $data->observacion
	    );
		$this->db->where('id', $id);
		
		$this->db->update('cobradores', $data); 

        $resp['success'] = true;

         $this->Bitacora->logger("M", 'cobradores', $id);


        echo json_encode($resp);

	}

	public function getAll(){
		
		$resp = array();
        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $nombre = $this->input->get('nombre');

		$countAll = $this->db->count_all_results("cobradores");

		if($nombre){
			$query = $this->db->query('SELECT * FROM cobradores WHERE nombre like "%'.$nombre.'%"
			limit '.$start.', '.$limit.'');
		}else{
			
			$query = $this->db->query('SELECT * FROM cobradores limit '.$start.', '.$limit.'');
			
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
