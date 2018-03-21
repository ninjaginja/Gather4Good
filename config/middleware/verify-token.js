var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var express = require("express");
var router = express.Router();
var secret_key = process.env.SECRET_KEY;

//Middleware function to attach to protected API routes
function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  var secret_key = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({auth: false, message: 'No token provided.'});
  }

  jwt.verify(token, secret_key, function(err, decoded) {
    if (err) {
      console.log(err);
      if(err.message == "jwt expired") {
        return res.status(401).json({ auth: false, message: 'Token expired' });
      } else {
        return res.status(500).json({ auth: false, message: 'Internal Server Error - Failed to authenticate token.' });
      }
    } else {
      console.log("decoded token", decoded);
      req.userID = decoded.id;
      console.log(req.userID);
      console.log(typeof req.userID);
      next();
    }

  });
};

module.exports = verifyToken;
