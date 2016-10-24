
document.getElementById("agregarEmpleadoBtnFin").addEventListener("click", obtenFormulario);


function obtenFormulario(){
	var parametrosEmpleado = "";
	parametrosEmpleado += "idEmpleado="+document.getElementById("idEmpleado").value;
	parametrosEmpleado += "&tipoEmpleado="+document.getElementById("tipoEmpleado").value;
	parametrosEmpleado += "&nombreEmpleado="+document.getElementById("nombreEmpleado").value;
	parametrosEmpleado += "&apEmpleado="+document.getElementById("apEmpleado").value;
	parametrosEmpleado += "&amEmpleado="+document.getElementById("amEmpleado").value;
	parametrosEmpleado += "&emailEmpleado="+document.getElementById("emailEmpleado").value;
	parametrosEmpleado += "&passwordEmpleado="+document.getElementById("passwordEmpleado").value;
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

	http_request.open("POST", "php/agregaEmpleado.php", true);
  	http_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http_request.send(parametrosEmpleado);
}
