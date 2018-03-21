$(document).ready(function() {
  //Get jQuery references to event properties
  var eventName = $("#event_name");
  var eventDescription = $("#event_description");
  var imageUrl = $("#image_url");
  //========Need to identify selected cause=======
  var date = $("#event_date");
  var time = $("#event_time");
  var locationName = $("#location_name");
  var street = $("#street");
  var city = $("#city");
  var state = $("#state");
  var zip = $("#zipcode");

function createEvent(event) {
  event.preventDefault();
  //Do we want to include any client-side validation here? For example:
  if (!eventName.val().trim() || !eventDescription.val().trim()) {
    return;
  }
  //Construct a newEvent object to hand to the database
  var newEvent = {
    title: eventName.val().trim(),
    //========Need to add selected cause=======
    time: time.val(), //Do we need to use moment.js here?
    description: eventDescription.val().trim(),
    //========Need to grab organizer id from user token=======
    image_url: imageUrl.val().trim(),
    location_name: locationName.val().trim(),
    location_street: street.val().trim(),
    location_city: city.val().trim(),
    location_state: state.val().trim(),
    location_zip: zip.val().trim()
  };

  $.post("/create", newEvent, function() {
    // Redirect to homepage?
    window.location.href = "/"/
  });
};





});
