$(document).ready(function() {

  // Determine user auth status, set initial submit-btn data property,
  // and initialize modal tabs
  determineAuthStatus();
  setSubmitBtnDefault();
  $('.tabs').tabs();


  // Main event listener for registration and login
  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    $("#main-err-msg").text("");
    $("#email-format-err-msg, #pw-format-err-msg").text("");

    if($(this).data("submit-type") == "Login") {
      loginUser();
    } else if ($(this).data("submit-type") == "Sign Up") {
      registerUser();
    }
  });



  //********************** REGISTRATION LOGIC ********************************//

  // Main registration function triggered on submit-btn on click
  function registerUser() {
    var newUser = retrieveRegFormData();
    var validationStatus = validateUserAuthInput(newUser, validateRegInfoFormat);

    if(validationStatus) {
      ['firstName', 'lastName'].forEach(e => delete newUser[e]);
      newUser.name = $("#first_name").val().trim() + " " + $("#last_name").val().trim();
      submitNewUserToDb(newUser);
    }
  }


  function retrieveRegFormData() {

    var newUser = {
      firstName: $("#first_name").val().trim(),
      lastName: $("#last_name").val().trim(),
      email: $("#reg-email").val().trim(),
      password: $("#reg-password").val().trim()
    }

    return newUser;
  }


  function submitNewUserToDb(newUser) {

    $.ajax({
      method: "POST",
      url: "/api/register",
      data: newUser
    })
    .done(function(data) {
      localStorage.setItem("token", data.token);
      hideLoginAndDismissModal();
    })
    .fail(function(response) {
      if (response.responseJSON.message === "User already exists") {
        setUserExistsDisplay();
      }
    });
  }


//***************** LOGIN AND AUTH STATUS LOGIC ******************************//

  // Main function to log user in
  function loginUser() {
    var credentials = {
      email: $("#login-email").val().trim(),
      password: $("#login-password").val().trim()
    }
    var validationStatus = validateUserAuthInput(credentials, null);

    if(validationStatus) {
      submitLoginToDb(credentials);
    }
  }


  // Submit user's login credentials to server/db to be authenicated
  function submitLoginToDb(credentials) {

    $.ajax({
      method: "POST",
      url: "/api/login",
      data: credentials
    })
    .done(function(data) {
      localStorage.setItem("token", data.token);
      hideLoginAndDismissModal();
    })
    .fail(function(response) {
      var message = response.responseJSON.message;
      setNoUserOrWrongPwDisplay(message);
    });

  }


  // Function to be called on page load to determine whether user is logged-in
  // If yes, hide login/register display and show logout. If no, display opposite
  function determineAuthStatus() {
    var token = localStorage.getItem("token");

    var ajaxSettings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/user_info",
        "method": "GET",
        "headers": {
          "x-access-token": token,
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    $.ajax(ajaxSettings)
      .done(function (response) {

        if(response.message === "Authenticated") {
          hideLoginAndDismissModal();
        } else if (response.message === "Not authenticated") {
          showLoginAndHideLogout();
        }

      })
      .fail(function(response) {

        if(response.responseJSON.message === "Token expired") {
          localStorage.removeItem("token");
        }

        showLoginAndHideLogout();
      });
  }



//***************** MAJOR AUTH MODAL DISPLAY LOGIC ***************************//

  //Closes modal and clears input, hides login/reg display elements, shows logout
  function hideLoginAndDismissModal() {
    $(".modal-trigger").hide();
    $("#logout-head, #side-logout").show();
    $("#modal1").modal("close");
    $("#first_name, #last_name, #reg-email, #reg-password").val("");
    $("#login-email, #login-password").val("");
  }


  //Shows login/reg display elements, hides logout
  function showLoginAndHideLogout() {
    $(".modal-trigger").show();
    $("#logout-head, #side-logout").hide();
  }

  //Shows err msg on login attempt if password is wrong or no user found
  function setNoUserOrWrongPwDisplay(message) {
    if(message === "Wrong password") {
      $("#main-err-msg").text("Sorry, the password you entered is incorrect.");
    } else if(message === "User not found") {
      $("#main-err-msg").text("Sorry, we have no user registered with that email");
    }
  }


  //Sets display when user attempts to register an email already in our user table
  function setUserExistsDisplay() {
    $("#reg-email, #reg-password").val("");
    $("#main-err-msg").text("Sorry, but we already have an account registered with that email.")
  }


  // Clears error-msg re empty input when user focuses on any modal input element
  $("#modal1 input").on("focus", function() {
    $("#main-err-msg").text("");
  });


  //Toggle error message display and set data attribute submit-btn to trigger
  //correct functionality (login v. register)
  $(".submit-change-trigger").on("click", function() {
    $("#main-err-msg").text("");
    $("#submit-btn").data("submit-type", $(this).text());
  });


  //Clear text from err msg related to email or pw format
  $("#login-anchor-modal, #login-anchor-side").on("click", function() {
    $("#email-format-err-msg, #pw-format-err-msg").text("");
  });


  //Dynamically toggles modal display to correct tab (login v. signup)
  $(".modal-trigger").on("click", function() {

    if($(this).text() == "Sign Up") {
      setTimeout(function() {
        $('ul.tabs').tabs('select_tab', "signup");
      }, 300);
    } else {
      setTimeout(function() {
        $('ul.tabs').tabs('select_tab', "login");
      }, 300);
    }

  })


  //Called on page load to set the correct default btn submit-type
  function setSubmitBtnDefault() {
    $("#submit-btn").data("submit-type", "Login");
  }



  //***************** LOGOUT AND TOKEN DESTRUCTION ***************************//

  //On logout, destroy token in local storage and display sign/register option
  $("#logout-head, #side-logout").on("click", function(event) {
    event.preventDefault();

    if(localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }

    showLoginAndHideLogout();
  });



  //*********************** VALIDATION FOR AUTH INPUT  ***********************//

  // Checks if  data in all field. If data in all fields and registering,
  // execute callback for additional formatting validation on email and pw
  function validateUserAuthInput(authObj, callback) {
    var validated = true;
    var propertyArr = Object.keys(authObj);
    var submitType = $("#submit-btn").data("submit-type");

    propertyArr.forEach(function(property) {
      if(!authObj[property] || authObj[property] == " ") {
        validated = false;
      }
    });

    if(validated && submitType == "Sign Up") {
      //If no empty fields and user is registering, test email and pw format in cb
      return callback(authObj);
    } else if (validated && submitType != "Sign Up") {
      // If no empty fields and user is not registering (i.e., just logging in)
      // then just return true
      return validated;
    } else {
      // If there are empty fields in form, set error display and return false
      $("#main-err-msg").text("Please fill in all fields to register");
      return validated;
    }
  }


  // Calls functions to validate email and pw format
  function validateRegInfoFormat(authObj) {
    var validated = true;

    if(!(testEmailFormat(authObj.email))) {
      $("#email-format-err-msg").text("Please enter a valid email format");
      validated = false;
    }

    if(!(testPasswordFormat(authObj.password)))  {
      var errMsg = "Please enter a password that is at least 8 characters in length";
      $("#pw-format-err-msg").text(errMsg);
      validated = false;
    }

    return validated;
  }


  // Regex to test for valid email format
  function testEmailFormat(email) {
    var result = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm.test(email);
    //console.log("Result of email format test: " + result);
    return result;
  }


  // Test length of password
  function testPasswordFormat(password) {
    var result = password.length >= 8;
    //console.log("Result of email format test: " + result);
    return result;
  }

});
