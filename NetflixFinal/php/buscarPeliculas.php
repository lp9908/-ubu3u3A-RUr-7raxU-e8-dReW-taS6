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
					<th>Titulo</th>
					<th>Director</th> 
					<th>Año</th> 
					<th>Calificacion</th> 
					<th>Duracion</th>
					<th>Clasificacion</th> 
					<th>Reproducciones</th> 
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
		$consultaPre = "SELECT * FROM pelicula ";
		if($valor != 10){
			if($campo == ""){
				
			}else{
				if($tipoBusqueda == 0){
					$consultaPre.= "
						WHERE (idpelicula LIKE '%$campo%' 
						OR titulo LIKE '%$campo%'
						OR director LIKE '%$campo%'
						OR año LIKE '%$campo%')";
				}else if ($tipoBusqueda == 1){
					$consultaPre.= "
						WHERE idpelicula LIKE '%$campo%'";
				}else if ($tipoBusqueda == 2){
					$consultaPre.= "
						WHERE titulo LIKE '%$campo%'";
				}else if ($tipoBusqueda == 3){
					$consultaPre.= "
						WHERE director LIKE '%$campo%'";
				}else if ($tipoBusqueda == 4){
					$consultaPre.= "
						WHERE año LIKE '%$campo%'";
				}else if ($tipoBusqueda == 5){
					$consultaPre.= "
						WHERE clasificacionedad LIKE '%$campo%'";
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
						<td>".$resultados['idpelicula']."</td>
						<td>".$resultados['titulo']."</td>
						<td>".$resultados['director']."</td> 
						<td>".$resultados[3]."</td> 
						<td>".$resultados['calificacion']."</td> 
						<td>".$resultados['duracion']."</td>
						<td>".$resultados['clasificacionedad']."</td> 
						<td>".$resultados['contador']."</td> 
						<td>"."<button type='button'  id='eliminaPeliculaBtn' name='eliminaPeliculaBtn' value='$resultados[0]'>Eliminar</button>"."</td>
						<td>"."<button type='button'  id='modificaPeliculaBtn' name='modificaPeliculaBtn' value='$resultados[0]'>Modificar</button>"."</td>
					</tr>";
			};
		};
		echo $cabecera.$tuplas.$pie;
	} catch (PDOException $e) {
	    echo "Error: " . $e->getMessage();
	}
	$conn = null;
?>