<?php
  $id = $_POST["id"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "DELETE FROM tipocuenta WHERE idtipocuenta = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Tipo de cuenta eliminado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
