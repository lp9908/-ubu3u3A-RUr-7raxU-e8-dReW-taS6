<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "cinebdd";

	$idPaquete = $_POST["idPaquete"];
	$nombrePaquete = $_POST["nombrePaquete"];
	$Precio = $_POST["Precio"];
	$estado = 1;
	/*echo "Empleado registrado con <br>";
	echo "ID:  $idEmpleado <br>";
	echo "Tipo Empleado: $tipoEmpleado<br>";
	echo "Nombre Empleado: $nombreEmpleado<br>";
	echo "AP: $apEmpleado<br>";
	echo "AM: $amEmpleado<br>";
	echo "email: $emailEmpleado<br>";
	echo "apsssord: $passwordEmpleado<br>";*/


	try {
    	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    	// set the PDO error mode to exception
    	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	$sql = "INSERT INTO paquete VALUES ($idPaquete,'$nombrePaquete',$Precio,$estado)";

    	// use exec() because no results are returned
    	$conn->exec($sql);
    	echo "Paquete agregado";
    }
	catch(PDOException $e){
    	echo $sql . "<br>" . $e->getMessage();
    }

	$conn = null;
?>