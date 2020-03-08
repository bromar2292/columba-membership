import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../src/firebase/base";

const Login = ({ history }) => {


  let currentUser = app.auth().currentUser;

  if (currentUser != null) {
    return <Redirect to="/profile" />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default withRouter(Login);
