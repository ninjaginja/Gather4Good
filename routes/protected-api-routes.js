var db = require("../models");
var express = require("express");
var router = express.Router();

router.post('/events/create', function (req, res) {

  req.body.organizer_id = req.userID;
  console.log(req.body);

  db.Event.create(req.body).then(function(newEvent) {
    res.json(newEvent);
  });
});

router.get('/user_info', function (req, res) {

  //Send ID if token exists and valid
  res.json({auth: true, id: req.userID, message: "Authenticated"});

});

module.exports = router;
