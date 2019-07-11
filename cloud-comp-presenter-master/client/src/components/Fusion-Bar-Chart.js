import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

//  Adding the chart as dependency to the core fusioncharts
charts(FusionCharts);

// Creating the DOM element to pass the react-fusioncharts component
const FusionBar = props => {
  return (
    <ReactFusioncharts
      type="column2d"
      width="1000"
      height="400"
      dataFormat="JSON"
      dataSource={{
        chart: {
          caption: "Greed Scores in Australian Cities",
          subCaption: "",
          xAxisName: "City",
          yAxisName: "Score",
          theme: "fusion"
        },

        data: props.data
      }}
    />
  );
};

export default FusionBar;
