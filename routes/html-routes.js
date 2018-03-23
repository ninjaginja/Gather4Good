var express = require("express");
var router = express.Router();
var path = require("path");
var db = require('../models')

//INSERT other HTML Routes Here - Attach to "router" instance to export//

//GET route to load the landing-page from the ROOT directory//
router.get("/", function(req, res) {
    db.Event.findAll({ include: [db.Cause]})
    .then((events) => {
      res.render('index', {events: events});
    });
});

//GET route to load the event-specific pages//
router.get("/event/:id", function(req, res) {
    /*Here we receive the request to load a single event page, run a query to get the data from the
    database, load the view with handlebars, and respond with the html*/
    db.Event.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((newEvent) => {
        console.log(newEvent);
        //res.render(/*handlebars stuff for rendering single-event page*/);
    })
});

//GET route to load the create-event page//
router.get("/create", function(req, res) {
    db.Cause.findAll()
    .then((causes) => {
        console.log(causes)
        res.render('create', {causes: causes});
    });
});

module.exports = router;
