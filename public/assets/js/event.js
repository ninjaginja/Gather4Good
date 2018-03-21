$(document).ready(function() {

  console.log(localStorage.getItem("token"));

  $("#new-event-btn").on("click", function(event) {
    event.preventDefault();
    var token = localStorage.getItem("token");

    //Add validaiton logic here - e.g., if zip.length == 5 OK else return

    console.log(token);

    var newEvent = {
      title: $("#event_name").val().trim(),
      cause: "Animal rights",
      time: "2016-08-09 07:42:28",
      description: $("#event_description").val().trim(),
      img_url: "www.image.com",
      location_name: $("#location_name").val().trim(),
      location_street: $("#street").val().trim(),
      location_city: $("#city").val().trim(),
      location_state: $("#state").val().trim(),
      location_zip: $("#zipcode").val().trim()
    };

    console.log(newEvent);

    var newEventSettings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/api/events/create",
        "method": "POST",
        "headers": {
          "x-access-token": token,
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": newEvent
    }

  $.ajax(newEventSettings)
    .done(function (response) {
      console.log(response);
    })
    .fail(function(response) {
      console.log(typeof response);
      console.log(response);
      console.log(response.responseJSON.message);

      $("#error-msg").text("Please login before submitting your events");
      $("#modal1").modal("open");

    });

  });
});
