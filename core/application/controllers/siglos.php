<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Siglos extends CI_Controller {

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
	        'codigo' => strtoupper($data->nombre),
	        'descripcion' => $data->correlativo
	          
		);

		$this->db->insert('sigla', $data); 

        $resp['success'] = true;

         $this->Bitacora->logger("I", 'sigla', $id);


        echo json_encode($resp);

	}

	public function update(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
	        'codigo' => strtoupper($data->nombre),
	        'descripcion' => $data->correlativo
	    );
		$this->db->where('id', $id);
		
		$this->db->update('sigla', $data); 

        $resp['success'] = true;

         $this->Bitacora->logger("M", 'sigla', $id);


        echo json_encode($resp);

	}

	public function getAll(){
		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');


        $nombre = $this->input->get('nombre');

		$countAll = $this->db->count_all_results("sigla");

		if($nombre){
			$query = $this->db->query('SELECT * FROM sigla WHERE nombre like "%'.$nombre.'%"
			limit '.$start.', '.$limit.'');
		}else{
			
			$query = $this->db->query('SELECT * FROM sigla limit '.$start.', '.$limit.'');
			
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
