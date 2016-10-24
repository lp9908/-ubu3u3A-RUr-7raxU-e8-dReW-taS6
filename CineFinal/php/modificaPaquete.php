<?php

  $idPaquete = $_POST["id"];
  $nombre = $_POST["nombre"];
  $precio = $_POST["precio"];
 

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "cinebdd";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE paquete SET nombre = '$nombre',
                                   precio = '$precio'
                                   WHERE idPaquete = $idPaquete";


  try{
    $stmt = $conn->prepare($consulta);

    $stmt->execute();
    echo  "Paquete modificado";
    $conn = null;
  }catch(PDOException $e){
    echo "Erro: ".$e->getMessage();
  }
?>