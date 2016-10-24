var parametrosUs = "";
document.getElementById("agregarUsuarioBtnFin").addEventListener("click", enviaUsuario);


function obtenFormularioUs(){
	var x = document.forms["formAgregarUsuario"];
	parametrosUs = "idUsuario="+x.elements[0].value+"&tipoUsuario="+x.elements[1].value+"&nombreUsuario="+x.elements[2].value+
								"&apPaternoUsuario="+x.elements[3].value+"&apMaternoUsuario="+x.elements[4].value+"&emailUsuario="+x.elements[5].value+
								"&passwordUsuario="+x.elements[6].value;
}


function muestraUsuario(){
	obtenFormularioUs();
	window.alert(parametrosUs+"YEAH");
}

function enviaUsuario(){

	//se obtiene el formulario
	obtenFormularioUs();

	//se limpia el formulario
	//limpiarFormulario();

	//se crea el objeto para ajax de los anvegadores
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

	http_request.open("POST", "php/agregaUsuario.php", true);
  	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(parametrosUs);
}
