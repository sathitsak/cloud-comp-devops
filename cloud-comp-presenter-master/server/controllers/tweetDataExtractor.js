var standardErrors = require('../utils/standardErrorResponses.js');
var dbConnect = require('../database/connect.js');
var couchAuth = dbConnect.couchAuth;
var COUCH_DB_NAME = dbConnect.couchDbName;
var Promise = require("bluebird");
var aurinData = require('../utils/aurin_data.js')

//VIEWS
const  AVERAGE_GREED_BY_CITY_VIEW = '_design/city_views/_view/greed_by_city?group_level=1'
const  AVERAGE_GREED_BY_YEAR_VIEW = '_design/yearly_views/_view/yearly_greed?group_level=1'
const  AVERAGE_GREED_BY_CITY_MONTHS_YEARS_VIEW = '_design/city_views/_view/month_city_view?group_level=2'
const  GREEDY_KEYWORD_COUNT_VIEW = '_design/general_views/_view/greedy_keyword_view?group_level=1'
const  TOTAL_TWEETS_COUNT_VIEW = '_design/city_views/_view/tweet_by_city?group_level=1'

const cities = ["Melbourne","Sydney","Brisbane","Adelaide","Bob"]
const years = ["2012","2013","2014","2015","2016","2017","2018","2019"]

var greedByCity = function(req,res){
  couchAuth.get(COUCH_DB_NAME, AVERAGE_GREED_BY_CITY_VIEW).then(({data, headers, status}) => {
      var all_cities = {}
      var rows = data.rows
      rows.forEach(function(item){
        if(cities.includes(item.key)){
            all_cities[item.key] = item.value.average
        }
      })
      res.status(200).json(all_cities);
  }, err => {
      console.log(err)
      standardErrors.badRequestRes()
  });
}

var greedByYear = function(req,res){
  couchAuth.get(COUCH_DB_NAME, AVERAGE_GREED_BY_YEAR_VIEW).then(({data, headers, status}) => {
      var all_years = {}
      var rows = data.rows
      rows.forEach(function(item){
          all_years[item.key] = item.value.average
      })
      res.status(200).json(all_years);
  }, err => {
      console.log(err)
      standardErrors.badRequestRes()
  });
}


var greedYearlyMonthlyByCity = function(req,res){
  couchAuth.get(COUCH_DB_NAME, AVERAGE_GREED_BY_CITY_MONTHS_YEARS_VIEW).then(({data, headers, status}) => {
      var all_city_years_dates = {};

      var rows = data.rows
      rows.forEach(function(row){
          var date = new Date(row.key[1])
          var greed_score = row.value.average
          var year = date.getYear() + 1900
          var city = row.key[0]
          if(!all_city_years_dates[city]){
              all_city_years_dates[city] = {}
          }

          if(!all_city_years_dates[city][year]){
            all_city_years_dates[city][year] = {}
          }

          if(!all_city_years_dates[city][year]){
            all_city_years_dates[city][year] = {}
          }
          all_city_years_dates[city][year][date] = greed_score
      })

      res.status(200).json(all_city_years_dates);
  }, err => {
      console.log(err)
      standardErrors.badRequestRes()
  });


}


var greedyKeywordsCountData = function(req,res){
  couchAuth.get(COUCH_DB_NAME, GREEDY_KEYWORD_COUNT_VIEW).then(({data, headers, status}) => {
      var all_keywords = {}
      var rows = data.rows
      rows.forEach(function(row){
          all_keywords[row.key] = row.value.count
      })
      res.status(200).json(all_keywords);
  }, err => {
      console.log(err)
      standardErrors.badRequestRes()
  });

}


var tweetByCityData = function(req,res){
  couchAuth.get(COUCH_DB_NAME, TOTAL_TWEETS_COUNT_VIEW).then(({data, headers, status}) => {
      var all_counts = {}
      var total_count = 0
      var rows = data.rows
      rows.forEach(function(row){
          all_counts[row.key] = row.value.count
          total_count += row.value.count
      })
      all_counts["total_tweets"] = total_count
      res.status(200).json(all_counts);
  }, err => {
      console.log(err)
      standardErrors.badRequestRes()
  });
}



var aurinGamblingData = function(req,res){
  res.status(200).json(aurinData.gambling_expenditure);
}



module.exports.tweetByCityData = tweetByCityData;
module.exports.greedyKeywordsCountData = greedyKeywordsCountData;
module.exports.greedYearlyMonthlyByCity = greedYearlyMonthlyByCity;
module.exports.greedByCity = greedByCity;
module.exports.greedByYear = greedByYear;
module.exports.aurinGamblingData = aurinGamblingData;
