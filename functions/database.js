const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "35.184.60.245",
  user: "testUser",
  database: "test",
  password: "dance"
});

connection.connect(err => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as thread id: " + connection.threadId);
});

module.exports = connection;
