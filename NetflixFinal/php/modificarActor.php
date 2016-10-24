<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE actor SET nombre = '$nombre' WHERE idactor = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Actor actualizado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
