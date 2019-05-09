const express = require("express");

const db = require("./data/db.js");
const server = express();

// MiddleWare
server.use(express.json());

// Read
server.get("/api/users", (req, res) => {
  db
    .find()
    .then(allUsers => {
      res.send(allUsers);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Listening
server.listen(9000, () => {
  console.log("Listening on port 9000");
});
