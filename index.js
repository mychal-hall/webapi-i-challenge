const express = require("express");

const db = require("./data/db.js");
const server = express();
const { users } = db;

// MiddleWare
server.use(express.json());

// Read
server.get("/api/users", (req, res) => {
    
})

// Listening
server.listen(9000, () => {
  console.log("Listening on port 9000");
});
