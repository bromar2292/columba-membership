import React, { useContext } from "react";
import app from "../firebase/base";
import db from "../firebase/database";
import "../scss/_.scss";
import Header from "../components/header";
import Accordian from "../components/accordian";
import logo from "./logo.png";
import Pie from "../components/pie";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../firebase/Auth";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Columba",
      users: []
    };
  }

  componentWillMount() {
    let userId = `${app.auth().currentUser.uid}`;
    console.log(userId);
    let User = db.collection("users").doc(userId);
    User.get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let users = doc.data();
          this.setState({ users: users });
          console.log("Document data:", doc.data());
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
        <div className="profile">
          {" "}
          <div className="welcome">
            <img src={logo} /> <h2> Welcome {this.state.users.name}</h2>
          </div>
          <div className="profile-data">
            <Accordian />
            {/* {this.state.users &&
              this.state.users.map(users => {
                return (
                  <div>
                    <p>{users.name}</p>
                    <p>{users.location}</p>
                  </div>
                );
              })} */}

            <div className="pie-chart">
              <Pie />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
