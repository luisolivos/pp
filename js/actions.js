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
});