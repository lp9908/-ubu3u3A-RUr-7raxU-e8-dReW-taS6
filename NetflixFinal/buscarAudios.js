var tablaAudios = document.getElementById("resultadoBusquedaAudios");

document.getElementById("campoBuscarAudios").addEventListener("change", ejecutaConsultaAudios);
document.getElementById("campoEntradaAudios").addEventListener("keyup", ejecutaConsultaAudios);

document.getElementById("buscarAudioBtn").addEventListener("click", muestraAudios);

function muestraAudios(){
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
        tablaAudios.innerHTML = "";
        tablaAudios.innerHTML = http_request.responseText;
        obtenerBotonesEliminarAudio();
        obtenerBotonesModificarAudio();
      }
    }

    http_request.open("POST","php/buscarAudios.php",true);
    http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http_request.send("valor="+valor+"&campo=&tipoBusqueda=");
}

function ejecutaConsultaAudios(){

    //se obtienen los valores de entrada para la busqueda
    var parametros = "";
    parametros += "tipoBusqueda=" + document.getElementById("campoBuscarAudios").value;
    parametros += "&campo=" + document.getElementById("campoEntradaAudios").value;
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
	if(document.getElementById("campoEntradaAudios").value == ""){
      tablaAudios.innerHTML = "";
      muestraAudios();
    } else{
		//se define la funcion que procesara la información que sé recibe del servidor
		http_request.onreadystatechange = function(){
		  //se checa el estado de la petición
		  if((http_request.readyState == 4)&&(http_request.status == 200)){
			tablaAudios.innerHTML = "";
			tablaAudios.innerHTML = http_request.responseText;

			obtenerBotonesEliminarAudio();
			obtenerBotonesModificarAudio();
		  }
		}

		http_request.open("POST","php/buscarAudios.php",true);
		http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http_request.send(parametros);
	}
}


function obtenerBotonesModificarAudio(){
  var xp = document.getElementsByName("modificaAudioBtn");
  var i = 0;
  for(i = 0;i < xp.length; i++){
    xp[i].addEventListener("click", function(){
		var z = this.value;
		document.getElementById("modificaAudioFinalBtn").addEventListener("click", function(){
        //se obtienen los parametros para enviarlos modifcar el registro
        var parametrosp = "";
        parametrosp += "id="+z;
        parametrosp += "&nombre=" + document.getElementById("campoModificaNombreAudio").value;

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
              $('#myModalAudio').modal('hide');
              //se ejecuta la función de consulta para actualizar el registro y sea visible
              ejecutaConsultaAudios();
          }
        }
        http_request.open("POST", "php/modificarAudio.php", true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send(parametrosp);
      });
    });
    xp[i].setAttribute("class", "btn btn-info btn-md");
    xp[i].setAttribute("data-toggle", "modal");
    xp[i].setAttribute("data-target", "#myModalAudio");
  }
}



function obtenerBotonesEliminarAudio(){
  var x = document.getElementsByName("eliminaAudioBtn");
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
            ejecutaConsultaAudios();
        }
      }

      http_request.open("POST", "php/eliminarAudio.php", true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.send("id="+z);
    });
    x[i].setAttribute("class", "btn btn-info btn-md");
  }
}