import React, { useContext } from "react";
import app from "../firebase/base";
import db from "../firebase/database";
import "../scss/_.scss";
import Header from "../components/header";
import Accordian from "../components/accordian";
import logo from "./logo.png";
import Pie from "../components/pie2";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../firebase/Auth";
import { Link, RichText, Date } from "prismic-reactjs";

class Results extends React.Component {
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
          console.log(users.meeting.seconds * 1000);
          console.log(users.meeting.nanoseconds);
          let currentDate = new Date(this.state.Meeting);
          let time = new Date(currentDate + users.meeting.nanoseconds);
          console.log(time);

          let hours = time.getUTCHours();
          let mins = time.getUTCMinutes();
          console.log(hours);
          let date = currentDate.getDate();
          let month = currentDate.getMonth();
          let year = currentDate.getFullYear();
          let datString = `${date}-${month + 1}-${year} at ${hours}${mins} `;
          console.log(datString);
          this.setState({ nextMeeting: datString });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }
  render() {
    return (
      <>
        <Header />
        <div>
          <div className="welcome">
            <img src={test} /> <h2> Welcome {this.state.users.name}</h2>
          </div>
          reports
        </div>
      </>
    );
  }
}

export default Results;
