<?php
	$tipoBusqueda = $_POST["tipoBusqueda"];
	$campo = $_POST["campo"];
	$valor = $_POST["valor"];
	
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "netflix";

	$cabecera = "
	<div class='table-responsive'>
		<table class='table'>
			<thead>
				<tr>
					<th>ID</th>
					<th>Nombre</th>
					<th>Email</th>
					<th>Telefono</th> 
					<th>Fecha facturacion</th>
					<th>Tipo de Cuenta</th> 
					<th>Numero de tarjeta</th>
					<th>Plan</th> 
					<th>Eliminar</th>
					<th>Modificar</th>
				</tr>
			</thead>
			<tbody>";

    $pie = "</tbody>
		</table>
	</div>";

	try{
	    $conn = new mysqli($servername, $username, $password, $dbname);
		$d = date('Y-m-j');
		$consultaPre = "SELECT * FROM cuenta ";
		if($valor != 10){
			if($campo == ""){
				
			}else{
				if($tipoBusqueda == 0){
					$consultaPre.= "
						WHERE (idcuenta LIKE '%$campo%' 
						OR nombre LIKE '%$campo%'
						OR email LIKE '%$campo%'
						OR telefono LIKE '%$campo%')";
				}else if ($tipoBusqueda == 1){
					$consultaPre.= "
						WHERE idcuenta LIKE '%$campo%'";
				}else if ($tipoBusqueda == 2){
					$consultaPre.= "
						WHERE nombre LIKE '%$campo%'";
				}else if ($tipoBusqueda == 3){
					$consultaPre.= "
						WHERE email LIKE '%$campo%'";
				}else if ($tipoBusqueda == 4){
					$consultaPre.= "
						WHERE telefono LIKE '%$campo%'";
				}
			}
			
		}
		//echo "".$consultaPre;
		$consulta = mysqli_query($conn, $consultaPre);
		$filas = mysqli_num_rows($consulta);
		$tuplas ="";
		$estadoaux = 0;
		if ($filas == 0) {
			echo "<p>No hay generos que concidan con la busqueda</p>";
		} else {
			echo '<p>Resultados';
			if($campo != ""){
				echo 'para <strong>'.$campo.'</strong></p></br>';
			}
			while($resultados = mysqli_fetch_array($consulta)) {
				$tuplas.="
						<td>".$resultados['idcuenta']."</td>
						<td>".$resultados['nombre']."</td>
						<td>".$resultados['email']."</td>
						<td>".$resultados['telefono']."</td>";
						
				$consultaPre1 = "SELECT * FROM facturacion WHERE idfactura = ".$resultados['idfactura'];
				$consulta1 = mysqli_query($conn, $consultaPre1);
				$resultados1 = mysqli_fetch_array($consulta1);		
				$tuplas.="
						<td>".$resultados1['proximaFecha']."</td>";
						
				$consultaPre2 = "SELECT * FROM tipocuenta WHERE idtipoCuenta = ".$resultados['idtipoCuenta'];
				$consulta2 = mysqli_query($conn, $consultaPre2);
				$resultados2 = mysqli_fetch_array($consulta2);		
				$tuplas.="
						<td>".$resultados2['nombre']."</td>";		
						
				$tuplas.="
						<td>".$resultados['idtarjeta']."</td>";	
						
				$consultaPre3 = "SELECT * FROM plan WHERE idplan = ".$resultados['idplan'];	
				$consulta3 = mysqli_query($conn, $consultaPre3);
				$resultados3 = mysqli_fetch_array($consulta3);	
				$tuplas.="
						<td>".$resultados3['nombre']."</td>";	
				$tuplas.="		
						<td>"."<button type='button'  id='eliminaCuentaBtn' name='eliminaCuentaBtn' value='$resultados[0]'>Eliminar</button>"."</td>
						<td>"."<button type='button'  id='modificaCuentaBtn' name='modificaCuentaBtn' value='$resultados[0]'>Modificar</button>"."</td>
					</tr>";
			};
		};
		echo $cabecera.$tuplas.$pie;
	} catch (PDOException $e) {
	    echo "Error: " . $e->getMessage();
	}
	$conn = null;
?>