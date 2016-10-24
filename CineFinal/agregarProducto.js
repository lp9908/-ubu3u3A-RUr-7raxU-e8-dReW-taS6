var parametros = "";
document.getElementById("agregarProductoBtnFin").addEventListener("click", enviaProducto);


function obtenFormulario(){
	var x = document.forms["formAgregarProducto"];
	parametros = "idProducto="+x.elements[0].value+"&nombreProducto="+x.elements[1].value+
								"&Precio="+x.elements[2].value+"&existencia="+x.elements[3].value;
}

function muestraProducto(){
	obtenFormulario();
	window.alert(parametros+"YEAH");
}

function enviaProducto(){

	//se obtiene el formulario
	obtenFormulario();

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

	http_request.open("POST", "php/agregaProducto.php", true);
  	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(parametros);
}