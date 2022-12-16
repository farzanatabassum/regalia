const express = require('express');
const dotenv = require('dotenv').config();
const next = require("next");
const dev = process.env.NODE !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);
app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("Starting http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
