require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database");

app.route("/api/books/:userId").get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `books` WHERE userId = ? LIMIT 10",
    req.params.userId,
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post("/api/addbook", function(req, res) {
  connection.query(
    "INSERT INTO `test`.`books` (`id`, `bookTitle`, `userId`) VALUES ('23', 'HP 7', '1')",
    function(error, results, fields) {
      if (error) throw error;
      res.send("added book to record");
    }
  );
});

app.get("/status", (req, res) => res.send("Working!"));

// Port 8080 for Google App Engine
app.set("port", process.env.PORT || 4000);
app.listen(4000, () => console.log("Example app listening on port 4000!"));
