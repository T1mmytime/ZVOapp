$(document).ready(function(){

	$('#aanmeldScherm').validate({
		rules:{
			name:{
				required: true
			},
			email:{
				required: true,
				email: true
			},
			paswoord: {
				minlength: 6,
				required: true
			},
			pasBevestiging:{
				minlength: 6,
			//	equalTo: "#paswoord"
			}
		},
		succes: function(element){
			element.text('OK!').addClass('valid')
		}
	

	});
});