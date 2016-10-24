<?php

	//variables a procesar
	//$tipoBusqueda = $_POST["tipoBusqueda"];
	$campo = $_POST["campoUs"];
	$estado = $_POST["estadoUs"];
	$valor = $_POST["valorUs"];
	$tipoBusqueda = $_POST["tipoBusquedaUs"];


	//variables para la conexión
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "cinebdd";

	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$consulta = "";
	//codigo para crear la tabla
	$cabecera = "<div class='table-responsive'>
  <table class='table'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Tipo de Usuario</th>
				<th>Estado</th>
        <th>Nombre</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
				<th>Email</th>
				<th>Password</th>
				<th></th>
				<th></th>
      </tr>
    </thead>
    <tbody>";

    $pie="</tbody>
  </table>
  </div>";

	//se evalua el valor de entrada para ver si se meustran todos o no
	if($valor == 10){
		try{
			$consulta .= "SELECT * FROM usuario";
			$stmt = $conn->prepare($consulta);
		}
		catch(PDOException $e) {
		  echo "Error: " . $e->getMessage();
		}
	}
	else {
			try {
				if($estado == 3 && $campo == ""){
					$consulta .= "SELECT * FROM usuario
																		WHERE idUsuario LIKE '%$campo%'
																		OR nombre LIKE '%$campo%'
																		OR tipoUsuario LIKE '%$campo%'
																		OR nombre LIKE '%$campo%'
																		OR ap LIKE '%$campo%'
																		OR am LIKE '%$campo%'
																		OR email LIKE '%$campo%'
																		";

				}
				else{
					if($estado == 0 && $campo == ""){
								$consulta .= "SELECT * FROM usuario WHERE estado LIKE '$estado'";
					}
					if($estado == 1 && $campo == ""){
						$consulta .= "SELECT * FROM usuario WHERE estado LIKE '$estado'";
					}
					if(($estado == 0 || $estado == 1 || $estado == 3) && $campo != ""){

							if($estado == 3){
								$consulta .= "SELECT * FROM usuario WHERE (estado LIKE '1' OR estado LIKE '0')";
							}
							else{
									$consulta .= "SELECT * FROM usuario WHERE estado LIKE '$estado'";
							}
							switch ($tipoBusqueda) {
								case 1:
									$consulta .= " AND idUsuario = $campo";
								break;
								case 2:
									$consulta .= " AND tipoUsuario like '%$campo%'";
								break;
								case 3:
									$consulta .= " AND nombre like '%$campo%'";
								break;
								case 4:
									$consulta .= " AND ap like '%$campo%'";
								break;
								case 5:
									$consulta .= " AND am like '%$campo%'";
								break;
								case 6:
									$consulta .= " AND email like '%$campo%'";
								break;
								default:
									$consulta .= " AND	(idUsuario LIKE '%$campo%' OR nombre LIKE '%$campo%' OR tipoUsuario LIKE '%$campo%'
																					OR nombre LIKE '%$campo%' OR ap LIKE '%$campo%' OR am LIKE '%$campo%' OR email LIKE '%$campo%')";
								break;
							}

					}
				}



				$stmt = $conn->prepare($consulta);
				//echo $consulta;
			}
			catch(PDOException $e) {
				//echo "Error: " . $e->getMessage();
			}
		}

		try{
			$stmt->execute();
			$tuplas ="";
			// set the resulting array to associative
			while($datos = $stmt->fetch(PDO::FETCH_BOTH)){
			  $tuplas.="<tr>
			    <td>".$datos[0]."</td>
			    <td>".$datos[1]."</td>
			    <td>".$datos[6]."</td>
			    <td>".$datos[3]."</td>
			    <td>".$datos[4]."</td>
			    <td>".$datos[5]."</td>
			    <td>".$datos[7]."</td>
			    <td>".$datos[2]."</td>
					<td>"."<button type='button'  id='eliminaUsuarioBtn' name='eliminaUsuarioBtn' value='$datos[0]'>Eliminar</button>"."</td>
					<td>"."<button type='button'  id='modificaUsuarioBtn' name='modificaUsuarioBtn' value='$datos[0]'>Modificar</button>"."</td>
					</tr>";
			}
			echo $cabecera.$tuplas.$pie;
		}
		catch(PDOException $e) {
			echo "No hay registro";
		}

?>
