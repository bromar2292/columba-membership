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
import pdf from "./download.png";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Columba",
      users: [],
      Meeting: 0,
      nextMeeting: "",
      reports: 0,
      reportsTimestamp: "",
      download_link: "",
      docs: ""
    };
  }
  componentWillMount() {
    let userId = app.auth().currentUser.uid;

    // console.log(app.auth().currentUser);
    let User = db.collection("users").doc(userId);
    User.get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let users = doc.data();
          this.setState({
            users: users,
            reports: users.reportsTimestamp.seconds * 1000
          });
          // console.log("Document data:", doc.data());
          // console.log(users.meeting.seconds * 1000);
          // console.log(users.meeting.nanoseconds);
          let currentDate = new Date(this.state.reports);

          // console.log(time);

          let date = currentDate.getDate();
          let month = currentDate.getMonth();
          let year = currentDate.getFullYear();
          let datString = `${date}-${month + 1}-${year}  `;
          // console.log(datString);
          this.setState({ docs: users.docs, reportsTimestamp: datString });
          console.log(this.state.users.docs);

          let testRef = app
            .firestore()
            .collection("documents")
            .doc(this.state.users.docs);
          console.log(this.state.users.docs);

          testRef
            .get()
            .then(doc => {
              if (doc.exists) {
                console.log("link", doc.data().download_link);
                this.setState({ download_link: doc.data().download_link });
              }
            })
            .catch(function(error) {
              console.log("Error getting firestore doc:", error);
            });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  render() {
    const test = `${this.state.users.logo}`;
    return (
      <>
        <Header />
        <div>
          <div className="welcome-reports">
            <img src={test} /> <h2> Welcome {this.state.users.name}</h2>
          </div>
          <div className="report-title">
            <h3>Name</h3>
            <h3>Date</h3>
            <h6>Download pdf</h6>
          </div>
          <div className="reports">
            <h4> {this.state.users.reportsName}</h4>
            <p>{this.state.reportsTimestamp}</p>
            <a href={this.state.download_link}>download link</a>
          </div>
          ;
        </div>
      </>
    );
  }
}

export default Results;
