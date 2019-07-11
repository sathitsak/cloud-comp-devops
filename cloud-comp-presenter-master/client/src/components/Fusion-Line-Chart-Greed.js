import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React from 'react';


// Resolves charts dependancy
charts(fusioncharts);


class FusionLineGreed extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="msline"
        width="1000"
        height="400"
        dataFormat="JSON"
        dataSource={{
          chart: {
          caption: "Monthly Greed Score Over Time for Australian Cities",
          yaxisname: "per capta",
          subcaption: "2018-2019",
          showhovereffect: "1",
          numbersuffix: "",
          drawcrossline: "1",
          plottooltext: "<b>$dataValue</b>  $seriesName",
          theme: "fusion"
        },
        categories: [
          {
            category: [
              {
                label: "1/2018"
              },
              {
                label: "2/2018"
              },
              {
                label: "3/2018"
              },
              {
                label: "4/2018"
              },
              {
                label: "5/2018"
              },
              {
                label: "6/2018"
              },
              {
                label: "7/2018"
              },
              {
                label: "8/2018"
              },
              {
                label: "9/2018"
              },
              {
                label: "10/2018"
              },
              {
                label: "11/2018"
              },
              {
                label: "12/2018"
              },
              {
                label: "1/2019"
              },
              {
                label: "2/2019"
              },
              {
                label: "3/2019"
              },
              {
                label: "4/2019"
              },
              {
                label: "5/2019"
              },
            ]
          }
        ],
        dataset: this.props.dataset
       }}
      />
    );
  }
}



export default FusionLineGreed;