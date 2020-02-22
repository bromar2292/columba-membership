import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import app from "../firebase/base";
import db from "../firebase/database";
import "../scss/_.scss";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Columba",
      users: [],
      chartData: {
        labels: [
          "Number of hours spent on prep ,Number of pitches entered,Win ratio",
          "Pitching",
          "Experiance",
          "Innovation",
          "growth",
          "Retention"
        ]
      }
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
          this.setState({ users: users });
          // console.log("Document data:", doc.data());
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  render() {
    return (
      <div>
        <ul class="chart-skills">
          <li>
            <span>Cost</span>
            <div className="Cost-content">
              <h2>Cost</h2>
              <p>
                {" "}
                {this.state.users.costHourSenior}Hourly rate of senior employee{" "}
                <br />
                {this.state.users.costHourJunior} Hourly rate of junior employee{" "}
                <br /> {this.state.users.costDayJunior} Day rate of junior
                employee <br /> {this.state.users.costDaySenior} Day rate of
                senior employee <br />
                {this.state.users.costIdea} Cost of idea creation <br />
                {this.state.users.costMargin} Margin receiving
              </p>
            </div>
          </li>
          <li>
            <span>Experiance</span>
            <div className="Experiance-content">
              <h2>Experiance</h2>
              <p>
                {this.state.users.experience2} % of employees with less than 2
                years experience <br />
                {this.state.users.experience5}
                % of employees with 2-5 years experience <br />
                {this.state.users.experience10}
                % of employees with 5-10 years experience <br />
                {this.state.users.experience15}% of employees with 10+ years
                experience
              </p>
            </div>
          </li>
          <li>
            <span>Growth</span>
            <div className="Growth-content">
              <h2>Growth</h2>
              <p>
                {this.state.users.growthEmployees}% increase in number of
                employees
                <br />
                {this.state.users.growthIncome} % increase in net income
                <br /> {this.state.users.growthProjects}% increase in number of
                projects
              </p>
            </div>
          </li>
          <li>
            <span className="delivery">Delivery</span>
            <div className="delivery-content">
              <h2>Delivery</h2>
              <p>
                {" "}
                {this.state.users.DeliveryOnTime} % of projects completed on
                time
                <br />
                {this.state.users.DeliveryBeforeDate} % of projects completed
                before completion date
                <br />
                {this.state.users.DeliveryAfterDate} % of projects completed
                after completion date
              </p>
            </div>
          </li>
          <li>
            <span>Pitching</span>
            <div className="Pitching-content">
              <h2>Pitching</h2>
              <p>
                {this.state.users.pitchingHours} Number of hours spent on prep{" "}
                <br /> {this.state.users.pitchingEnters}Number of pitches
                entered <br />
                {this.state.users.pitchingWin}
                Win ratio
              </p>
            </div>
          </li>
          <li>
            <span>Retention</span>
            <div className="Retention-content">
              <h2>Retention</h2>
              <p>
                {this.state.users.retentionProject} % of clients retained after
                initial project
                <br />
                {this.state.users.retentionClients} % of projects from previous
                clients
                <br />
                {this.state.users.retentionLeft} Number of clients who have left
              </p>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default Chart;
