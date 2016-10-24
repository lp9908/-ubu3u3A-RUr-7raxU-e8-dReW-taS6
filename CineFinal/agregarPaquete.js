var parametrosPaq = "";
document.getElementById("agregarPaqueteBtnFin").addEventListener("click", enviaPaquete);


function obtenFormularioPaq(){
	var x = document.forms["formAgregarPaquete"];
	parametrosPaq = "idPaquete="+x.elements[0].value+"&nombrePaquete="+x.elements[1].value+"&Precio="+x.elements[2].value;
}

function muestraPaquete(){
	obtenFormularioPaq();
	window.alert(parametrosPaq+"YEAH");
}

function enviaPaquete(){

	//se obtiene el formulario
	obtenFormularioPaq();

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

	http_request.open("POST", "php/agregaPaquete.php", true);
  	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(parametrosPaq);
}
