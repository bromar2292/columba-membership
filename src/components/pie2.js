import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import app from "../firebase/base";
import db from "../firebase/database";
import "../scss/_.scss";

const colorMap = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "rgb(106, 226, 122)",
  5: "green"
};
var data = [1, 1, 1, 1, 1, 1];
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Columba",
      users: [],
      chartData: {
        labels: [
          "Cost",
          "Pitching",
          "Experiance",
          "Innovation",
          "growth",
          "Retention"
        ],
        datasets: [
          {
            label: "scores",
            data: data,
            backgroundColor: ["red", "orange", "red", "orange", "red", "orange"]
          }
        ]
      }
    };

    //data is only hardcoded for example purposes. Data should be pulled in dynamically from an async request when the component mounts.

    // // var data = null
    // // componentDidMount(){
    //     async request will be done here to fetch the data when the componenet mounts.
    // // }

    //if the data is above 600,000 then it will display as red in the chart, otherwise it will be green. Set your own parameters below. The function below will map over the data array and return an new array which is referenced in the backgroundColor of the chartData.

    // the position of the different labels in the labels array correspond to the backgroundColor array positions. i.e. labels[0] will have the background color of backgroundColorr[0].
  }

  componentWillMount() {
    let userId = `${app.auth().currentUser.uid}`;
    console.log(userId);
    let User = db.collection("users").doc(userId);
    User.get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let users = doc.data();
          console.log("settings users");
          this.setState({ users: users });
          var colours = [
            this.state.users.pieCost,
            this.state.users.piePitching,

            this.state.users.pieExperiance,
            this.state.users.pieInnovation,
            this.state.users.pieGrowth,

            this.state.users.pieRetention
          ];
          console.log("settings background");
          this.setState({
            chartData: {
              datasets: [
                {
                  label: "scores",
                  data: data,
                  backgroundColor: colours.map(c => colorMap[c])
                }
              ]
            }
          });
          console.log("Document data:", doc.data());
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  render() {
    return (
      <div className="chart">
        <Doughnut
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Agency Score",
              hover: false
            }
          }}
        />
      </div>
    );
  }
}
export default Chart;
