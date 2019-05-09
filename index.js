const express = require("express");

const db = require("./data/db.js");
const server = express();

// MiddleWare
server.use(express.json());

// Create - Adds a new user to the db - Endpoint 'api/users'
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

// Read - Gets the full list of users on the db - Endpoint 'api/users'
server.get("/api/users", (req, res) => {
  db.find()
    .then(allUsers => {
      res.send(allUsers);
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: "The users information could not be retrieved" });
    });
});

// Read - Gets a specific user - Endpoint 'api/users/:id'
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(userById => {
      if (userById) {
        res.json(userById);
      } else {
        res
          .status(404)
          .json({
            message: "The user with the specified ID does not exist!!!"
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved!!!" });
    });
});

// Update
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(updatedUser => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ err: "Incorrect ID" });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id).then(removedUser => {
    res.json(removedUser);
  });
});

// Listening
server.listen(9000, () => {
  console.log("Listening on port 9000");
});
