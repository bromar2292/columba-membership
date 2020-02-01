import React from "react";
import { NavLink } from "react-router-dom";
import app from "../firebase/base";
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
        header
        <button onClick={() => app.auth().signOut()}> Sign out</button>
      </div>
    );
  }
}

export default Header;
