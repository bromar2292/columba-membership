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
      nextMeeting: "",
      download_link: ""
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
  }

  getDownloadLink = () => {
    
    let testRef = app.firestore().collection("documents").doc("e7oPlC8kQZd8p6Qtydao");
    
    testRef.get().then( (doc) => {
      if(doc.exists){
        console.log("link", doc.data().download_link);
        this.setState({download_link: doc.data().download_link});
      
      }
    }).catch(function(error){
      console.log("Error getting firestore doc:", error);
      
    });
  }

  render() {

    
    
    const test = `${this.state.users.logo}`;
    return (
      <>
        <Header />
        <div>
          <div className="welcome">
            <img src={test} /> <h2> Welcome {this.state.users.name}</h2>
          </div>
          <a href={this.state.download_link}>download link</a>
        </div>
      </>
    );
  }
}

export default Results;
