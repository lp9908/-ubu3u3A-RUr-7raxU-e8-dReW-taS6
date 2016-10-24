<?php
  $id = $_POST["id"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "DELETE FROM cuenta WHERE idcuenta = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Usuario eliminado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
