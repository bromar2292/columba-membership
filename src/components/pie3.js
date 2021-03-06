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
      chartInfo: 0,
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
  Classname = e => {
    if (e === 1) {
      return "1";
    } else if (e === 2) {
      return "2";
    } else if (e === 3) {
      return "3";
    }
  };

  render() {
    const data = [
      {
        title: "Cost",
        paragraph: `${this.state.users.costHourSenior}Hourly rate of senior employee
                <br/>
                {this.state.users.costHourJunior} Hourly rate of junior employee{" "}
                <br /> {this.state.users.costDayJunior} Day rate of junior
                employee <br /> {this.state.users.costDaySenior} Day rate of
                senior employee <br />
                {this.state.users.costIdea} Cost of idea creation <br />
                {this.state.users.costMargin} Margin receiving`
      }
    ];
    const chartData = i => {
      if (i === 0) {
        return <div className="chart-into-blank"> </div>;
      } else if (i === 1) {
        return (
          <div className="chart-info-cost">
            <h4>Cost</h4>
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
        );
      } else if (i === 2) {
        return (
          <div className="chart-info-experience">
            {" "}
            <h4>Experiance</h4>
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
        );
      } else if (i === 3) {
        return (
          <div className="chart-info-growth">
            <h4>Growth</h4>
            <p>
              {this.state.users.growthEmployees}% increase in number of
              employees
              <br />
              {this.state.users.growthIncome} % increase in net income
              <br /> {this.state.users.growthProjects}% increase in number of
              projects
            </p>
          </div>
        );
      } else if (i === 4) {
        return (
          <div className="chart-info-delivery">
            <h4>Delivery</h4>
            <p>
              {" "}
              {this.state.users.DeliveryOnTime} % of projects completed on time
              <br />
              {this.state.users.DeliveryBeforeDate} % of projects completed
              before completion date
              <br />
              {this.state.users.DeliveryAfterDate} % of projects completed after
              completion date
            </p>
          </div>
        );
      } else if (i === 5) {
        return (
          <div className="chart-info-pitching">
            <h4>Pitching</h4>
            <p>
              {this.state.users.pitchingHours} Number of hours spent on prep{" "}
              <br /> {this.state.users.pitchingEnters}Number of pitches entered{" "}
              <br />
              {this.state.users.pitchingWin}
              Win ratio
            </p>
          </div>
        );
      } else if (i === 6) {
        return (
          <div className="chart-info-retention">
            <h4>Retention</h4>
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
        );
      } else {
        return <div className="chart-info-blank"> </div>;
      }
    };
    console.log(this.Classname(this.state.users.pieCost));
    console.log(this.Classname(this.state.users.pieExperience));
    console.log(this.Classname(this.state.users.pieGrowth));
    console.log(this.state.works);
    return (
      <>
        <div>{chartData(this.state.chartInfo)}</div>

        <div className={this.props.pieContainer}>
          <div className="chart">
            <h4>
              Your
              <b /> Scores
            </h4>
            <div className="chart-position">
              <ul class="chart-skills">
                <li
                  className={`cost-content${this.Classname(
                    this.state.users.pieCost
                  )}`}
                  onMouseOver={() => this.setState({ chartInfo: 1 })}
                >
                  <span>Cost</span>
                </li>
                <li
                  className={`experiance-content${this.Classname(
                    this.state.users.pieExperience
                  )}`}
                  onMouseOver={() => this.setState({ chartInfo: 2 })}
                >
                  <span>Experiance</span>
                </li>
                <li
                  className={`Growth-content${this.Classname(
                    this.state.users.pieGrowth
                  )}`}
                  onMouseOver={() => this.setState({ chartInfo: 3 })}
                >
                  <span>Growth</span>
                </li>
              </ul>
              <ul class="chart-skills2">
                <li
                  className={`delivery-content${this.Classname(
                    this.state.users.pieDelivery
                  )}`}
                  onMouseOver={() => this.setState({ chartInfo: 4 })}
                >
                  <span className="delivery">Delivery</span>
                </li>
                <li
                  className={`pitching-content${this.Classname(
                    this.state.users.piePitching
                  )}`}
                  onMouseOver={() => this.setState({ chartInfo: 5 })}
                >
                  <span>Pitching</span>
                </li>
                <li
                  className={`Retention-content${this.Classname(
                    this.state.users.pieRetention
                  )}`}
                  onMouseOver={() => this.setState({ chartInfo: 6 })}
                >
                  <span>Retention</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="timestamp">
            <h2> Next meeting date:</h2>
            <p> {this.state.nextMeeting}</p>
          </div>
        </div>
      </>
    );
  }
}
export default Chart;
