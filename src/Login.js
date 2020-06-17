import React from "react";
import * as firebase from "firebase";
import app from "./firebase/firebase";
import { withRouter } from "react-router";

function Login({ history }) {
  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    app
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        history.push("/secret");
      })
      .catch(e => console.log(e.message));
  };
  return (
    <>
      <h1>This is the login page</h1>
      <button onClick={handleLogin}>Login with google</button>
    </>
  );
}

export default withRouter(Login);
