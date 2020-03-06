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
            reportsTimestamp: "12/02/2020",
            reportsName: "report 1",
            pitching: "pitching details",
            growth: "growth details",
            experience: "experience details",
            delivery: "delivery details",
            retention: "retention details",
            cost: "cost details",
            piePitching: 1,
            pieGrowth: 2,
            pieExperience: 3,
            pieDelivery: 3,
            pieRetention: 4,
            pieCost: 5,
            docs: "e7oPlC8kQZd8p6Qtydao",
            pitchingHours: 1,
            pitchingEnters: 1,
            pitchingWin: 1,
            growthEmployees: 1,
            growthIncome: 1,
            growthProjects: 1,
            experience2: 1,
            experience5: 1,
            experience10: 1,
            experience15: 1,
            retentionProject: 1,
            retentionClients: 1,
            retentionLeft: 1,
            costHourSenior: 1,
            costHourJunior: 1,
            costDaySenior: 1,
            costDayJunior: 1,
            costIdea: 1,
            costMargin: 1,
            DeliveryOnTime: 1,
            DeliveryBeforeDate: 1,
            DeliveryAfterDate: 1
          });
      });
    history.push("/login");
    // [history];
  };

  return (
    <div className="signUp-page-container">
      <div className="signUp-container">
        <h1 className="title">Sign up</h1>
        <form className="form" onSubmit={handleSignUp}>
          <label>
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
