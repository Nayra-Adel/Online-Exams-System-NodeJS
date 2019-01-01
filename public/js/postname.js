$( document ).ready(function() {
	
    $("#register-form").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){

    	// PREPARE FORM DATA
    	var formData = {
			name: $("#name").val(),
			phone: $("#phone").val(),
			email: $("#email").val(),
			pass: $("#password").val(),
			cv: $("#cv").val()
    	}   

    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "checkname",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(checkname) {

				name = checkname;

				if (name == "false"){
					$("#register-done").submit();
				}
				else{
					$("#postResultDiv").html("<p>" + " User name found! change it " + "</p>"); 
				}
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    }
})