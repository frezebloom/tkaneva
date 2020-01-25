const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const staticAsset = require("static-asset");
var cors = require("cors");

const config = require("./config/config");
const models = require("./models");
const routes = require("./routes");

//Initilization
const app = express();
app.use(cors());

//Sets and uses
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
app.use("/api", routes.auth);
app.use("/api", routes.user);
app.use("/api", routes.userGroup);
app.use("/api", routes.color);
app.use("/api", routes.brand);
app.use("/api", routes.category);
app.use("/api", routes.superuser);
app.use("/api", routes.product);
app.use("/api", routes.upload);
app.use("/", routes.products);

//Startin server
app.listen(config.PORT, () =>
  console.log(`Start server on port ${config.PORT}`)
);
