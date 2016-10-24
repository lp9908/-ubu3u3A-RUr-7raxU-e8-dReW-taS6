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
		$consultaPre = "SELECT * FROM audio ";
		if($valor != 10){
			if($campo == ""){
				
			}else{
				if($tipoBusqueda == 0){
					$consultaPre.= "
						WHERE (idaudio LIKE '%$campo%' 
						OR nombre LIKE '%$campo%')";
				}else if ($tipoBusqueda == 1){
					$consultaPre.= "
						WHERE idaudio LIKE '%$campo%'";
				}else if ($tipoBusqueda == 2){
					$consultaPre.= "
						WHERE nombre LIKE '%$campo%'";
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
						<td>".$resultados['idaudio']."</td>
						<td>".$resultados['nombre']."</td>
						<td>"."<button type='button'  id='eliminaAudioBtn' name='eliminaAudioBtn' value='$resultados[0]'>Eliminar</button>"."</td>
						<td>"."<button type='button'  id='modificaAudioBtn' name='modificaAudioBtn' value='$resultados[0]'>Modificar</button>"."</td>
					</tr>";
			};
		};
		echo $cabecera.$tuplas.$pie;
	} catch (PDOException $e) {
	    echo "Error: " . $e->getMessage();
	}
	$conn = null;
?>