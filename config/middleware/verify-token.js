var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var express = require("express");
var router = express.Router();
var secret_key = process.env.SECRET_KEY;

//Middleware function to attach to protected API routes
function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.body.token || req.query.token;

  if (token = "null") {
    token = null;
  }

  if (!token) {
    return res.status(401).json({auth: false, message: 'No token provided.'});
  }

  jwt.verify(token, secret_key, function(err, decodedToken) {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Internal Server Error - Failed to authenticate token.' });
    }

    console.log(decodedToken);
    req.userID = decodedToken.id;
    console.log(req.userID);
    next();
  });
};

module.exports = router;
