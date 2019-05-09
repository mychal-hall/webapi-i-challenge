const express = require("express");

const db = require("./data/db.js");
const server = express();

// MiddleWare
server.use(express.json());

// Create
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(addedUser => {
      res.status(201).json(addedUser);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Read
server.get("/api/users", (req, res) => {
  db.find()
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
