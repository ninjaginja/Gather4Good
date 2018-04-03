var express = require("express");
var router = express.Router();
var path = require("path");
var db = require('../models');

//GET route to load the landing-page from the ROOT directory//
router.get("/", function(req, res) {
  Promise.all([
    db.Event.findAll({
      // PAGINATION CODE!! LIMITS RESULTS
      // limit: 5,
      // END
      include: [db.Cause],
      order: [
        ['id', 'DESC']
      ]
    }),
    db.Cause.findAll()
  ])
  .then(function(data) {
    // console.log("......");
    // console.log(data[0]);
    // console.log("......");
    var data = {
      events: data[0],
      causes: data[1]
    }
    res.render('index', data)
  });
});

// PAGINATION CODE!! Result Page 2
// router.get("/?page=2", function(req, res) {
//   Promise.all([
//     db.Event.findAll({
//       limit: 5,
//       offset: 5,
//       include: [db.Cause],
//       order: [
//         ['id', 'DESC']
//       ]
//     }),
//     db.Cause.findAll()
//   ])
//   .then(function(data) {
//     // console.log("......");
//     // console.log(data[0]);
//     // console.log("......");
//     var data = {
//       events: data[0],
//       causes: data[1]
//     }
//     res.render('index', data)
//   });
// });

// END OF PAGINATION CODE!!!!

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
      var organizerId = data[0].organizer_id;
      db.User.findOne({
        where: {
          id: organizerId
        }
      }).then(function(user) {
      var organizer = user.name;
      res.render('event', { events: events, attendees: attendees, organizer: organizer })
      });
    });
});

//GET route to load the create-event page//
router.get("/create", function(req, res) {
    db.Cause.findAll()
    .then((causes) => {
        // console.log(causes)
        res.render('create', {causes: causes});
    });
});

router.get("/causes", function(req, res) {

  Promise.all([
    db.Event.findAll({
      where: { CauseId: req.query.cause_id },
      include: [db.Cause],
      order: [
        ['id', 'DESC']
      ]
    }),
    db.Cause.findAll()])
      .then((data) => {
        // console.log(JSON.stringify(data));
          var dataToRender = {
              events: data[0],
              causes: data[1]
            }
          return res.render('index', dataToRender);
    });
});

module.exports = router;
