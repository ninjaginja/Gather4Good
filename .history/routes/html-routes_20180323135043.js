var express = require("express");
var router = express.Router();
var path = require("path");
var db = require('../models');

//INSERT other HTML Routes Here - Attach to "router" instance to export//

//GET route to load the landing-page from the ROOT directory//
router.get("/", function(req, res) {
    db.Event.findAll()
    db.Cause.findAll()
    .then(function(causes, events) {
     res.render('index', {events: events}, {causes: causes});
    });
});

//GET route to load the event-specific pages//
router.get("/event/:id", function(req, res) {
    /*Here we will load the "event page" (html), and using handlebars on the front end fetch the specific event
    data from the DATABASE and send it back*/
    db.Event.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Cause]
    }).then((events) =>{
        res.render('event', {events: events})
        
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

  db.Event.findAll({
    where: {
      CauseId: req.query.cause_id
    },
    include: [db.Cause]
  })
  .then((events) => {
    console.log(JSON.stringify(events));
    if(events.length == 0) {
      res.redirect("/");
    } else {
      return res.render('index', {events: events});
    }
  });

})

module.exports = router;
