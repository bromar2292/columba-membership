import React from "react";
import Login from "../login";
import Register from "../firebase/SignUp";
import Profile from "../user/profile";
import Reports from "../user/reports";
import ColumbaLogin from "../columba/columbaLogin";
import ColumbaDashboard from "../columba/dashboard";
import "../scss/_.scss";
import PrivateRoute from "../PrivateRoute";
import Pie from "../components/pie3";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authprovider } from "../firebase/Auth";

const App = () => (
  <Authprovider>
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Register} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/reports" component={Reports} />
        <Route path="/columbaLogin" component={ColumbaLogin} />
        <Route path="/pie" component={Pie} />
        <Route path="/columbaDashboard" component={ColumbaDashboard} />
      </div>
    </Router>
  </Authprovider>
);

export default App;
