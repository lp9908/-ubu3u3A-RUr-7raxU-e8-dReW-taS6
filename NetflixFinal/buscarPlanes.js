var tablaPlanes = document.getElementById("resultadoBusquedaPlanes");

document.getElementById("campoBuscarPlan").addEventListener("change", ejecutaConsultaPlanes);
document.getElementById("campoEntradaPlan").addEventListener("keyup", ejecutaConsultaPlanes);

document.getElementById("buscarPlanesBtn").addEventListener("click", muestraPlanes);

function muestraPlanes(){
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
        tablaPlanes.innerHTML = "";
        tablaPlanes.innerHTML = http_request.responseText;
		
        obtenerBotonesEliminarPlan();
        obtenerBotonesModificarPlan();
      }
    }

    http_request.open("POST","php/buscarPlanes.php",true);
    http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http_request.send("valor="+valor+"&campo=&tipoBusqueda=");
}

function ejecutaConsultaPlanes(){

    //se obtienen los valores de entrada para la busqueda
    var parametros = "";
    parametros += "tipoBusqueda=" + document.getElementById("campoBuscarPlan").value;
    parametros += "&campo=" + document.getElementById("campoEntradaPlan").value;
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
	if(document.getElementById("campoEntradaPlan").value == ""){
      tablaPlanes.innerHTML = "";
      muestraPlanes();
    } else{
		//se define la funcion que procesara la información que sé recibe del servidor
		http_request.onreadystatechange = function(){
		  //se checa el estado de la petición
		  if((http_request.readyState == 4)&&(http_request.status == 200)){
			tablaPlanes.innerHTML = "";
			tablaPlanes.innerHTML = http_request.responseText;

			obtenerBotonesEliminarPlan();
			obtenerBotonesModificarPlan();
		  }
		}

		http_request.open("POST","php/buscarPlanes.php",true);
		http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http_request.send(parametros);
	}
}



function obtenerBotonesModificarPlan(){
  var xp = document.getElementsByName("modificaPlanesBtn");
  var i = 0;
  for(i = 0;i < xp.length; i++){
    xp[i].addEventListener("click", function(){
		var z = this.value;
		document.getElementById("modificaPlanesFinalBtn").addEventListener("click", function(){
        //se obtienen los parametros para enviarlos modifcar el registro
        var parametrosp = "";
        parametrosp += "id="+z;
        parametrosp += "&nombre=" + document.getElementById("campoModificaNombrePlan").value;
        parametrosp += "&precio=" + document.getElementById("campoModificaPrecioPlan").value;

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
              $('#myModalPlanes').modal('hide');
              //se ejecuta la función de consulta para actualizar el registro y sea visible
              ejecutaConsultaPlanes();
          }
        }
        http_request.open("POST", "php/modificarPlanes.php", true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send(parametrosp);
      });
    });
    xp[i].setAttribute("class", "btn btn-info btn-md");
    xp[i].setAttribute("data-toggle", "modal");
    xp[i].setAttribute("data-target", "#myModalPlanes");
  }
}



function obtenerBotonesEliminarPlan(){
  var x = document.getElementsByName("eliminaPlanesBtn");
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
            ejecutaConsultaPlanes();
        }
      }

      http_request.open("POST", "php/eliminaPlan.php", true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.send("id="+z);
    });
    x[i].setAttribute("class", "btn btn-info btn-md");
  }
}