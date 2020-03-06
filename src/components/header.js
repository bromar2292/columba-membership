import React from "react";
import { Link } from "react-router-dom";
import app from "../firebase/base";

import db from "../firebase/database";
import { withRouter, Redirect } from "react-router";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      users: []
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
            users: users
          });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  render() {
    return (
      <div className="header">
        {" "}
        <img className="header-logo" src={this.state.users.logo} />
        {/* <button onClick={() =>  } >results</button> */}
        <div className="links">
          <Link className="header-link" to="/profile">
            Home
          </Link>
          <Link className="header-link" to="/reports">
            Reports
          </Link>
          <Link className="header-link" to="/analytics">
            Analytics
          </Link>
          <Link className="header-link" to="/analytics">
            Rankings
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
