$(document).ready(function() {

  console.log(localStorage.getItem("token"));

  $("#new-event-btn").on("click", function(event) {
    event.preventDefault();
    var token = localStorage.getItem("token");

    //Add validaiton logic here - e.g., if zip.length == 5 OK else return

    console.log(token);

    var newEvent = {
      title: $("#event_name").val().trim(),
      CauseId: $("#cause_category").val(),
      // cause: "Animal rights",
      date: $("#event_date").val().trim(),
      time: $("#event_time").val().trim(),
      // time: "2016-08-09 07:42:28",
      description: $("#event_description").val().trim(),
      img_url: $("#image_url").val().trim(),
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
        "url": "/api/events/create",
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

      if(response.responseJSON.message === "Token expired") {
        localStorage.removeItem("token");
      }

      $(".modal-trigger").show();
      $("#error-msg").text("Please login before submitting your events");
      $("#modal1").modal("open");

    });

  });
});
