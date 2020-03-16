import React, { useContext } from "react";
//import "../scss/_.scss";
import Header from "./header";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link, RichText, Date } from "prismic-reactjs";
import { withRouter, Redirect } from "react-router";
import Chart from "chart.js";

class Analytics extends React.Component {
  OverviewChart_Ref = React.createRef();
  WinRatio_Ref = React.createRef();
  AveragePrepTime_Ref = React.createRef();
  Costing_Ref = React.createRef();

  componentDidMount() {
    const OverviewChartRef = this.OverviewChart_Ref.current.getContext("2d");
    const WinRatioRef = this.WinRatio_Ref.current.getContext("2d");
    const AveragePrepTimeRef = this.AveragePrepTime_Ref.current.getContext(
      "2d"
    );
    const CostingRef = this.Costing_Ref.current.getContext("2d");

    new Chart(OverviewChartRef, {
      type: "line",
      data: {
        labels: ["March 2020", "June 2020", "September 2020", "December 2020"],
        datasets: [
          {
            label: "Cost",
            data: [20, 60, 60, 60],
            borderColor: "green",
            hidden: true
          },
          {
            label: "Pricing",
            data: [40, 80, 80, 80],
            borderColor: "orange",
            hidden: true
          },
          {
            label: "Growth",
            data: [10, 20, 20, 20],
            borderColor: "red",
            hidden: true
          },

          {
            label: "Skill Level",
            data: [50, 70, 40, 90],
            borderColor: "yellow",
            hidden: true
          },

          {
            label: "Delivery",
            data: [10, 40, 60, 100],
            borderColor: "blue",
            hidden: true
          },

          {
            label: "Retention",
            data: [10, 70, 30, 50],
            borderColor: "purple",
            hidden: true
          }
        ]
      },
      options: {}
    });

    new Chart(WinRatioRef, {
      type: "line",
      data: {
        labels: ["March 2020", "June 2020", "September 2020", "December 2020"],
        datasets: [
          {
            label: "Wins",
            data: [10, 50, 80, 100],
            borderColor: "red"
          }
        ]
      },
      options: {}
    });

    new Chart(AveragePrepTimeRef, {
      type: "line",
      data: {
        labels: ["March 2020", "June 2020", "September 2020", "December 2020"],
        datasets: [
          {
            label: "Preparation time",
            data: [10, 40, 60, 0],
            borderColor: "blue"
          }
        ]
      },
      options: {}
    });

    new Chart(CostingRef, {
      type: "line",
      data: {
        labels: ["March 2020", "June 2020", "September 2020", "December 2020"],
        datasets: [
          {
            label: "Cost",
            data: [20, 60, 60, 60],
            borderColor: "green"
          }
        ]
      },
      options: {}
    });
  }

  render() {
    return (
      <>
        <div className={this.props.analyticsContainer}>
          <h2>Analytics</h2>

          <Tabs defaultActiveKey="Overview">
            <Tab eventKey="Overview" title="Overview">
              <canvas id="AnalyticsChart" ref={this.OverviewChart_Ref} />
            </Tab>

            <Tab eventKey="WinRatio" title="Win Ratio">
              <canvas id="WinRatioChart" ref={this.WinRatio_Ref} />
            </Tab>

            <Tab eventKey="AveragePrepTime" title="Average Prep Time">
              <canvas id="WinRatioChart" ref={this.AveragePrepTime_Ref} />
            </Tab>

            <Tab eventKey="Costing" title="Costing">
              <canvas id="WinRatioChart" ref={this.Costing_Ref} />
              <div></div>
            </Tab>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Analytics;
