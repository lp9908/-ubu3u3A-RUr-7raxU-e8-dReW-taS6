<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE formato SET nombre = '$nombre' WHERE idformato = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Formato actualizado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
