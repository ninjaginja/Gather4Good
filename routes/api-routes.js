var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require("../models");
var express = require("express");
var router = express.Router();
var verifyToken = require("../config/middleware/verify-token.js")
var secret_key = process.env.SECRET_KEY;

//INSERT other API Routes Here - Attach to "router" instance to export//
// Attach middleware function (verifyToken) to protected routes //


//**** ROUTES FOR LOGIN AND REGISTRATION ****//
//=========================================//

// CREATES A NEW USER
router.post('/register', function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      .then(function(newUser) {
        res.redirect(307, "/api/auth/login")
      })
      .catch(function(err) {
        return res.status(500).send("There was a problem registering the user.");
      })
});


//LOGS-IN AN EXISTING USER
router.post('/login', function (req, res) {

  //Find the user
  db.User.findOne({
    where: {email: req.body.email}
  })
  .then(function(user) {
    if(!user) {
      return res.status(404).json({
        auth: false,
        token: null,
        message: 'Authentication failed. User not found.'
      });

    } else if(user) {
      //Check if password matches
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if(!passwordIsValid) {
        return res.status(401).json({
          auth: false,
          token: null,
          message: 'Authentication failed. Wrong password.'
        });
      }

      var token = jwt.sign({id: user.id, email: user.email, name: user.name},
                            secret_key,
                            {expiresIn: 86400});

      res.status(200).json({ auth: true, token: token });
    }

  })
  .catch(function(err) {
    return res.status(500).send("There was an internal server error trying to find the user.");
  })
});

module.exports = router;
