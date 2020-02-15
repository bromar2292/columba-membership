import React from "react";
import { Link } from "react-router-dom";
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
        <h2>Columba</h2>
        {/* <button onClick={() =>  } >results</button> */}
        <Link to="/reports">results</Link>
        <h3>profile</h3>
        <button onClick={() => app.auth().signOut()}> Sign out</button>
      </div>
    );
  }
}

export default Header;
