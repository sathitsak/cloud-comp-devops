import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React from "react";

// Resolves charts dependancy
charts(fusioncharts);

const FusionPie = props => {
  
    return (
      <ReactFusioncharts
        type="pie2d"
        width="1000"
        height="400"
        dataFormat="JSON"
        dataSource={{
          chart: {
            caption: "Australian Usage of Greed Related Keywords",
            plottooltext: "<b>$percentValue</b>  $label ",
            showlegend: "0",
            showpercentvalues: "1",
            legendposition: "bottom",
            usedataplotcolorforlabels: "1",
            theme: "fusion"
          },
          data: props.data
        }}
      />
    );
  
};

export default FusionPie;
