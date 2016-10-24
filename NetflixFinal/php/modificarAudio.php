<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE audio SET nombre = '$nombre' WHERE idaudio = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Audio actualizado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
