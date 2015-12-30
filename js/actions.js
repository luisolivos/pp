$(document).ready(function () {

	$('#content_cyc').css('display', 'none');
    $('#content_ventas').css('display', 'none');
		
	$("#id_mVentas").bind("click", function (event, ui) {
          $('#content_ventas').css('display', 'block');
          $('#content_cyc').css('display', 'none');
    	});

	$("#id_mCYC").bind("click", function (event, ui) {
	 	  $('#content_cyc').css('display', 'block');
          $('#content_ventas').css('display', 'none');
    	});
});