var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");
require("dotenv").config();

//Require routes for mounting
var apiRoutes = require("./routes/api-routes.js");
var htmlRoutes = require("./routes/html-routes.js");

var app = express();
var PORT = process.env.PORT || 8080;

// Parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve files from static directory
app.use(express.static("public"));

//*********   MOUNT ROUTES HERE   *********//
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);

// Sync our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
