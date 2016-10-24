<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE genero SET tipogenero = '$nombre' WHERE idgenero = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Genero actualizado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
