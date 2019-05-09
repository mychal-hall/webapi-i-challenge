const express = require("express");

const db = require("./data/db.js");
const server = express();

// MiddleWare
server.use(express.json());

// Create - Adds a new user to the db - Endpoint 'api/users'
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user" });
  }
  db.insert({ name, bio })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database!!!"
      });
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
        res.status(404).json({
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

// Update - udpdate user based on ID - Endpoint '/api/users/:id'
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user" });
  }
  const updatedUser = { name, bio };
  db.update(id, updatedUser)
    .then(response => {
      if (response) {
        res.json(response);
      } else {
        res
          .status(404)
          .json({ message: "The user with specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified!!!" });
    });
});

// Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedUser => {
      if (removedUser) {
        res.json(removedUser);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist!!!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed!!!" });
    });
});

// Listening
server.listen(9000, () => {
  console.log("Listening on port 9000");
});
