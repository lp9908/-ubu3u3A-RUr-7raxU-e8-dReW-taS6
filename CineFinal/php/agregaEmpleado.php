
<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "cinebdd";

	$idEmpleado = $_POST["idEmpleado"];
	$tipoEmpleado = $_POST["tipoEmpleado"];
	$nombreEmpleado = $_POST["nombreEmpleado"];
	$apEmpleado = $_POST["apEmpleado"];
	$amEmpleado = $_POST["amEmpleado"];
	$emailEmpleado = $_POST["emailEmpleado"];
	$passwordEmpleado = $_POST["passwordEmpleado"];
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
    	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES  \'UTF8\''));
    	// set the PDO error mode to exception
    	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	$sql = "INSERT INTO empleado VALUES ($idEmpleado,'$tipoEmpleado', $estado, '$nombreEmpleado','$apEmpleado', '$amEmpleado', '$emailEmpleado', '$passwordEmpleado')";

    	// use exec() because no results are returned
    	$conn->exec($sql);
    	echo "Empleado agregado";
    }
	catch(PDOException $e){
    	echo $sql . "<br>" . $e->getMessage();
    }

	$conn = null;
?>
