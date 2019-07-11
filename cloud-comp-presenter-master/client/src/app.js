import React from "react";
import "./index.css";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  greedByCity,
  gambling,
  greedy,
  greedCityYearsMonths,
  tweetByCity
} from "./api";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import { Column, Row } from "simple-flexbox";
import FusionBar from "./components/Fusion-Bar-Chart";
import FusionLineGreed from "./components/Fusion-Line-Chart-Greed";
import FusionLineGamble from "./components/Fusion-Line-Chart-Gamble";
import FusionPie from "./components/Funsion-Pie-Chart";
import * as Colors from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

//To-do List

//1. Get choice data from API
//2. Get data from API
//For now there is test call in inButtonClick
//result is fail
//3. Obviously fix UI
const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit
  }
});

class App extends React.Component {
  state = {
    firstItem: "null",
    secondItem: "null",
    showChart: 0,
    ChartData: "null",
    GamblingData: "null",
    GreedKeyWordData: "null",
    greedCityYearsMonthsData: "null",
    tweetCountMelbourne: "null",
    tweetCountSydney: "null",
    tweetCountAdelaide: "null",
    tweetCountBrisbane: "null",
    totatTweetCount: "null"
  };
  componentDidMount() {
    greedByCity(
      response => {
        //console.log(response.data.Adelaide);
        var newData = [
          {
            label: "Melbourne",
            value: response.data.Melbourne
          },
          {
            label: "Sydney",
            value: response.data.Sydney
          },
          {
            label: "Adelaide",
            value: response.data.Adelaide
          },
          {
            label: "Brisbane",
            value: response.data.Brisbane
          }
        ];
        this.setState({ ChartData: newData });
      },
      error => {
        console.log(error);
      }
    );
    gambling(
      response => {
        var GamblingValue = [];
        //var GamblingYear =Object.keys(response.data);

        for (var key in response.data) {
          for (var key2 in response.data[key]) {
            GamblingValue.push({ value: response.data[key][key2] });
          }
        }
        this.setState({ GamblingData: GamblingValue });
        //console.log(GamblingYear);
      },
      error => {
        console.log(error);
      }
    );

    greedy(
      response => {
        var items = Object.keys(response.data).map(function(key) {
          return [key, response.data[key]];
        });

        items.sort(function(first, second) {
          return second[1] - first[1];
        });
        var topTen = items.slice(0, 10);
        var other = items.slice(10, items.length);
        var otherCount = 0;
        for (var i in other) {
          otherCount += other[i][1];
        }
        topTen.push(["OTHER keywords", otherCount]);
        var Greedy = [];
        var i;
        for (i = 0; i < topTen.length; i++) {
          Greedy.push({
            label: topTen[i][0],
            value: topTen[i][1]
          });
        }

        this.setState({ GreedKeyWordData: Greedy });
      },
      error => {
        console.log(error);
      }
    );

    function toList(dict) {
      return Object.keys(dict).map(function(key) {
        return [key, dict[key]];
      });
    }

    function toValueList(list) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var valueList = [];
      for (var i = 0; i < months.length; i++) {
        for (var j = 0; j < list.length; j++) {
          if (JSON.stringify(list[j][0]).substring(5, 8) == months[i]) {
            valueList.push(list[j][1]);
          }
        }
      }
      return valueList;
    }

    greedCityYearsMonths(
      response => {
        var dataset = [];
        var cityList = Object.keys(response.data);
        for (var c in cityList) {
          var city = Object.entries(response.data)[c];
          var cityLog = Object.entries(city)[1][1];
          var data = [];
          for (var j in cityLog) {
            var valueList = toValueList(toList(cityLog[j]));
            for (var item in valueList) {
              data.push({ value: JSON.stringify(valueList[item]) });
            }
          }
          dataset.push({
            seriesname: city[0],
            data
          });
        }
        this.setState({ greedCityYearsMonthsData: dataset });
      },
      error => {
        console.log(error);
      }
    );
    tweetByCity(
      response => {
        var Total =
          response.data.Melbourne +
          response.data.Sydney +
          response.data.Adelaide +
          response.data.Brisbane;
        this.setState({
          tweetCountMelbourne: response.data.Melbourne,
          tweetCountSydney: response.data.Sydney,
          tweetCountAdelaide: response.data.Adelaide,
          tweetCountBrisbane: response.data.Brisbane,
          totatTweetCount: Total
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    const { classes } = this.props;
    // To change Appbar color, primary1Color
    //To change Appbar text color, alternateTextColor

    const muiTheme = getMuiTheme({
      palette: {
        textColor: Colors.darkBlack,
        primary1Color: Colors.black,
        primary2Color: Colors.indigo700,
        accent1Color: Colors.redA200,
        pickerHeaderColor: Colors.darkBlack,
        alternateTextColor: Colors.white
      },
      appBar: {
        height: 60
      }
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={classes.root}>
          <AppBar title="Australian Tweet Greed Analysis in Relation to Melbourne Gambling Expenditure" />
          <h2>
            Total tweet count: {this.state.totatTweetCount}
            &emsp;&emsp;&emsp;Melbourne: {this.state.tweetCountMelbourne}
            &emsp;&emsp;&emsp;Sydney: {this.state.tweetCountSydney}
            &emsp;&emsp;&emsp;Adelaide: {this.state.tweetCountAdelaide}
            &emsp;&emsp;&emsp;Brisbane: {this.state.tweetCountBrisbane}
          </h2>
        </div>

        <div>
            <Row>
              <h1> </h1>
            </Row>
            <Row horizontal="center">
              <Column flexGrow={1} horizontal="center">
                <span>
                  <FusionBar data={this.state.ChartData} />
                </span>
              </Column>
              <Column flexGrow={1} horizontal="center">
                <span>
                  <FusionPie data={this.state.GreedKeyWordData} />
                </span>
              </Column>
            </Row>
            <Row>
              <h1> </h1>
            </Row>
            <Row horizontal="center">
              <Column flexGrow={1} horizontal="center">
                <span>
                  <FusionLineGreed
                    dataset={this.state.greedCityYearsMonthsData}
                  />
                </span>
              </Column>
              <Column flexGrow={1} horizontal="center">
                <span>
                  <FusionLineGamble data={this.state.GamblingData} />
                </span>
              </Column>
            </Row>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
