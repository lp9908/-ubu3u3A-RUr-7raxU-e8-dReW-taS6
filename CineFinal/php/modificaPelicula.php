<?php
  $id = $_POST["id"];
  $nombre = $_POST["nombre"];
  $clasificacion = $_POST["clasificacion"];
  $genero = $_POST["genero"];
  $duracion = $_POST["duracion"];
  $sinopsis = $_POST["sinopsis"];
  $fechaEstreno = $_POST["fechaEstreno"];
  $fechaTermino = $_POST["fechaTermino"];
  $estado = $_POST["estado"];


  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "cinebdd";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = 	"UPDATE pelicula SET
				fechaEstreno = '$fechaEstreno',
                fecharTermino = '$fechaTermino',
                clasificacion = '$clasificacion',
                genero = '$genero',
                duracion = '$duracion',
				sinopsis = '$sinopsis',
				nombre = '$nombre',
				estado = '$estado'
                WHERE idPelicula = '$id'";

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Pelicula modificada";
    $conn = null;
  }catch(PDOException $e){
    echo "Erro: ".$e->getMessage();
  }
?>
