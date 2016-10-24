<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "cinebdd";

	//Obtenemos valores para el registro
	$idUsuario = $_POST["idUsuario"];
	$tipoUsuario = $_POST["tipoUsuario"];
	$passwordUsuario = $_POST["passwordUsuario"];
	$nombreUsuario = $_POST["nombreUsuario"];
	$apUsuario = $_POST["apPaternoUsuario"];
	$amUsuario = $_POST["apMaternoUsuario"];
	$emailUsuario = $_POST["emailUsuario"];
	$estado = 1;

	/*echo("ID: $idUsuario<br>");
	echo("tipoUsuario: $tipoUsuario<br>");
	echo("passwordUSuario: $passwordUsuario<br>");
	echo("nombreUsuario: $nombreUsuario<br>");
	echo("apUsuario: $apUsuario<br>");
	echo("amUsuario: $amUsuario<br>");
	echo("emailUsuario: $emailUsuario<br>");*/

	try{
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "INSERT INTO usuario VALUES($idUsuario,'$tipoUsuario','$passwordUsuario','$nombreUsuario', '$apUsuario','$amUsuario','$estado','$emailUsuario')";
		$conn->exec($sql);
		echo("Usuario registrado");
	}
	catch(PDOException $e){
		echo($sql."<br>".$e->getMessage());
	}

		$conn = null;
?>
