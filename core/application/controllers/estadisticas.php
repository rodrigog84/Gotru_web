<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Estadisticas extends CI_Controller {



	public function __construct()
	{
		//error_reporting(0);
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}


	 public function ventas(){


	 	$anno = '2016';
	 	$idselector = $this->input->post('idselector');
	 	$tiposelector = $this->input->post('tiposelector');

	 	if($tiposelector == 'cliente'){

	 		$sql1 = "select month(fecha_factura) as mes, sum(neto) as suma from factura_clientes
							 where year(fecha_factura) = '" . $anno . "' and id_cliente = '" . $idselector . "'
							 group by month(fecha_factura)
							 order by month(fecha_factura)";

			$sql2 = "select month(fecha_factura) as mes, sum(precio_costo) as suma from(
											select id, sum(precio_costo) as precio_costo, fecha_factura	from					 
											(select fc.id, fc.num_factura, fc.fecha_factura, p.id as idproducto, dfc.cantidad, p.p_costo, (dfc.cantidad*p.p_costo) as precio_costo from factura_clientes fc
											inner join detalle_factura_cliente dfc on fc.id = dfc.id_factura
											inner join productos p on dfc.id_producto = p.id
											where year(fc.fecha_factura) = '" . $anno ."'  and id_cliente = '" . $idselector . "') as tmp
											group by id) as tmp
											group by month(fecha_factura)
											order by month(fecha_factura)";	

	 	}else{

	 		$sql1 = "select month(fecha_factura) as mes, sum(neto) as suma from factura_clientes
							 where year(fecha_factura) = '" . $anno . "'
							 group by month(fecha_factura)
							 order by month(fecha_factura)";


			$sql2 = "select month(fecha_factura) as mes, sum(precio_costo) as suma from(
											select id, sum(precio_costo) as precio_costo, fecha_factura	from					 
											(select fc.id, fc.num_factura, fc.fecha_factura, p.id as idproducto, dfc.cantidad, p.p_costo, (dfc.cantidad*p.p_costo) as precio_costo from factura_clientes fc
											inner join detalle_factura_cliente dfc on fc.id = dfc.id_factura
											inner join productos p on dfc.id_producto = p.id
											where year(fc.fecha_factura) = '" . $anno ."') as tmp
											group by id) as tmp
											group by month(fecha_factura)
											order by month(fecha_factura)";							 


	 	}


		 $query = $this->db->query($sql1);

	 	$resultado = $query->result();
	 	$array_meses = array();

	 	$array_meses["vmes1"] = 0;
	 	$array_meses["vmes2"] = 0;
	 	$array_meses["vmes3"] = 0;
	 	$array_meses["vmes4"] = 0;
	 	$array_meses["vmes5"] = 0;
	 	$array_meses["vmes6"] = 0;
	 	$array_meses["vmes7"] = 0;
	 	$array_meses["vmes8"] = 0;
	 	$array_meses["vmes9"] = 0;
	 	$array_meses["vmes10"] = 0;
	 	$array_meses["vmes11"] = 0;
	 	$array_meses["vmes12"] = 0;
	 	foreach ($resultado as $key => $value) {
	 		$array_meses["vmes".$value->mes] = $value->suma;
	 	}


	 	$query = $this->db->query($sql2);
	 	$resultado = $query->result();

	 	$array_meses["cmes1"] = 0;
	 	$array_meses["cmes2"] = 0;
	 	$array_meses["cmes3"] = 0;
	 	$array_meses["cmes4"] = 0;
	 	$array_meses["cmes5"] = 0;
	 	$array_meses["cmes6"] = 0;
	 	$array_meses["cmes7"] = 0;
	 	$array_meses["cmes8"] = 0;
	 	$array_meses["cmes9"] = 0;
	 	$array_meses["cmes10"] = 0;
	 	$array_meses["cmes11"] = 0;
	 	$array_meses["cmes12"] = 0;
	 	foreach ($resultado as $key => $value) {
	 		$array_meses["cmes".$value->mes] = $value->suma;
	 	}


	 	$array_meses["dmes1"] = $array_meses["vmes1"] - $array_meses["cmes1"];
	 	$array_meses["dmes2"] = $array_meses["vmes2"] - $array_meses["cmes2"];
	 	$array_meses["dmes3"] = $array_meses["vmes3"] - $array_meses["cmes3"];
	 	$array_meses["dmes4"] = $array_meses["vmes4"] - $array_meses["cmes4"];
	 	$array_meses["dmes5"] = $array_meses["vmes5"] - $array_meses["cmes5"];
	 	$array_meses["dmes6"] = $array_meses["vmes6"] - $array_meses["cmes6"];
	 	$array_meses["dmes7"] = $array_meses["vmes7"] - $array_meses["cmes7"];
	 	$array_meses["dmes8"] = $array_meses["vmes8"] - $array_meses["cmes8"];
	 	$array_meses["dmes9"] = $array_meses["vmes9"] - $array_meses["cmes9"];
	 	$array_meses["dmes10"] = $array_meses["vmes10"] - $array_meses["cmes10"];
	 	$array_meses["dmes11"] = $array_meses["vmes11"] - $array_meses["cmes11"];
	 	$array_meses["dmes12"] = $array_meses["vmes12"] - $array_meses["cmes12"];

	 	for($i=1;$i<=12;$i++){
	 		$array_meses["vmes".$i] = number_format($array_meses["vmes".$i],0,".",".");
	 		$array_meses["cmes".$i] = number_format($array_meses["cmes".$i],0,".",".");
	 		$array_meses["dmes".$i] = number_format($array_meses["dmes".$i],0,".",".");

	 	}

	 	echo json_encode($array_meses);				

	 }

}









