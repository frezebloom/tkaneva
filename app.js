const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const staticAsset = require("static-asset");

const routes = require("./routes");
const config = require("./config");

//express
const app = express();

//sets and uses
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes.products);

app.listen(config.PORT, () =>
  console.log(`Start server on port ${config.PORT}`)
);
