<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];
  $precio = $_POST["precio"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE plan SET nombre = '$nombre', precio = '$precio' WHERE idplan = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Plan actualizado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
