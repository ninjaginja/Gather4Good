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

module.exports = router;
