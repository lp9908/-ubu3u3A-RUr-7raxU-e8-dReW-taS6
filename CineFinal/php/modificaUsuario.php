<?php

  $idUsuario = $_POST["idUsu"];
  $nombre = $_POST["nombreUs"];
  $apPaterno = $_POST["apPaternoUs"];
  $apMaterno = $_POST["apMaternoUs"];
  $email = $_POST["emailUs"];
  $tipoUsuario = $_POST["tipoUs"];
  $passwordUsuario = $_POST["passwordUs"];


  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "cinebdd";

  $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $consulta = "UPDATE usuario SET ";
  $x=0;


  if($nombre != ""){
    $consulta .= "nombre = '$nombre'";
    $x++;
  }


  if($apPaterno != "" && $x!=0){
    $consulta .= ", ap = '$apPaterno'";
    $x++;
  }
  if($apPaterno != "" && $x==0)
      $consulta .= "ap = '$apPaterno'";


  if($apMaterno != "" && $x!=0){
          $consulta .= ", am = '$apMaterno'";
          $x++;
  }
  if($apMaterno != "" && $x==0)
          $consulta .= "am = '$apMaterno'";



  if($email != "" && $x!=0){
          $consulta .= ", email = '$email'";
          $x++;
  }
  if($email != "" && $x==0)
          $consulta .= "email = '$email'";



  if($tipoUsuario != "" && $x!=0){
          $consulta .= ", tipoUsuario = '$tipoUsuario'";
                  $x++;
  }
  if($tipoUsuario != "" && $x==0)
          $consulta .= "tipoUsuario = '$tipoUsuario'";



  if($passwordUsuario != "" && $x!=0){
          $consulta .= ", password = '$passwordUsuario'";
                          $x++;
  }
  if($passwordUsuario != "" && $x==0)
          $consulta .= "password = '$passwordUsuario'";

  $consulta .= " WHERE idUsuario = $idUsuario";

  if($nombre == "" && $apPaterno == "" && $apMaterno == "" && $email == "" && $tipoUsuario == "" && $passwordUsuario == "")
  echo  "No se ingresaron datos para actualizar";
  else{

  //echo  $consulta;

  try{
    $stmt = $conn->prepare($consulta);
    $stmt->execute();
    echo  "Usuario modificado";
    $conn = null;
  }catch(PDOException $e){
   echo "Error: ".$e->getMessage();
  }
}
?>
