var urlDOM = "http://187.237.98.114:80/"; var Publi = 0;

$(document).ready(function () {

  $('#content_cyc').css('display', 'none');
  $('#content_ventas').css('display', 'none');
  $('#idCalculoUtilidad').css('display', 'none');
		
    $("#id_mVentas").bind("click", function (event, ui) {
          $('#content_ventas').css('display', 'block');
          $('#content_cyc').css('display', 'none');
          $('#idCalculoUtilidad').css('display', 'none');
    	});

	$("#id_mCYC").bind("click", function (event, ui) {
	 	      $('#content_cyc').css('display', 'block');
          $('#content_ventas').css('display', 'none');
          $('#idCalculoUtilidad').css('display', 'none');
    	});

    $("#idVentas1").bind("click", function (event, ui) {
          $('#idCalculoUtilidad').css('display', 'block');
          $('#content_cyc').css('display', 'none');
          $('#content_ventas').css('display', 'none');
      });

    $("#btnBusqArt").bind("click", function (event, ui) {
        var Codigo = $("#txtItemCode").val();
        if (Publi == 1) {
            $.mobile.loading('show', {
                text: 'Consultando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        }
        VerificaDescripcionArticulo(Codigo);
    });
    
    $("#btnGetUtilidad").bind("click", function (event, ui) {
        var CodORNom = "";
        CodORNom = $("#txtItemCode").val();

        if (CodORNom != "") {
            var mon = $("#txtPrecio").val();
            if (mon != "") {
                var code = CodORNom;
                var TipoMoneda = -1;
                var TipoConsulta = -1;
                if ($('#rbtPesos').is(':checked')) {
                    TipoMoneda = 1;
                    TipoConsulta = 1;
                }
                if ($('#rbtDolares').is(':checked')) {
                    TipoMoneda = 2;
                    TipoConsulta = 2;
                }

                if (mon != "") {
                    if (Publi == 1) {
                        $.mobile.loading('show', {
                            text: 'Calculando...',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        });
                   
                        //Obtener utilidad
                        $.ajax({
                            url: urlDOM + "CS.aspx/CalculaUtilidadPrecio",
                            data: "{ TipoConsulta: " + TipoConsulta + ", CodArticulo: '" + code + "'" + ", TipoMoneda: " + TipoMoneda + ", Monto: '" + mon + "'}",
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                $("#txtUtilidad").val(data.d);
                                if (Publi == 1) {
                                    $.mobile.loading('hide');
                                }
                            }
                        });
                     }
                }
            }
            else {
                Mensaje("Debe especificar un monto", "HalcoNET", "Aceptar");
            }

        }
        else {
            Mensaje("Ingrese un código de artículo", "HalcoNET", "Aceptar");
        }
    });
    
    $("#btnGetPrecio").bind("click", function (event, ui) {
        var Codigo = $("#txtItemCode").val();
        alert("Precio");
        if (Publi == 1) {
            $.mobile.loading('show', {
                text: 'Calculando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        }
    });
});

function VerificaDescripcionArticulo(Codigo) {
    var result = "";
    if (Codigo != "") {
        $.ajax({
            url: urlDOM + "CS.aspx/ObtenerDescripcionArticulo",
            data: "{ TipoConsulta: " + 9 + ", CodArticulo:'" + Codigo + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json",
            success: function (response) {
                result = response.d;

                if (result != "") {                    
                   $("#lblItemName1").text(result);
                   // ConsultaListaPrecios(Codigo, 3, 0);
                   // ConsultaStock(Codigo, 5, 0);
                    if (Publi == 1) {
                        $.mobile.loading("hide");
                    }
                }
                else {
                    Mensaje("No existe ningun articulo con el código especificado", "HalcoNET", "Aceptar");
                    //LimpiaCodArtNoExistente();
                    //$('#idInformacion').css('display', 'none');
                    
                }
            },
            error:function (response){ alert ("Error: "+response.error);}
        });
    }
    else {
        Mensaje("Debe especificar un código de articulo", "HalcoNET", "Aceptar");        
    }   
}