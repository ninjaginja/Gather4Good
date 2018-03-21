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
  //Call this function as soon as a page loads to determine
  //whether to display
  req.body.organizer_id = req.userID;

});

module.exports = router;
