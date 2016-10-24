<?php

  $idProducto = $_POST["id"];
  $nombre = $_POST["nombre"];
  $precioUnitario = $_POST["precioUnitario"];
  $existencia = $_POST["existencia"];
 

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "cinebdd";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE producto SET nombre = '$nombre',
                                   precioUnitario = '$precioUnitario',
								   existencias = '$existencia'
                                   WHERE idProducto = $idProducto";


  try{
    $stmt = $conn->prepare($consulta);

    $stmt->execute();
    echo  "Producto modificado";
    $conn = null;
  }catch(PDOException $e){
    echo "Erro: ".$e->getMessage();
  }
?>