import React, { useContext } from "react";
import app from "../firebase/base";
import db from "../firebase/database";
import "../scss/_.scss";
import Header from "../components/header";
import Accordian from "../components/accordian";

import Pie from "../components/pie3";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../firebase/Auth";
import { Link } from "react-router-dom";
import Analytics from "../components/analytics";
import Reports from "../components/reports";
import { RichText, Date } from "prismic-reactjs";
import { withRouter, Redirect } from "react-router";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Columba",
      users: [],
      Meeting: 0,
      nextMeeting: ""
    };
  }

  componentWillMount() {
    let userId = `${app.auth().currentUser.uid}`;
    // console.log(userId);
    let User = db.collection("users").doc(userId);
    User.get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let users = doc.data();
          this.setState({
            users: users,
            Meeting: users.meeting.seconds * 1000
          });
          // console.log("Document data:", doc.data());
          // console.log(users.meeting.seconds * 1000);
          // console.log(users.meeting.nanoseconds);
          let currentDate = new Date(this.state.Meeting);
          let time = new Date(currentDate + users.meeting.nanoseconds);
          // console.log(time);

          let hours = time.getUTCHours();
          let mins = time.getUTCMinutes();
          // console.log(hours);
          let date = currentDate.getDate();
          let month = currentDate.getMonth();
          let year = currentDate.getFullYear();
          let datString = `${date}-${month + 1}-${year} at ${hours}${mins} `;
          // console.log(datString);
          this.setState({ nextMeeting: datString });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  render() {
    console.log(this.state.user.name);
    const test = `${this.state.users.logo}`;
    console.log(this.state.users.logo);
    return (
      <>
        <Header />
        <div className="profile">
          {" "}
          <div className="welcome">
            <h1> Columba</h1>
            <Link
              className="sign-out"
              onClick={() => app.auth().signOut()}
              to="login"
            >
              Sign out
            </Link>
          </div>
          <div className="top-section">
            <div className="reports-profile-reports">
              <Reports
                reportsContainer="reports-container-reports"
                reportsPage="reports-page-reports"
              />
            </div>
            <div className="pie-chart">
              <Pie />
            </div>
          </div>
          <div className="second-section">
            <div className="analytics-profile">
              <Analytics />
            </div>
            <div className="accordian-timeStamp-reports">
              <Accordian accordionContainer="accordion-container-reports" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
{
  /* {this.state.users &&
              this.state.users.map(users => {
                return (
                  <div>
                    <p>{users.name}</p>
                    <p>{users.location}</p>
                  </div>
                );
              })} */
}
