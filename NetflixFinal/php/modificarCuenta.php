<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];
  $email = $_POST["email"];
  $telefono = $_POST["telefono"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE cuenta SET nombre = '$nombre', email = '$email', telefono = '$telefono' WHERE idcuenta = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Cuenta actualizado";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
