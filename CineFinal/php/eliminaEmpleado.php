<?php

  $idEmpleado = $_POST["id"];


  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "cinebdd";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE empleado SET estado = 0 WHERE idEmpleado = $idEmpleado";


  try{
    $stmt = $conn->prepare($consulta);

    $stmt->execute();
    echo  "Empleado eliminado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
