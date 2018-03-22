var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");
var verifyToken = require("./config/middleware/verify-token.js")
require("dotenv").config();


//Require routes for mounting
var apiRoutes = require("./routes/api-routes.js");
var protectedApiRoutes = require("./routes/protected-api-routes.js");
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

// Set Handlebars Engine
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//*********   MOUNT ROUTES HERE   *********//
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.use(verifyToken);
app.use("/api", protectedApiRoutes);

// Sync our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
