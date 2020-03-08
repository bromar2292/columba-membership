import React from "react";
import Login from "../LoginPage";
import Register from "../firebase/SignUp";
import Profile from "../user/profile";
import Reports from "../components/reports";
import ColumbaLogin from "../columba/columbaLogin";
import ColumbaDashboard from "../columba/dashboard";
import "../scss/_.scss";
import PrivateRoute from "../PrivateRoute";
import Pie from "../components/pie";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authprovider } from "../firebase/Auth";
import Analytics from "../user/profileAnalytics";
import ProfileReports from "../user/profileReports";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route path="/signup" component={Register} />
      <Authprovider>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/reports" component={ProfileReports} />
        <PrivateRoute path="/analytics" component={Analytics} />
        <Route path="/columbaLogin" component={ColumbaLogin} />
        <Route path="/pie" component={Pie} />
        <Route path="/columbaDashboard" component={ColumbaDashboard} />
      </Authprovider>
    </div>
  </Router>
);

export default App;
