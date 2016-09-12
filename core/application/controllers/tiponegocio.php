<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tiponegocio extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function save(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->descripcion;

		$data = array(
	        'codigo' => $data->codigo,
	        'descripcion' => strtoupper($data->descripcion)
	          
		);

		$this->db->insert('tiponegocio', $data); 

        $resp['success'] = true;

         $this->Bitacora->logger("I", 'tiponegocio', $id);


        echo json_encode($resp);

	}

	public function update(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
	        'codigo' => $data->codigo,
	        'descripcion' => strtoupper($data->descripcion)
	          
	    );
		$this->db->where('id', $id);
		
		$this->db->update('tiponegocio', $data); 

        $resp['success'] = true;

         $this->Bitacora->logger("M", 'tiponegocio', $id);


        echo json_encode($resp);

	}

	public function getAll(){
		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');


        $nombre = $this->input->get('nombre');

		$countAll = $this->db->count_all_results("tiponegocio");

		if($nombre){
			$query = $this->db->query('SELECT * FROM tiponegocio WHERE nombre like "%'.$nombre.'%"
			limit '.$start.', '.$limit.'');
		}else{
			
			$query = $this->db->query('SELECT * FROM tiponegocio limit '.$start.', '.$limit.'');
			
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
