var db = require("../models");
var express = require("express");
var router = express.Router();

//Route to create a new event
router.post('/events/create', function (req, res) {

  req.body.organizer_id = req.userID;
  console.log(req.body);

  if(req.body.img_url == "") {
    req.body.img_url = null;
  }

  if(req.body.location_name == "") {
    req.body.location_name = null;
  }

  console.log(req.body);

  db.Event.create(req.body).then(function(newEvent) {
    res.json(newEvent);
  });

});

//Route to determine user auth status - called on each page load
router.get('/user_info', function (req, res) {
  //Send ID if token exists and valid
  res.json({auth: true, id: req.userID, message: "Authenticated"});
});

//Post route to receive request to join event.
router.post("/events/join", function(req, res) {

  var attendee = {
    userId: req.userID,
    eventId: req.body.id
  }

  db.Attendee.findOne({
    where: attendee
  }).then(function(entry) {
    if(entry){
      res.json(false);
    } else {
      db.Attendee.create(attendee).then(function (attendee) {
        res.json(attendee);
      });
    }
  })

});

module.exports = router;
