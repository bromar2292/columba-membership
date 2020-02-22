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
            logo: "",
            meeting: "",
            reportsTimestamp: "",
            reportsName: "",
            pitching: "pitching details",
            growth: "growth details",
            experiance: "experiance details",
            innovation: "inovation details",
            retention: "retention details",
            cost: "cost details",
            piePitching: 1,
            pieGrowth: 2,
            pieExperiance: 3,
            pieInnovation: 3,
            pieRetention: 4,
            pieCost: 5,
            docs: "e7oPlC8kQZd8p6Qtydao",
            pitchingHours: 0,
            pitchingEnters: 0,
            pitchingWin: 0,
            growthEmployees: 0,
            growthIncome: 0,
            growthProjects: 0,
            experience2: 0,
            experience5: 0,
            experience10: 0,
            experience15: 0,
            retentionProject: 0,
            retentionClients: 0,
            retentionLeft: 0,
            costHourSenior: 0,
            costHourJunior: 0,
            costDaySenior: 0,
            costDayJunior: 0,
            costIdea: 0,
            costMargin: 0,
            DeliveryOnTime: 0,
            DeliveryBeforeDate: 0,
            DeliveryAfterDate: 0
          });
      });
    history.push("/login");
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
