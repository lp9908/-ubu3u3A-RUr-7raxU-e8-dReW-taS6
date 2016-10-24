var tabla = document.getElementById("resultadoBusqueda");

document.getElementById("campoTipoBusqueda").addEventListener("change", ejecutaConsulta);
document.getElementById("campoEstadoEmpleado").addEventListener("change", ejecutaConsulta);
document.getElementById("campoEntradaEmpleado").addEventListener("keyup", ejecutaConsulta);

document.getElementById("buscarEmpleadoBtn").addEventListener("click", muestraEmpleados);


function muestraEmpleados (){
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
        tabla.innerHTML = "";
        tabla.innerHTML = http_request.responseText;

        obtenerBotonesEliminar();
        obtenerBotonesModificar();
      }
    }

    http_request.open("POST","php/buscarEmpleado.php",true);
    http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http_request.send("valor="+valor+"&campo=&estado=&tipoBusqueda=");
}

function ejecutaConsulta(){
    var comodin = document.getElementById("campoEntradaEmpleado").value;


    //se obtienen los valores de entrada para la busqueda
    var parametros = "";
    parametros += "&campo=" + document.getElementById("campoEntradaEmpleado").value;
    parametros += "&estado=" + document.getElementById("campoEstadoEmpleado").value;
    parametros += "&valor=";
    parametros += "&tipoBusqueda="+ document.getElementById("campoTipoBusqueda").value;

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

    if(document.getElementById("campoEntradaEmpleado").value == "" && document.getElementById("campoEstadoEmpleado").value == 3){
      tabla.innerHTML = "";
      muestraEmpleados();
    }
    else{
      //se define la funcion que procesara la información que sé recibe del servidor
      http_request.onreadystatechange = function(){
        //se checa el estado de la petición
        if((http_request.readyState == 4)&&(http_request.status == 200)){
          tabla.innerHTML = "";
          tabla.innerHTML = http_request.responseText;

          obtenerBotonesEliminar();
          obtenerBotonesModificar();
        }
      }

      http_request.open("POST","php/buscarEmpleado.php",true);
      http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      http_request.send(parametros);
    }

}


function obtenerBotonesModificar(){
  var x = document.getElementsByName("modificaEmpleadoBtn");
  var i = 0;
  for(;i<x.length; i++){
    x[i].addEventListener("click", function(){
      var z = this.value;
      document.getElementById("modificaEmpleadoFinalBtn").addEventListener("click", function(){
        //se obtienen los parametros para enviarlos modifcar el registro
        var parametros = "";
        parametros += "id="+z;
        parametros += "&nombre=" + document.getElementById("campoModificaNombre").value;
        parametros += "&apPaterno=" + document.getElementById("campoModificaAP").value;
        parametros += "&apMaterno=" + document.getElementById("campoModificaAM").value;
        parametros += "&email=" + document.getElementById("campoModificaEmail").value;
        parametros += "&tipoEmpleado=" + document.getElementById("campoModificaTipoEmpleado").value;

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
              $('#myModal').modal('hide');
              //se ejecuta la función de consulta para actualizar el registro y sea visible
              ejecutaConsulta();
          }
        }

        http_request.open("POST", "php/modificaEmpleado.php", true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send(parametros);
      });
    });
    x[i].setAttribute("class", "btn btn-info btn-md");
    x[i].setAttribute("data-toggle", "modal");
    x[i].setAttribute("data-target", "#myModal");
  }
}



function obtenerBotonesEliminar(){
  var x = document.getElementsByName("eliminaEmpleadoBtn");
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
            ejecutaConsulta();
        }
      }

      http_request.open("POST", "php/eliminaEmpleado.php", true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.send("id="+z);
    });
    x[i].setAttribute("class", "btn btn-info btn-md");
  }
}
