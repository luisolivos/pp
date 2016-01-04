var urlDOM = "http://187.237.98.114:80/"; var Publi = 1;

$(document).ready(function () {
    $('#content_cyc').css('display', 'none');
    $('#content_ventas').css('display', 'none');
    $('#idCalculoUtilidad').css('display', 'none');  
    $('#idDesctoMaximo').css('display', 'none');

		
    $("#id_mVentas").bind("click", function (event, ui) {
        $('#content_ventas').css('display', 'block');
        $('#content_cyc').css('display', 'none');
        $('#idCalculoUtilidad').css('display', 'none');
        $('#idDesctoMaximo').css('display', 'none');
    	});

	$("#id_mCYC").bind("click", function (event, ui) {
	 	$('#content_cyc').css('display', 'block');
        $('#content_ventas').css('display', 'none');
        $('#idCalculoUtilidad').css('display', 'none');
        $('#idDesctoMaximo').css('display', 'none');

    	});

    $("#idVentas1").bind("click", function (event, ui) {
        $('#idCalculoUtilidad').css('display', 'block');
        $('#content_cyc').css('display', 'none');
        $('#content_ventas').css('display', 'none');
        $('#idDesctoMaximo').css('display', 'none');
      });
    
    $("#idVentas2").bind("click", function (event, ui) {
        $('#idCalculoUtilidad').css('display', 'none');
        $('#content_cyc').css('display', 'none');
        $('#content_ventas').css('display', 'none');
        $('#idDesctoMaximo').css('display', 'block');
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
            if (mon != "" || mon != undefined) {
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
                    //alert ("TipoConsulta " + TipoConsulta + " Art " + code + " Moneda " + TipoMoneda + "Monto" + mon);
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
                            contentType: "application/json",
                            success: function (response) {
                                $("#txtUtilidad").val(response.d);
                                if (Publi == 1) {
                                    $.mobile.loading('hide');
                                }
                            },
                            error:function (response){ alert ("Error: "+response.error);}
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
        var CodORNom = "";
        CodORNom = $("#txtItemCode").val();
        
        if (CodORNom != "") {
            var mon = $("#txtUtilidad").val();
            if (mon != "") {
                var code = $("#txtItemCode").val();
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
                    }
                    //Calcular utilidad
                    $.ajax({
                        url: urlDOM + "CS.aspx/CalculaUtilidadPorciento",
                        data: "{ TipoConsulta: " + TipoConsulta + ", DescripArticulo: '" + code + "'" + ", TipoMoneda: " + TipoMoneda + ", Monto: '" + mon + "'" + ", BDescripcion:" + 0 + "}",
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            $("#txtPrecio").val(data.d);
                            if (Publi == 1) {
                                $.mobile.loading('hide');
                            }
                        }
                    });
                }
            }
            else {
                Mensaje("Especifique porcentaje para la utilidad", "HalcoNET", "Aceptar");
            }
        }
        else {
            Mensaje("Debe ingresar un código de artículo", "HalcoNET", "Aceptar");
        }
    });
    
    /*Descuento maximo*/
    $("#btnCalcular").bind("click", function (event, ui) {
        var CodORNom = "";
        CodORNom = $("#txtItemCode1").val();
        
        if (CodORNom != "") {
            var mon = $("#txtPorcientoDesc").val();
            if (mon != "") {
                var code = $("#txtItemCode1").val();
                var TipoConsulta = 11;
                if (mon != "") {
                    if (Publi == 1) {
                        $.mobile.loading('show', {
                            text: 'Calculando...',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        });
                    }
                    //Se llenan campos con precios de descuento y utilidades
                    $.ajax({
                        url: urlDOM + "CS.aspx/ObtenerDescuentos",
                        data: "{ TipoConsulta: " + TipoConsulta + ", CodArticulo: '" + code + "', Descuento:" + mon +"}",
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            $("#txtPrecioDescuentoMXP").val(data.d.PrecioCompraMXP);
                            $("#txtUtilidadDescuentoMXP").val(data.d.PrecionVentaMXP);
                            $("#txtPrecioDescuentoUSD").val(data.d.PrecioCompraUSD);
                            $("#txtUtilidadDescuentoUSD").val(data.d.PrecionVentaUSD);

                            if (Publi == 1) {
                                $.mobile.loading('hide');
                            }
                        }
                    });
                }
            }
            else {
                Mensaje("Debe especificar un monto para la utilidad", "HalcoNET", "Aceptar");
            }
        }
        else {
            Mensaje("Debe consultar un articulo por código", "HalcoNET", "Aceptar");
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