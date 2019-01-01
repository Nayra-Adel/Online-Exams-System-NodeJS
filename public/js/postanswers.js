$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#myform").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){

		a1= $("input[name='answer1']:checked").val();
		a2= $("input[name='answer2']:checked").val();
		a3= $("input[name='answer3']:checked").val();

	    if (!a1) {a1 = ""}
	    if (!a2) {a2 = ""}
	    if (!a3) {a3 = ""}

    	// PREPARE FORM DATA
    	var formData = {
			answer1: a1,
			answer2: a2,
			answer3: a3
    	}   
    	console.log(formData);

    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "answers/save",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				$("#theForm").submit();
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    }
})