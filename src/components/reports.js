import React, { useContext } from "react";
import app from "../firebase/base";
import db from "../firebase/database";
import "../scss/_.scss";
import Header from "./header";
import Accordian from "./accordian";
import logo from "./logo.png";
import Pie from "./pie2";
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
      docs: []
    };
  }
  componentWillMount() {
    let userId = app.auth().currentUser.uid;

    console.log(app.auth().currentUser);
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

    this.getDownloadLink();

    this.getMarker();
  }

  async getMarker() {
    const snapshot = await app
      .firestore()
      .collection("documents")
      .get();

    snapshot.docs.map(doc => this.state.docs.push(doc.data()));
  }

  getDownloadLink = () => {
    let testRef = app
      .firestore()
      .collection("documents")
      .doc("e7oPlC8kQZd8p6Qtydao");

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
  };

  MapThroughDocs() {
    console.log("hi");
    console.log(this.state.docs);
    return this.state.docs.map(data => {
      console.log(data);
      return (
        <div>
          <h4>{data.Document_name}</h4>
          <p>{data.upload_date}</p>
          <a href={data.download_link} target="_blank">
            Download Link{" "}
          </a>
        </div>
      );
    });
  }

  render() {
    const test = `${this.state.users.logo}`;

    return (
      <>
        <div className={this.props.reportsPage}>
          <h2>Reports</h2>
          <div className={this.props.reportsContainer}>
            <div>
              <div className="reports-content">
                <p>
                  {this.state.users.reportsName
                    ? this.state.users.reportsName
                    : "name"}
                </p>
                <p>
                  {this.state.users.reportsTimestamp
                    ? this.state.users.reportsTimestamp
                    : "date"}
                </p>
                <a href={this.state.download_link} target="_blank">
                  Download Link{" "}
                </a>
              </div>
              <div className="underline"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Results;
