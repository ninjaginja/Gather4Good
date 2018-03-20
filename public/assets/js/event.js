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
      localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJncmVnc2VtYWlsQGVtYWlsLmNvbSIsIm5hbWUiOiJncmVnb3J5IiwiaWF0IjoxNTIxNDg0MTIxLCJleHAiOjE1MjE1NzA1MjF9.MhYSRpw5Smc8YFkTcZmAq9B9AOvdrmIC-lRpEFUqcG8");
      var jwt = localStorage.getItem("jwt");
      console.log(jwt);
    });
  });

//======================================

  //LOGIN USER
  $("#login-btn").on("click", function(event) {
    event.preventDefault();

    var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/api/auth/login",
          "method": "POST",
          "headers": {
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": loginInfo
        }

  $.ajax(settings)
    .done(function (response) {
      console.log(response);

      //save token locally here
    })
    .fail(function(response) {
      console.log(typeof response);
      console.log(response);
      console.log(response.responseJSON.message);

      //if responseJSON.message == wrong username, do smg
      //if responseJSON.message ==  wrong password, do smg
    });
  });

});
