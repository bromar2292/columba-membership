import React, { useContext } from "react";
//import "../scss/_.scss";
import Header from "../components/header";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link, RichText, Date } from "prismic-reactjs";
import { withRouter, Redirect } from "react-router";
import Chart from "chart.js";

class Analytics extends React.Component {

    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ["March 2020", "June 2020", "September 2020", "December 2020"],
                datasets: [
                    {
                        label: "Cost",
                        data: [20, 60, 60, 60],
                        borderColor: "green",
                        hidden: true,

                    },
                    {
                        label: "Pricing",
                        data: [40, 80, 80, 80],
                        borderColor: "orange",
                        hidden: true,

                    },
                    {
                        label: "Growth",
                        data: [10, 20, 20, 20],
                        borderColor: "red",
                        hidden: true,
                    },

                    {
                        label: "Skill Level",
                        data: [50, 70, 40, 90],
                        borderColor: "yellow",
                        hidden: true,
                    },

                    {
                        label: "Delivery",
                        data: [10, 40, 60, 100],
                        borderColor: "blue",
                        hidden: true,
                    },

                    {
                        label: "Retention",
                        data: [10, 70, 30, 50],
                        borderColor: "purple",
                        hidden: true,
                    },

                ]
            },
            options: {}
        });
    }

    render() {
        return (
            <>
                {/* <Header /> */}


                <div>

                    <div className="welcome-reports">
                        <h2> Welcome To Your Analytics </h2>
                    </div>

                    <h2>Analytics</h2>

                    <Tabs defaultActiveKey="Overview" >

                        <Tab eventKey="Overview" title="Overview">
                            
                                <canvas
                                    id="AnalyticsChart"
                                    ref={this.chartRef}
                                />
                            

                        </Tab>

                        <Tab eventKey="WinRatio" title="Win Ratio">
                            <div>
                              
                            </div>

                        </Tab>

                        <Tab eventKey="AveragePrepTime" title="Average Prep Time">
                            <div>

                            </div>

                        </Tab>

                        <Tab eventKey="Costing" title="Costing">
                            <div>
                                
                            </div>

                        </Tab>



                    </Tabs>

                    





                </div>

            </>
        )
    }


}

export default Analytics;