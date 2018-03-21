$(document).ready(function() {

  determineAuthStatus();
  setSubmitBtnDefault();
  var defaultSet = false;

  $("#submit-btn").on("click", function(event) {
    event.preventDefault();
    console.log($(this).data("submit-type"));

    $("#error-msg").text("");

    if($(this).data("submit-type") == "Login") {
      loginUser();
    } else if ($(this).data("submit-type") == "Sign Up") {
      registerUser();
    }
  });

  //REGISTER NEW USER
  function registerUser() {
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
    .fail(function(response) {
      console.log(typeof response);
      console.log(response);
      console.log(response.responseJSON.message);

      if (response.responseJSON.message === "User already exists") {
        setUserExistsDisplay();
      }
    });
  }

//======================================

  function loginUser() {
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

      var message = response.responseJSON.message;

      if(message === "Wrong password") {
        $("#error-msg").text("Sorry, the password you entered is incorrect.");
      } else if(message === "User not found") {
        $("#error-msg").text("Sorry, we have no user registered with that email");
      }

    });
  }

  function determineAuthStatus() {
    var token = localStorage.getItem("token");

    var ajaxSettings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/api/user_info",
        "method": "GET",
        "headers": {
          "x-access-token": token,
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    $.ajax(ajaxSettings)
      .done(function (response) {
        console.log(response);
        if(response.message === "Authenticated") {
          hideLoginAndDismissModal();
        } else if (response.message === "Not authenticated") {
          showLogin();
        }
      })
      .fail(function(response) {
        console.log(typeof response);
        console.log(response);
        console.log(response.responseJSON.message);
        console.log("No credentials homie. Might need to login. Show login and reg ish.")
        showLogin();
      });
  }

  function hideLoginAndDismissModal() {
    $(".modal-trigger").hide();
    $("#modal1").modal("close");
    $("#first_name, #last_name, #reg-email, #reg-password").val("");
    $("#login-email, #login-password").val("");
  }

  function showLogin() {
    $(".modal-trigger").show();
    //hide logout
  }

  function setUserExistsDisplay() {
    $("#reg-email, #reg-password").val("");
    $("#error-msg").text("Sorry, but we already have an account registered with that email.")
  }

  $("#modal1 input").on("focus", function() {
    $("#error-msg").text("");
  });

  var anchors = "#login-anchor-head, #reg-anchor-head, " +
                "#login-anchor-side, #reg-anchor-side, " +
                "#login-anchor-modal, #reg-anchor-modal";

  //Toggle error message display and set data attribute submit-btn to trigger
  // correct functionality (login v. register)
  $(anchors).on("click", function() {
    $("#error-msg").text("");
    console.log($(this).text());

    if(!defaultSet) {
      $("#submit-btn").data("submit-type", "Login");
      console.log("submitbtn data", $("#submit-btn").data("submit-type"));
      defaultSet = true;
    } else {
      $("#submit-btn").data("submit-type", $(this).text());
      console.log("submitbtn data", $("#submit-btn").data("submit-type"));
    }
  });

  function setSubmitBtnDefault() {
    $("#submit-btn").data("submit-type", "Login");
  }

});
