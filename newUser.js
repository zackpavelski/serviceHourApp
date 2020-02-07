//JS file  for login
        $("#todoForm").submit(function(event) {
            var ajaxRequest;
            event.preventDefault();
            $("#result").html('');
            var values = $(this).serialize();
               ajaxRequest= $.ajax({
                    url: "https://script.google.com/macros/s/AKfycbwlFRRlx10QQsWkQq5ipihFESqCczG0UmjV2xe1BoNSEyV8964/exec",
                    type: "post",
                    data: values
                });
            ajaxRequest.done(function (response, textStatus, jqXHR){
                 $("#result").html('Submitted successfully');
            });
            ajaxRequest.fail(function (){
                $("#result").html('There is error while submit');
            });
            document.getElementById('user').innerHTML = '';
            document.getElementById('pwd').innerHTML = '';

}
