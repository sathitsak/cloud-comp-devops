var standardErrors = require('../utils/standardErrorResponses.js');
var dbConnect = require('../database/connect.js');
var couchAuth = dbConnect.couchAuth;
var COUCH_DB_NAME = dbConnect.couchDbName;
var Promise = require("bluebird");

//VIEWS
const  AVERAGE_GREED_BY_CITY_VIEW = '_design/city_views/_view/greed_by_city'

const  AVERAGE_GREED_BY_CITY_YEARS_VIEW = '_design/city_views/_view/yearly_city_view?group_level=2'
const cities = ['"Melbourne"','"Sydney"','"Brisbane"','"Adelaide"']

var greedYearlyByCity = function(req,res){
  var promises = [];
  var all_city_years = {};



  cities.forEach(function(city) {
    all_city_years[city] = {}
    console.log(all_city_years)
    years.forEach(function(year) {
      promises.push(makeCityYearlyDataPromise(year,city,all_city_years));
    })
  });

  Promise.all(promises).then(function() {
    console.log(all_city_years);
    res.status(200).json(all_city_years);
  });

}



function makeCityYearlyDataPromise(year,city,all_city_years) {
  return new Promise(function(solve) {
    couchAuth.get(COUCH_DB_NAME, AVERAGE_GREED_BY_CITY_YEARS_VIEW + "&key=[" + '"' + year + '"' + "," +  '"' + city + '"' +  "]").then(({data, headers, status}) => {
        //res.status(200).json(data);
        var value;
        if(data.rows[0]){
          value = data.rows[0].value.average
          all_city_years[city][year] = value
        }
        solve();
    }, err => {
        console.log(err)
        standardErrors.badRequestRes()
    });
  });
}




module.exports.greedByCity = greedByCity;
