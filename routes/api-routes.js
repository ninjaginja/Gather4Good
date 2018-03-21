var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require("../models");
var express = require("express");
var router = express.Router();

//INSERT other API Routes Here - Attach to "router" instance to export//

//**** ROUTES FOR HANDLING EVENTS ****//
//=========================================//

//CREATES A NEW EVENT **PROTECTED**

//JOINS AN EVENT **PROTECTED**

//GETS ALL EVENTS
router.get("/events", function(req, res) {
  db.Event.findAll({}).then(function(events) {
    res.json(events)
  });
});

//GETS ONE EVENT
router.get("/events/:id", function(req, res) {
  db.Event.findOne({
    where: {
      id: req.perams.id
    }
  }).then(function(event) {
    res.json(event);
  });
});

//GETS EVENTS BY CAUSE
router.get("/events/causes/:cause", function(req, res) {
  db.Event.findAll({
    where: {
      cause: req.perams.cause
    }
  }).then(function(events) {
    res.json(events);
  });
});


//**** ROUTES FOR LOGIN AND REGISTRATION ****//
//=========================================//

// CREATES A NEW USER
router.post('/register', function (req, res) {

  //add logic here to check for existing email

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      .then(function(newUser) {
        res.redirect(307, "/api/login")
      })
      .catch(function(err) {
        return res.status(500).send("There was a problem registering the user.");
      })
});


//LOGS-IN AN EXISTING USER
router.post('/login', function (req, res) {
  var secret_key = process.env.SECRET_KEY;

  //Find the user
  db.User.findOne({
    where: {email: req.body.email}
  })
  .then(function(user) {
    if(!user) {
      return res.status(404).json({
        auth: false,
        token: null,
        message: 'User not found'
      });

    } else if(user) {

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if(!passwordIsValid) {
        return res.status(401).json({
          auth: false,
          token: null,
          message: 'Wrong password'
        });
      }

      var token = jwt.sign({id: user.id, name: user.name, email: user.email}, secret_key, {expiresIn: "2h"});
      res.status(200).json({ auth: true, token: token });
    }

  })
  .catch(function(err) {
    return res.status(500).send("There was an internal server error trying to find the user.");
  })
});

module.exports = router;
