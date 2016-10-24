
document.getElementById("agregarPeliculaBtnFin2").addEventListener("click", obtenFormularioPelicula);

function obtenFormularioPelicula(){
	var parametrosPelicula = "";
	parametrosPelicula += "nombre="+document.getElementById("nombrePelicula").value;
	parametrosPelicula += "&clasificacion="+document.getElementById("clasificacionPelicula").value;
	parametrosPelicula += "&genero="+document.getElementById("generoPelicula").value;
	parametrosPelicula += "&duracion="+document.getElementById("duracionPelicula").value;
	parametrosPelicula += "&sinopsis="+document.getElementById("sinopsisPelicula").value;
	parametrosPelicula += "&fechaE="+document.getElementById("fechaEstrenoPelicula").value;
	parametrosPelicula += "&fechaT="+document.getElementById("fechaTerminoPelicula").value;
	parametrosPelicula += "&estado="+document.getElementById("estadoPelicula").value;
	var http_request = false;
	if(window.XMLHttpRequest){
		http_request = new XMLHttpRequest();
	}
	else{
		if(window.ActiveXObject){
			http_request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	//se define la función que procesara la información que sé recibe del servidor
	http_request.onreadystatechange = function (){
		//se checael estado de la petición
		if((http_request.readyState == 4) && (http_request.status == 200)){
			window.alert(http_request.responseText);
		}
	}

	http_request.open("POST", "php/agregaPelicula.php", true);
  	http_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http_request.send(parametrosPelicula);
}
