const functions = require("firebase-functions");
const connection = require("./database");
const mysql = require("mysql");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const dbSocketPath = process.env.DB_SOCKET_PATH;

exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  console.log("Hello");
  response.send(number.toString());
});

exports.toQuizia = functions.https.onRequest((request, response) => {
  response.redirect("https://www.quizia.com");
});

//http callable function
// data - represents data we send to function when we call it in our code
// context - additional info (i.e. authentication status of the user)
exports.sayHello = functions.https.onCall(data => {
  const name = data.name;
  return `hello, ${name}`;
});

exports.addBook = functions.https.onRequest((request, response) => {
  const pool = (mysql.Pool = mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    socketPath: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`
  }));

  pool.query("SELECT * FROM books", (err, rows) => {
    if (err) {
      console.log(err);
      reject(err);
    } else {
      console.log(rows);
    }
  });
  response.send("testinnng this");
});

exports.test = functions.https.onRequest((request, response) => {
  response.send("book added");
});
