var express = require("express");
var router = express.Router();
var path = require("path");
var db = require('../models');

//INSERT other HTML Routes Here - Attach to "router" instance to export//

//GET route to load the landing-page from the ROOT directory//
router.get("/", function(req, res) {
  Promise.all([
    db.Event.findAll({
      include: [db.Cause]
    }),
    db.Cause.findAll()
  ])
  .then(function(data) {
    var data = {
      events: data[0],
      causes: data[1]
    }
    res.render('index', data)
  });
});


//GET route to load the event-specific pages//
router.get("/event/:id", function(req, res) {
    /*Here we will load the "event page" (html), and using handlebars on the front end fetch the specific event
    data from the DATABASE and send it back*/
    Promise.all([
      db.Event.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Cause]
      }),
      db.Attendee.findAll({
        where: {
          eventId: req.params.id
        }
      })
    ])
    .then(function(data) {
      var events = data[0];
      var attendees = data[1].length;
      res.render('event', { events: events, attendees: attendees })
    });
});

//GET route to load the create-event page//
router.get("/create", function(req, res) {
    db.Cause.findAll()
    .then((causes) => {
        console.log(causes)
        res.render('create', {causes: causes});
    });
});

router.get("/causes", function(req, res) {

  Promise.all([
    db.Event.findAll({
      where: { CauseId: req.query.cause_id },
      include: [db.Cause]
    }),
    db.Cause.findAll()])
      .then((data) => {
        console.log(JSON.stringify(data));

        if(data[0].length == 0) {
          res.redirect("/");
        } else {

          var dataToRender = {
              events: data[0],
              causes: data[1]
            }

          return res.render('index', dataToRender);
        }
    });
});

module.exports = router;
