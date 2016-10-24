var tablaProducto = document.getElementById("resultadoBusquedaProducto");

document.getElementById("campoTipoBusquedaProducto").addEventListener("change", ejecutaConsultaProducto);
document.getElementById("campoEstadoProducto").addEventListener("change", ejecutaConsultaProducto);
document.getElementById("campoEntradaProducto").addEventListener("keyup", ejecutaConsultaProducto);

document.getElementById("buscarProductoBtn").addEventListener("click", muestraProducto);


function muestraProducto (){
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
        tablaProducto.innerHTML = "";
        tablaProducto.innerHTML = http_request.responseText;
        obtenerBotonesEliminarProducto();
        obtenerBotonesModificarProducto();
      }
    }

    http_request.open("POST","php/buscaProducto.php",true);
    http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http_request.send("valorProd="+valor+"&campoProd=&estadoProd=&tipoBusquedaProd=");
}

function ejecutaConsultaProducto(){
    var comodin = document.getElementById("campoEntradaProducto").value;


    //se obtienen los valores de entrada para la busqueda
    var parametros = "";
    parametros += "&campoProd=" + document.getElementById("campoEntradaProducto").value;
    parametros += "&estadoProd=" + document.getElementById("campoEstadoProducto").value;
    parametros += "&valorProd=0";
    parametros += "&tipoBusquedaProd="+ document.getElementById("campoTipoBusquedaProducto").value;

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

    if(document.getElementById("campoEntradaProducto").value == "" && document.getElementById("campoEstadoProducto").value == 3){
      tablaProducto.innerHTML = "";
      muestraProducto();
    }
    else{
      //se define la funcion que procesara la información que sé recibe del servidor
      http_request.onreadystatechange = function(){
        //se checa el estado de la petición
        if((http_request.readyState == 4)&&(http_request.status == 200)){
          tablaProducto.innerHTML = "";
          tablaProducto.innerHTML = http_request.responseText;
          obtenerBotonesModificarProducto();
		  obtenerBotonesEliminarProducto();
		 }
      }

      http_request.open("POST","php/buscaProducto.php",true);
      http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      http_request.send(parametros);
    }

}


function obtenerBotonesModificarProducto(){
  //alert ("hola");
  var xProducto = document.getElementsByName("modificaProductoBtn");
  var i = 0;
  for(var i=0;i<xProducto.length; i++){

    xProducto[i].addEventListener("click", function(){
      //alert ("holafuncionlis");
	  var z = this.value;
      document.getElementById("modificaProductoFinalBtn").addEventListener("click", function(){
        //se obtienen los parametros para enviarlos modifcar el registro
        var parametros = "";
        parametros += "id="+z;
        parametros += "&nombre=" + document.getElementById("campoModificaNombreProducto").value;
        parametros += "&precioUnitario=" + document.getElementById("campoModificaPrecioUnitario").value;
		 parametros += "&existencia=" + document.getElementById("campoModificaExistencia").value;
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
              $('#myModalProducto').modal('hide');
              //se ejecuta la función de consulta para actualizar el registro y sea visible
              ejecutaConsultaProducto();
          }
        }

        http_request.open("POST", "php/modificaProducto.php", true);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.send(parametros);
      });
    });
    xProducto[i].setAttribute("class", "btn btn-info btn-md");
    xProducto[i].setAttribute("data-toggle", "modal");
    xProducto[i].setAttribute("data-target", "#myModalProducto");
  }
}





function obtenerBotonesEliminarProducto(){
  var xProducto = document.getElementsByName("eliminaProductoBtn");
  var i = 0;
  for(;i<xProducto.length; i++){

    //se asignada a cada boton de eliminar una función cada que se haga click en el
    //este crea el objeto para ajax el envío del idEmpleado y lo actualiza
    //cuando recibe la repsuta se vuelven a mostrar el emeplado actualizado
    xProducto[i].addEventListener("click", function(){
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
            ejecutaConsultaProducto();
        }
      }

      http_request.open("POST", "php/eliminaProducto.php", true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.send("id="+z);
    });
    xProducto[i].setAttribute("class", "btn btn-info btn-md");
  }
}
