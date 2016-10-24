var tablaCuentas = document.getElementById("resultadoBusquedaCuentas");

document.getElementById("campoBuscarCuantas").addEventListener("change", ejecutaConsultaCuentas);
document.getElementById("campoEntradaCuenta").addEventListener("keyup", ejecutaConsultaCuentas);

document.getElementById("buscarCuentaBtn").addEventListener("click", muestraCuantas);

function muestraCuantas(){
  var http_request = false;
  var valor = 10;
    if(window.XMLHttpRequest){
      http_request = new XMLHttpRequest();
    }
    else{
      if(window.ActiveOXbject){
        http_request = new ActiveXObjective("Microsoft.XMLHTTP");
      }
    }

    //se define la funcion que procesara la información que sé recibe del servidor
    http_request.onreadystatechange = function(){
      //se checa el estado de la petición
      if((http_request.readyState == 4)&&(http_request.status == 200)){
        tablaCuentas.innerHTML = "";
        tablaCuentas.innerHTML = http_request.responseText;
        obtenerBotonesEliminarCuenta();
        obtenerBotonesModificarCuenta();
      }
    }

    http_request.open("POST","php/buscarCuentas.php",true);
    http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http_request.send("valor="+valor+"&campo=&tipoBusqueda=");
}

function ejecutaConsultaCuentas(){

    //se obtienen los valores de entrada para la busqueda
    var parametros = "";
    parametros += "tipoBusqueda=" + document.getElementById("campoBuscarCuantas").value;
    parametros += "&campo=" + document.getElementById("campoEntradaCuenta").value;
	parametros += "&valor=0";
    //window.alert(parametros);
    //se crea el objeto para ajax de acuerdo a los navegadores
    var http_request = false;
    if(window.XMLHttpRequest){
      http_request = new XMLHttpRequest();
    }
    else{
      if(window.ActiveOXbject){
        http_request = new ActiveXObjective("Microsoft.XMLHTTP");
      }
    }
	if(document.getElementById("campoEntradaCuenta").value == ""){
      tablaCuentas.innerHTML = "";
      muestraCuantas();
    } else{
		//se define la funcion que procesara la información que sé recibe del servidor
		http_request.onreadystatechange = function(){
		  //se checa el estado de la petición
		  if((http_request.readyState == 4)&&(http_request.status == 200)){
			tablaCuentas.innerHTML = "";
			tablaCuentas.innerHTML = http_request.responseText;

			obtenerBotonesEliminarCuenta();
			obtenerBotonesModificarCuenta();
		  }
		}

		http_request.open("POST","php/buscarCuentas.php",true);
		http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http_request.send(parametros);
	}
}



function obtenerBotonesModificarCuenta(){
  var xp = document.getElementsByName("modificaCuentaBtn");
  var i = 0;
  for(i = 0;i < xp.length; i++){
    xp[i].addEventListener("click", function(){
		var z = this.value;
		document.getElementById("modificaCuentaFinalBtn").addEventListener("click", function(){
        //se obtienen los parametros para enviarlos modifcar el registro
        var parametrosp = "";
        parametrosp += "id="+z;
        parametrosp += "&nombre=" + document.getElementById("campoModificaNombreCuenta").value;
        parametrosp += "&email=" + document.getElementById("campoModificaEmailCuenta").value;
        parametrosp += "&telefono=" + document.getElementById("campoModificaTelefonoCuenta").value;
        //se envia los valores para modifcar al empleado
        var http_request = false;
        if(window.XMLHttpRequest){
          http_request = new XMLHttpRequest();
        }
        else{
          if(window.ActiveOXbject){
            http_request = new ActiveXObjective("Microsoft.XMLHTTP");
          }
        }
        //se prepara la funcion para la respuesta
        http_request.onreadystatechange = function (){
          if((http_request.readyState == 4) && (http_request.status == 200)){
              window.alert(http_request.responseText);
              //sólo utilizo está función para poder cerrar el modal
              $('#myModalCuenta').modal('hide');
              //se ejecuta la función de consulta para actualizar el registro y sea visible
              ejecutaConsultaCuentas();
          }
        }
        http_request.open("POST", "php/modificarCuenta.php", true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send(parametrosp);
      });
    });
    xp[i].setAttribute("class", "btn btn-info btn-md");
    xp[i].setAttribute("data-toggle", "modal");
    xp[i].setAttribute("data-target", "#myModalCuenta");
  }
}



function obtenerBotonesEliminarCuenta(){
  var x = document.getElementsByName("eliminaCuentaBtn");
  var i = 0;
  for(i = 0;i < x.length; i++){

    //se asignada a cada boton de eliminar una función cada que se haga click en el
    //este crea el objeto para ajax el envío del idEmpleado y lo actualiza
    //cuando recibe la repsuta se vuelven a mostrar el emeplado actualizado
    x[i].addEventListener("click", function(){
      var z = this.value;
      //se envia el valro para elminar al empleado
      var http_request = false;
      if(window.XMLHttpRequest){
        http_request = new XMLHttpRequest();
      }
      else{
        if(window.ActiveOXbject){
          http_request = new ActiveXObjective("Microsoft.XMLHTTP");
        }
      }

      //se prepara la funcion para la respuesta
      http_request.onreadystatechange = function (){
        if((http_request.readyState == 4) && (http_request.status == 200)){
            window.alert(http_request.responseText);
            ejecutaConsultaCuentas();
        }
      }

      http_request.open("POST", "php/eliminarCuenta.php", true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.send("id="+z);
    });
    x[i].setAttribute("class", "btn btn-info btn-md");
  }
}