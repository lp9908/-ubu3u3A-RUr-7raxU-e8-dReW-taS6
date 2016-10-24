<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "cinebdd";

	$idProducto = $_POST["idProducto"];
	$nombreProducto = $_POST["nombreProducto"];
	$Precio = $_POST["Precio"];
	$existencia = $_POST["existencia"];
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
    	$sql = "INSERT INTO producto VALUES ($idProducto,'$nombreProducto', $Precio,$existencia, $estado)";

    	// use exec() because no results are returned
    	$conn->exec($sql);
    	echo "Producto agregado";
    }
	catch(PDOException $e){
    	echo $sql . "<br>" . $e->getMessage();
    }

	$conn = null;
?>