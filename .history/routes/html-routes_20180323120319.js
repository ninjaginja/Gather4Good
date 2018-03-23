var express = require("express");
var router = express.Router();
var path = require("path");
var db = require('../models');

//INSERT other HTML Routes Here - Attach to "router" instance to export//

//GET route to load the landing-page from the ROOT directory//
router.get("/", function(req, res) {
    res.render('index');
    // res.sendFile(path.join(__dirname, "../public/assets/test.html")); 
    //*UPDATE* with correct landing-page html
});

//GET route to load the event-specific pages//
router.get("/event/:id", function(req, res) {
    db.Event.findOne({
        where: {
          id: req.params.id
        },
        include: db.Cause
    }).then((events) =>{
        res.render('event', {events: events})
        
    });
    /*Here we will load the "event page" (html), and using handlebars on the front end fetch the specific event
    data from the DATABASE and send it back*/
});

//GET route to load the create-event page (no handlebars needed)//
router.get("/create", function(req, res) {
    db.Cause.findAll()
    .then((causes) => {
        console.log(causes)
        res.render('create', {causes: causes});
    });
    // res.sendFile(path.join(__dirname, "../public/assets/test2.html")); //*UPDATE* with correct create-event html
    
});

module.exports = router;
