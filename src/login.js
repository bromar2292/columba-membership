import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../src/firebase/base";
import { AuthContext } from "../src/firebase/Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="page-container">
      <div className="login-container">
        <h1 className="title">Log in</h1>
        <form onSubmit={handleLogin} className="form">
          <label>
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
