$(document).ready(function() {

  //add function that will immediately make GET request
  //to protected user_info endpoint on page load - if user data returned (i.e., a token exists),
  //then hide login/reg and show logout. Otherwise, show credentials

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
      hideLoginAndDismissModal();
    })
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
      hideLoginAndDismissModal();
    })
    .fail(function(response) {
      console.log(typeof response);
      console.log(response);
      console.log(response.responseJSON.message);
    });
  });

  function hideLoginAndDismissModal() {
    $(".modal-trigger").hide();
    setTimeout(function(){ $("#modal1").modal("close"); }, 600);
    //show logout display
  }

});
