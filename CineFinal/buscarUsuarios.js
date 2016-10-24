var tablaUs = document.getElementById("resultadoBusquedaUsuarios");

document.getElementById("campoTipoBusquedaUs").addEventListener("change", ejecutaConsultaUsu);
document.getElementById("campoEstadoUsuario").addEventListener("change", ejecutaConsultaUsu);
document.getElementById("campoEntradaUsuario").addEventListener("keyup", ejecutaConsultaUsu);

document.getElementById("buscarUsuarioBtn").addEventListener("click", muestraUsuarios);


function muestraUsuarios (){
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
        tablaUs.innerHTML = "";
        tablaUs.innerHTML = http_request.responseText;

        obtenerBotonesEliminarUs();
        obtenerBotonesModificarUs();
      }
    }

    http_request.open("POST","php/buscarUsuario.php",true);
    http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http_request.send("valorUs="+valor+"&campoUs=&estadoUs=&tipoBusquedaUs=");
}

function ejecutaConsultaUsu(){
    var comodin = document.getElementById("campoEntradaUsuario").value;


    //se obtienen los valores de entrada para la busqueda
    var parametros = "";
    parametros += "&campoUs=" + document.getElementById("campoEntradaUsuario").value;
    parametros += "&estadoUs=" + document.getElementById("campoEstadoUsuario").value;
    parametros += "&valorUs=";
    parametros += "&tipoBusquedaUs="+ document.getElementById("campoTipoBusquedaUs").value;

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

    if(document.getElementById("campoEntradaUsuario").value == "" && document.getElementById("campoEstadoUsuario").value == 3){
      tablaUs.innerHTML = "";
      muestraUsuarios();
    }
    else{
      //se define la funcion que procesara la información que sé recibe del servidor
      http_request.onreadystatechange = function(){
        //se checa el estado de la petición
        if((http_request.readyState == 4)&&(http_request.status == 200)){
          tablaUs.innerHTML = "";
          tablaUs.innerHTML = http_request.responseText;

          obtenerBotonesEliminarUs();
          obtenerBotonesModificarUs();
        }
      }

      http_request.open("POST","php/buscarUsuario.php",true);
      http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      http_request.send(parametros);
    }

}


function obtenerBotonesModificarUs(){
  var x = document.getElementsByName("modificaUsuarioBtn");
  var i = 0;
  for(;i<x.length; i++){
    x[i].addEventListener("click", function(){
      var z = this.value;
      document.getElementById("modificaUsuarioFinalBtn").addEventListener("click", function(){
        //se obtienen los parametros para enviarlos modifcar el registro
        var parametros = "";
        parametros += "idUsu="+z;
        parametros += "&nombreUs=" + document.getElementById("campoModificaNombreUs").value;
        parametros += "&apPaternoUs=" + document.getElementById("campoModificaAPUs").value;
        parametros += "&apMaternoUs=" + document.getElementById("campoModificaAMUs").value;
        parametros += "&emailUs=" + document.getElementById("campoModificaEmailUs").value;
        parametros += "&tipoUs=" + document.getElementById("campoModificaTipoUsuario").value;
        parametros += "&passwordUs=" + document.getElementById("campoModificaPassUs").value;

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
              $('#myModalUs').modal('hide');
              //se ejecuta la función de consulta para actualizar el registro y sea visible
              ejecutaConsultaUsu();
          }
        }

        http_request.open("POST", "php/modificaUsuario.php", true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send(parametros);
      });
    });
    x[i].setAttribute("class", "btn btn-info btn-md");
    x[i].setAttribute("data-toggle", "modal");
    x[i].setAttribute("data-target", "#myModalUs");
  }
}



function obtenerBotonesEliminarUs(){
  var x = document.getElementsByName("eliminaUsuarioBtn");
  var i = 0;
  for(;i<x.length; i++){

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
            ejecutaConsultaUsu();
        }
      }

      http_request.open("POST", "php/eliminaUsuario.php", true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.send("idUs="+z);
    });
    x[i].setAttribute("class", "btn btn-info btn-md");
  }
}
