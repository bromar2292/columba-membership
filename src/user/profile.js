import React from "react";
import app from "../firebase/base";
import db from "../firebase/database";
import "../scss/_.scss";
import Header from "../components/header";
import Accordian from "../components/accordian";
import logo from "./logo.png";
import Pie from "../components/pie";
import "bootstrap/dist/css/bootstrap.min.css";
import Authcontext from "../firebase/Auth";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Columba",
      users: []
    };
  }

  componentWillMount() {
    console.log(
      db
        .collection("users" + app.auth().currentUser.uid)
        .get()
        .then(snapshot => {
          const users = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            users.push(data);
            console.log(data);
          });
          console.log(snapshot);
          this.setState({ users: users });
        })
        .catch(error => console.log(error))
    );
  }
  render() {
    return (
      <>
        <Header />
        <div className="profile">
          {" "}
          <div className="welcome">
            <img src={logo} /> <h2> Welcome {this.state.user}</h2>
          </div>
          <div className="profile-data">
            <Accordian />
            {this.state.users &&
              this.state.users.map(users => {
                return (
                  <div>
                    <p>{users.name}</p>
                  </div>
                );
              })}

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
