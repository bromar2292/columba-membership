import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import "firebase/firestore";
import * as firebase from "firebase/app";
// import admin from "firebase-admin";
// import functions from "firebase-functions";
const db = firebase.firestore();
const SignUp = ({ history }) => {
  // admin.initializeApp(functions.config().app);

  // const db = app.firestore();
  const handleSignUp = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    app
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(currentUser => {
        console.log(currentUser.user.uid);
        db.collection("users")
          .doc(currentUser.user.uid)
          .set({
            name: "mr programmer",
            pitching: "pitching details",
            growth: "growth details",
            experiance: "experiance details",
            innovation: "inovation details",
            retention: "retention details",
            cost: "cost details"
          });
      });
    history.push("/");
    // [history];
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
