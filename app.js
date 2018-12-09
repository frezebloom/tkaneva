const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const staticAsset = require("static-asset");

const models = require("./models");
// const routes = require("./routes");
const config = require("./config");

//Initilization
const app = express();
const router = express.Router();
const passport = require("passport");
const session = require("express-session");

//Sets and uses
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

//Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log("Successful database connection");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

//Routes
require("./routes/products.js")(router);

//Startin server
app.listen(config.PORT, () =>
  console.log(`Start server on port ${config.PORT}`)
);
