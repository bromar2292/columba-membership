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
            logo:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcEAAABwCAMAAABRhDu+AAABlVBMVEX///////79//8oIVT//f////z///soIlL//P/6//8oIVb8//0oIVMAAEMQAEj///n///bKydAbEU4NAEOFgpIAADnd2+G2tMD/+f9zibLDwcmpudauu9O/vMbY1NwAAD/wrQBvhrf///AoIk6Wk6HOAEkAADf789LtsQDywtgAMobw9vv+++XxrAD64fDzty3UAFgAAC8gGFAAOYr64az22ZPW4ev4zm9HaqgMQo6EmMD00OP87sP00Hf98PplfbPh6fHG0tySpMjXAFvgep/wtiPzw101LlVXUm4cEkzgXoupprR1coflj69pZX3XJWf0wk/t2OTgSn3qssfncJn31IX1u0EdSpbqnr7515nU2cy3yNU5XZ5SWX3hpxfBlUA2VqFQbJ4AKIfo1qy9yeA/XpeZqML767d9jb4kSqAOR4t9m7++sNTPSIH356iGLYCli7PNDWrNX5eqjV63oITqQFD0sWH0qS/rc4NHQWflUYSboMrHOHatHnLymrS2JGxfdbIAACTphGnymAC+pW759s35zYCzYs97AAAgAElEQVR4nN19iVsiyZZvRBCRkCSSKFUuJZaIWqCJSCOLCyJSglspXBW0bjkz5R1Luu1pZ+4s7031zJ25783r/rvfOZGgWC2bJi59vvosliSX+MVZ45wThNQpE42oxEpiIrtgEAovLD2tpQR3RzhTSHC+FFZ5k4MY4X/YK77fWyFEw4dhvXkgyoQgQX/4jrNTovO0PwiXb0kHh/KBLCPGyUQOXyhWntViErpgRIv7E4LxZuNjIrZyNF08HMZ3lo5Sw2UI1WihfBcIlFOdlCseR+tL7+20w7g7gqslZw1FPGMWJFRnRCipUJVoejMWRNCAVJI5PJjeiBCm9QZCqjCSBha8YyYx3SGoZz7ReizZSnTY4luiZHmEiF7NWSuICk6DlUrYwQXXWs1fECiAIjLizkqvbkZovJJgGhe/vbpOuK6lQ3dJ2BvSeHFGSnnrbkmnxvEowTlFnwUjCtDN8gWCoeoocjSWDqU8RKOggwQFIuRGjNH6wZIFcUYyktmLHsyYCtFSfUiJ4CwxH+B3nhX4HuZQqqAwJpoyhCAbR4SrltodDORoEkwF8mz4kCqKMIkPg4LW2cfQFVGFyuoESBL4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",
            meeting: "",
            reportsTimestamp: "12/02/2020",
            reportsName: "report 1",
            pitching: "pitching details",
            growth: "growth details",
            experience: "experience details",
            delivery: "delivery details",
            retention: "retention details",
            cost: "cost details",
            innovation: "innovation details",
            piePitching: 1,
            pieGrowth: 2,
            pieExperience: 3,
            pieDelivery: 3,
            pieRetention: 2,
            pieCost: 1,
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
