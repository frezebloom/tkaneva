const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const staticAsset = require("static-asset");

const config = require("./config");
const models = require("./models");
const routes = require("./routes");
// const signup = require("./routes/signup");
//Initilization
const app = express();
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
app.use("/", routes.api);
app.use("/", routes.products);
app.use("/", routes.signup);

//Startin server
app.listen(config.PORT, () =>
  console.log(`Start server on port ${config.PORT}`)
);
