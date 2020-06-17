import React, { useState } from "react";
import * as firebase from "firebase";
import app from "./firebase/firebase";
import axios from "axios";

function Secret() {
  const [book, setBook] = useState("not yet received books");
  const [addtext, setAddtext] = useState("");

  function handleClick() {
    const sayHello = app.functions().httpsCallable("sayHello");
    // the object passed in sayHello represents the data that we can pass to the function.
    // we can access the name property in the data of the function
    sayHello({ name: "Alex" }).then(result => {
      alert(result.data);
    });
  }

  function handleGetBook() {
    // const addBook = app.functions().httpsCallable("addBook");
    // addBook();
    axios.get("/api/books/1").then(response => {
      console.log(response);
      let test = response.data;
      console.log(test[0].bookTitle);
      setBook(response.data[4].bookTitle);
    });
  }

  function handleAddBook() {
    // const addBook = app.functions().httpsCallable("addBook");
    // addBook();
    axios.post("/api/addbook").then(response => {
      console.log(response);
      setAddtext("Book added to records");
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is the app</h1>
        <button onClick={handleGetBook}>Get Book</button>
        <p>The books of this user is: {book}</p>
        <button onClick={handleAddBook}>Add Book</button>
        <p>{addtext}</p>
        <p>Testing these Functions out</p>
        <button onClick={handleClick}>Say Hello</button>

        <button
          onClick={() => {
            app.auth().signOut();
            console.log("signed out");
          }}
        >
          Sign Out
        </button>
      </header>
    </div>
  );
}

export default Secret;
