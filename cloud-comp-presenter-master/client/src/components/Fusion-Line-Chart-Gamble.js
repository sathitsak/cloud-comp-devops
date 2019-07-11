import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

charts(fusioncharts);


const FusionLineGamble = props => {
  
    return (
      <ReactFusioncharts
        type="msline"
        width="1000"
        height="400"
        dataFormat="JSON"
        dataSource={{chart: {
          caption: "Melbourne Monthly Gambling Expenditure",
          yaxisname: "per capta",
          subcaption: "2018-2019",
          showhovereffect: "1",
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
                label: "2/2018"
              },
              {
                label: "3/2019"
              },
            ]
          }
        ],
        dataset: [
          {
            seriesname: "Melbourne",
            data: props.data
          },
        
         
          
        ]}}
      />
    );
  
}



export default FusionLineGamble;