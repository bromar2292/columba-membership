import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import "../scss/_.scss";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// CanvasJSReact.addColorSet("customColorSet1", [
//   //colorSet Array
//   "#4661EE",
//   "#EC5657",
//   "#1BCDD1",
//   "#8FAABB",
//   "#B08BEB",
//   "#3EA0DD",
//   "#F5A52A",
//   "#23BFAA",
//   "#FAA586",
//   "#EB8CC6"
// ]);

class DoughnutChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Agency score"
      },
      subtitles: [
        {
          text: "71% blank",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true
        }
      ],
      colorSet: "customColorSet1",

      data: [
        {
          type: "doughnut",
          showInLegend: false,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { style: "blue", name: "Cost", y: 20 },
            { style: "blue", name: "Pitching", y: 20 },
            { style: "blue", name: "Experiance", y: 20 },
            { style: "blue", name: "Innovation", y: 20 },
            { style: "blue", name: "growth", y: 20 },
            { style: "blue", name: "Retention", y: 20 }
          ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods....
        maybe.. look into going through the object number to change the color of the pir chart*/}
      </div>
    );
  }
}

export default DoughnutChart;
