var Twit = require('twit')
var config = require('../config.js')
var T = new Twit(config.nghetrung)
var database_writer = require('../Database/database_writer.js');
var natural = require('natural')
var helper_variables = require('./helper_variables.js')
var user_timeline = require('./twitter_user_timeline.js')
var stemmer = natural.PorterStemmer;
var tokenizer = new natural.WordTokenizer();
var nGrams = natural.NGrams;
var cities = helper_variables.cities
var scores = helper_variables.scores;
const args = process.argv;
//var FROM_DATE = args[2]
//var TO_DATE = args[3]
//var CITY = args[4]
var FROM_DATE = '12/04/2019'
var TO_DATE = '10/05/2019'
var CITY = "Melbourne"

var failed = {
  'result': false
};


var collectTweets = function(fromDate, toDate, nTweets, city) {

  var area = cities[city]
  var params = { query:'(#money OR #dollar OR #gambling OR #bet OR #casino OR #cashes) bounding_box:'.concat(area),
                   maxResults: nTweets, fromDate:formatDate(fromDate)+'0000', toDate:formatDate(toDate)+'0000'}

  dataRequest(params,city)

};

//Collect data for provided parameters and recursively retrieve data from all pages
var dataRequest = function(params,city){
  T.get('tweets/search/30day/30dev', params, function(err, data, response) {
      if(err) {
        console.log(err)
      }else {

        var tweet_list = data.results

        for(var i=0;i<tweet_list.length;i++){
            var greed_map = {};
            var countMap = computeCountMap(tweet_list[i]);
            var tweet_text = getFullText(tweet_list[i]);

            // only add word with count to the database
            if (user_timeline.isContain(tweet_text, scores) == true) {
              for (var key in countMap) {
                  if (countMap[key] !== 0) {
                      greed_map[key] = countMap[key];
                  }
              }
            }
            var greed_score = user_timeline.getGreed(greed_map);
            var document = {  _id: tweet_list[i].id_str,
                              date: tweet_list[i].created_at,
                              city: city,
                              text: tweet_text,
                              greed_map: greed_map,
                              greed_score: greed_score   }

            database_writer.insert_document(document, failed)
        }

        if(data.next != null){
            params.next = data.next
            dataRequest(params,city)
        }
      }

  });
}



var computeCountMap = function(tweet){
      var countMap = {
        "I want": 0,
        "I need": 0,
        "want": 0,
        "need": 0,
        "I don't care": 0,
        "mine": 0,
        "money": 0,
        "cash": 0,
        "gambling": 0,
        "casino": 0,
        "do it for me": 0,
        "not my problem": 0,
        "not a big deal": 0,
        "not my responsibility": 0,
        "I\'m not responsible": 0,
        "as long as": 0,
        "entitled": 0,
        "more": 0,
        "self interested": 0,
        "I am selfish": 0,
        "deserving": 0,
        "lotto": 0,
        "bankroll": 0,
        "pokies": 0,
        "slot machine": 0,
        "blackjack": 0,
        "baccarat": 0,
        "slots": 0,
        "betting": 0,
        "spend": 0,
        "diamond": 0,
        "gold": 0,
        "buy": 0,
        "get": 0,
        "bank": 0,
        "coin": 0,
        "rack": 0,
        "dollar": 0,
        "rich": 0,
        "take": 0,
        "now": 0,
        "demand": 0,
        "expect": 0,
        "benefit": 0,
        "claim": 0,
        "wanna": 0,
        "finna": 0,
        "got": 0,
        "bust out": 0,
        "catch": 0,
        "steal": 0,
        "rob": 0,
        "nab": 0,
        "snatch": 0,
        "immediately": 0,
        "desire": 0,
        "possess": 0,
        "cheat": 0,
        "fraud": 0,
        "jewellary": 0
    }

    var tweet_text = getFullText(tweet);

    var tokenizedText = tokenizer.tokenize(tweet_text);

    //ngrams to count for "I need", "not my respons"
    var bigramsText = nGrams.bigrams(tweet_text);   // bigrams is a list of 2 consecutive words (eg. ["I", "am"])
    var trigramsText = nGrams.trigrams(tweet_text);
    var quadgramsText = nGrams.ngrams(tweet_text, 4);

    // get count for "1 word" keyword
    for (var j=0;j<tokenizedText.length;j++) {
      for (key in countMap) {
        if (stemmer.stem(tokenizedText[j]) === stemmer.stem(key)) {
          countMap[key] += 1;
        }
      }
    }

    // get the count for each key phrase (with 2 words) in this tweet
    user_timeline.countWords(bigramsText, countMap);
    user_timeline.countWords(trigramsText, countMap);
    user_timeline.countWords(quadgramsText, countMap);

    return countMap
}



// date format: DD/MM/YYYY (eg. 24/08/2019)
var formatDate = function(date){
  var day = date.substr(0, 2);
  var month = date.substr(3, 2);
  var year = date.substr(6, 4);
  return year+month+day
}

var getFullText = function(tweet) {
  if (tweet.truncated == true) {
    tweet_text = tweet.extended_tweet.full_text;
  } else {
    tweet_text = tweet.text;
  }
  return tweet_text;
}



//run the function
collectTweets(FROM_DATE, TO_DATE, '100',CITY);


module.exports.getFullText = getFullText;
