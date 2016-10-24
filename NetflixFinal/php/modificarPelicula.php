<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];
  $director = $_POST["director"];
  $anio = $_POST["anio"];
  $duracion = $_POST["duracion"];
  $clasificacion = $_POST["clasificacion"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "netflix";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE pelicula SET titulo = '$nombre', director = '$director', duracion = '$duracion', clasificacionedad = '$clasificacion' WHERE idpelicula = $id";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Pelicula actualizada";
    $conn = null;
  }catch(PDOException $e){
    echo "Error: ".$e->getMessage();
  }
?>
