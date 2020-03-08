import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../src/firebase/base";
import { AuthContext } from "../src/firebase/Auth";
import { Link } from "react-router-dom";
import image1 from "./image1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/profile");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  let currentUser = app.auth().currentUser;
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
            <div>
              Or{" "}
              <Link className="signUp-link" to="/signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>

        <div className="benifits-box">
          <div className="benifits-container">
            <h5>Quarterly reviews </h5>
            <img className="images" src={image1} />
          </div>
          <div className="benifits-container">
            <h5>Mentorship </h5>
            <img className="images" src={image2} />
          </div>
          <div className="benifits-container">
            <h5>Online dashboard </h5>
            <img className="images" src={image3} />
          </div>
        </div>
      </div>
    );
  
};

export default withRouter(Login);
