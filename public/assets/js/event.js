$(document).ready(function() {

  // Retrieve data from form to create new event object
  // To be called on click of form submit btn
  function retrieveEventData() {
    var newEvent = {
          title: $("#event_name").val().trim(),
          CauseId: $("#cause_category").val(),
          date: $("#event_date").val().trim(),
          time: $("#event_time").val().trim(),
          description: $("#event_description").val().trim(),
          img_url: $("#image_url").val().trim(),
          location_name: $("#location_name").val().trim(),
          location_street: $("#street").val().trim(),
          location_city: $("#city").val().trim(),
          location_state: $("#state").val(),
          location_zip: $("#zipcode").val().trim()
        }

    return newEvent;
  }


  // Function executing AJAX call to POST new event to Events table
  // To be called onclick of form submit btn. Redirect user to newly-created
  // event page if the submission to db was a success
  function createNewEvent(newEventSettings) {
    $.ajax(newEventSettings)
      .done(function(response) {
        window.location.href = "/event/" + response.id;
      })
      .fail(function(response) {
        if(response.responseJSON.message === "Token expired") {
          localStorage.removeItem("token");
        }

        $(".modal-trigger").show();
        $("#modal1").modal("open");

        setTimeout(function() {
          $("#main-err-msg").text("Please login or register before submitting an event");
        }, 400);
      });
  }

  //On click event listener to create new event
  $("#new-event-btn").on("click", function(event) {
    event.preventDefault();
    var token = localStorage.getItem("token");
    var newEvent = retrieveEventData();

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

    validationStatus = validateForm(newEvent);

    if (!validationStatus) {
      $("#incomplete-form-msg").show();
      return
    } else {
      createNewEvent(newEventSettings);
    }

  });

  //On click event listener to render display of events by specific cause
  $(".causeBtn").on("click", function() {
    var causeId = $(this).data("cause-id");
    displayEventsByCause(causeId);
  });

  $(".searchBtn").on("click", function() {
    var causeId = $("#cause_dropdown").val();
    displayEventsByCause(causeId);
  });

  function displayEventsByCause(causeId) {
    if (causeId == "All") {
      window.location.href = "/";
    } else {
      window.location.href = "/causes?cause_id=" + causeId;
    }
  }

  // Basic validation preventing event form submission
  // with empty input or textareas
  function validateForm(eventObj) {

    var validated = true;
    var objToValidate = Object.assign({}, eventObj);

    ['img_url', 'location_name'].forEach(e => delete objToValidate[e]);
    var propertyArr = Object.keys(objToValidate);

    propertyArr.forEach(function(property) {
      if(!eventObj[property] || eventObj[property] == " ") {
        validated = false;
      }
    });

    return validated;
  }

  // Event listener to hide error msg re event form submission
  $("input, textarea").on("focus", function(event) {
    event.preventDefault();
    $("#incomplete-form-msg").hide();
  })


  //listener on join button, sends post request to server to join event.
  $(".joinBtn").on("click", function() {

    var token = localStorage.getItem("token");
    var event = {
        id: $(this).data("id")
      };

    var Settings = {
      "async": true,
      "crossDomain": true,
      "url": "/api/events/join",
      "method": "POST",
      "headers": {
        "x-access-token": token,
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": event
    }
    joinEvent(Settings);
  });


  //post request to join event with authentication handling.
  function joinEvent(Settings) {
    $.ajax(Settings)
      .done(function (response) {

        if(!response) {
          Materialize.toast('You are already going to this event!', 4000);
        } else {
          Materialize.toast("You're making a difference, see you there!", 4000)
          setTimeout(function(){
            window.location.reload();
          }, 5000)
        }

      })
      .fail(function (response) {
        if (response.responseJSON.message === "Token expired") {
          localStorage.removeItem("token");
        }

        $(".modal-trigger").show();
        $("#modal1").modal("open");

        setTimeout(function() {
          $("#main-err-msg").text("Please login or register before joining an event");
        }, 400);
      });
  }


});
