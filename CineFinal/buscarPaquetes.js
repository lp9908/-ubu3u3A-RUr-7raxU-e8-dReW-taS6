var tablaPaquete = document.getElementById("resultadoBusquedaPaquete");

document.getElementById("campoTipoBusquedaPaquete").addEventListener("change", ejecutaConsultaPaquete);
document.getElementById("campoEstadoPaquete").addEventListener("change", ejecutaConsultaPaquete);
document.getElementById("campoEntradaPaquete").addEventListener("keyup", ejecutaConsultaPaquete);

document.getElementById("buscarPaqueteBtn").addEventListener("click", muestraPaquete);


function muestraPaquete (){
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
        tablaPaquete.innerHTML = "";
        tablaPaquete.innerHTML = http_request.responseText;

        obtenerBotonesEliminarPaquete();
        obtenerBotonesModificarPaquete();
      }
    }

    http_request.open("POST","php/buscarPaquete.php",true);
    http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http_request.send("valor="+valor+"&campoPaq=&estadoPaq=&tipoBusquedaPaq=");
}

function ejecutaConsultaPaquete(){
    var comodin = document.getElementById("campoEntradaPaquete").value;
	//holaMundo();

    //se obtienen los valores de entrada para la busqueda
    var parametros = "";
    parametros += "&campoPaq=" + document.getElementById("campoEntradaPaquete").value;
    parametros += "&estadoPaq=" + document.getElementById("campoEstadoPaquete").value;
    parametros += "&valor=0";
    parametros += "&tipoBusquedaPaq="+ document.getElementById("campoTipoBusquedaPaquete").value;
	//alert("holaEcho");
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

    if(document.getElementById("campoEntradaPaquete").value == "" && document.getElementById("campoEstadoPaquete").value == 3){
      tablaPaquete.innerHTML = "";
      muestraPaquete();
    }
    else{
      //se define la funcion que procesara la información que sé recibe del servidor
      http_request.onreadystatechange = function(){
        //se checa el estado de la petición
        if((http_request.readyState == 4)&&(http_request.status == 200)){
          tablaPaquete.innerHTML = "";
          tablaPaquete.innerHTML = http_request.responseText;
          obtenerBotonesModificarPaquete();
		  obtenerBotonesEliminarPaquete();

        }
      }

      http_request.open("POST","php/buscarPaquete.php",true);
      http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      http_request.send(parametros);
    }

}



function obtenerBotonesModificarPaquete(){
  //alert ("hola");
  var xPaquete = document.getElementsByName("modificaPaqueteBtn");
  var i = 0;
  for(var i=0;i<xPaquete.length; i++){

    xPaquete[i].addEventListener("click", function(){
      //alert ("holafuncionlis");
	  var z = this.value;
      document.getElementById("modificaPaqueteFinalBtn").addEventListener("click", function(){
        //se obtienen los parametros para enviarlos modifcar el registro
        var parametros = "";
        parametros += "id="+z;
        parametros += "&nombre=" + document.getElementById("campoModificaNombrePaquete").value;
        parametros += "&precio=" + document.getElementById("campoModificaPrecio").value;

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
              $('#myModalPaquete').modal('hide');
              //se ejecuta la función de consulta para actualizar el registro y sea visible
              ejecutaConsultaPaquete();
          }
        }

        http_request.open("POST", "php/modificaPaquete.php", true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send(parametros);
      });
    });
    xPaquete[i].setAttribute("class", "btn btn-info btn-md");
    xPaquete[i].setAttribute("data-toggle", "modal");
    xPaquete[i].setAttribute("data-target", "#myModalPaquete");
  }
}


function obtenerBotonesEliminarPaquete(){
  var xPaquete = document.getElementsByName("eliminaPaqueteBtn");
  var i = 0;
  for(;i<xPaquete.length; i++){

    //se asignada a cada boton de eliminar una función cada que se haga click en el
    //este crea el objeto para ajax el envío del idEmpleado y lo actualiza
    //cuando recibe la repsuta se vuelven a mostrar el emeplado actualizado
    xPaquete[i].addEventListener("click", function(){
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
            ejecutaConsultaPaquete();
        }
      }

      http_request.open("POST", "php/eliminaPaquete.php", true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.send("id="+z);
    });
    xPaquete[i].setAttribute("class", "btn btn-info btn-md");
  }
}

//function holaMundo(){
	//alert ("Hola mundo");
//}
