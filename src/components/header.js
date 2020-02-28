import React from "react";
import { Link } from "react-router-dom";
import app from "../firebase/base";
import { withRouter, Redirect } from "react-router";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  render() {
    return (
      <div className="header">
        {" "}
        <h2>Columba</h2>
        {/* <button onClick={() =>  } >results</button> */}
        <Link className="header-link" to="/reports">
          Brand Reports
        </Link>
        <Link className="header-link" to="/profile">
          Profile
        </Link>
        <Link className="header-link" to="/profile">
          analyitics
        </Link>
        <Link
          className="sign-out"
          onClick={() => app.auth().signOut()}
          to="login"
        >
          Sign out
        </Link>
      </div>
    );
  }
}

export default Header;
