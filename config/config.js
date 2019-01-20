const dotenv = require("dotenv");
const path = require("path");

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root("../.env") });

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  TOKEN_LIFE: process.env.TOKEN_LIFE,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD
};
