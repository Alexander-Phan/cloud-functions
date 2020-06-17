import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import app from "./firebase/firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Secret from "./Secret";
import Login from "./Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      app.auth().onAuthStateChanged(setCurrentUser);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  if (currentUser) {
    console.log("User is logged in");
  } else {
    console.log("User not logged in.");
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/secret" component={Secret} />
      </Switch>
    </Router>
  );
}

export default App;
