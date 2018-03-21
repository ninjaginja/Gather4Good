$(document).ready(function() {

  //REGISTER NEW USER
  $("#register-btn").on("click", function(event) {
    var firstName = $("#first_name").val().trim();
    var lastName = $("#last_name").val().trim();
    var name = firstName + " " + lastName;

    var newUser = {
      name: name,
      email: $("#reg-email").val().trim(),
      password: $("#reg-password").val().trim()
    }

    console.log(newUser);

    $.ajax({
      method: "POST",
      url: "/api/register",
      data: newUser
    })
    .done(function(data) {
      console.log(data);
      localStorage.setItem("token", data.token);
      var token = localStorage.getItem("token");
      console.log(token);
    });
  });

//======================================

  //LOGIN USER
  $("#login-btn").on("click", function(event) {
    event.preventDefault();

    var credentials = {
      email: $("#login-email").val().trim(),
      password: $("#login-password").val().trim()
    }

    console.log(credentials);

    $.ajax({
      method: "POST",
      url: "/api/login",
      data: credentials
    })
    .done(function(data) {
      console.log(data);
      localStorage.setItem("token", data.token);
      var token = localStorage.getItem("token");
      console.log(token);
    })
    .fail(function(response) {
      console.log(typeof response);
      console.log(response);
      console.log(response.responseJSON.message);
    });
  });
});
