<?php

  $idEmpleado = $_POST["id"];
  $nombre = $_POST["nombre"];
  $apPaterno = $_POST["apPaterno"];
  $apMaterno = $_POST["apMaterno"];
  $email = $_POST["email"];
  $tipoEmpleado = $_POST["tipoEmpleado"];


  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "cinebdd";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE empleado SET nombre = '$nombre',
                                   ap = '$apPaterno',
                                   am = '$apMaterno',
                                   email = '$email',
                                   tipoEmpleado = '$tipoEmpleado'
                                   WHERE idEmpleado = $idEmpleado";


  try{
    $stmt = $conn->prepare($consulta);

    $stmt->execute();
    echo  "Empleado modificado";
    $conn = null;
  }catch(PDOException $e){
    echo "Erro: ".$e->getMessage();
  }
?>
