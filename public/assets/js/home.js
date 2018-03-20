$(document).ready(function() {

  //REGISTER NEW USER
  $("#register-btn").on("click", function(event) {
    var firstName = $("first_name").val().trim();
    var lastName = $("last_name").val().trim();
    var name = firstName + " " + lastName;

    var newUser = {
      name: name,
      email: $("#email").val().trim(),
      password: $("#password").val().trim()
    }

    console.log(newUser);

    // $.ajax({
    //   method: "POST",
    //   url: "/api/register",
    //   data: newUser
    // })
    // .done(function(data) {
    //   console.log(data);
    // });

  })

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

//==========================================

});
