var Twit = require('twit');
process.env.UV_THREADPOOL_SIZE = 500;
var database_writer = require('../Database/database_writer.js');
//npm install natural
var natural = require('natural');
//var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
//var analyzer = new Analyzer("English", stemmer, "afinn");
var helper_variables = require('./helper_variables.js');
var cities = helper_variables.citiesStream;
var scores = helper_variables.scores;
var userTimeline = require('./twitter_user_timeline');
var follower_friend = require('./follower_friend');
const args = process.argv;
const CITY = args[2]
var T = new Twit(helper_variables.city_apis[CITY]);
//var keywords = ['I want more money','I need more money','I want money','I need money','I want more','I need more','I want it now','I need it now','I want','I need','I don\'t care','not my responsibil', 'I\'m not responsible', 'not a big deal','not my problem','as long as','for me', 'money','dollar','gambling','casino','cash'];
var tweet_queue = []
var cooldown = false;
var needCoolDown = {
    'result': false
}
var dbConnect = require('../Database/connect.js');


var startStream = function(cityName) {
    console.log(helper_variables.city_apis[CITY])
    var city = cities[cityName];
    streamTweet(city, cityName);
}

var streamTweet = function(city_geo, city_name) {
    var stream = T.stream('statuses/filter', { locations: city_geo });

    stream.on('connected', function (response) {
      console.log('CONNECTED!');
    })


    stream.on('tweet', function (tweet) {
      tweet_queue.push(tweet)
      checkCoolDown()
      processTweet(city_name)
    })

};

async function checkCoolDown(){
    if(needCoolDown['result'] == true){
        console.log("Sleeping!")
        needCoolDown['result'] = false
        cooldown = true
        await sleep(900000)
        console.log("Restarting")
        process.exit(1);
        //cooldown = false;
        //console.log("Awake!")
    }
}


var sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var processTweet =  function(city_name){
    if(tweet_queue.length > 0 && !cooldown){
      var tweet = tweet_queue.shift();
      var tweet_text = '';
      if (tweet.truncated == true) {
         tweet_text = tweet.extended_tweet.full_text;
      } else {
          tweet_text = tweet.text;
      }

      console.log(tweet_text);
      console.log('user_id:' + tweet.user.id_str);
      console.log('===========================');
      userTimeline.getUserTimeline(tweet.user.id_str, 200, false, lastTweetId='', city=city_name,needCoolDown);

      // then get this user's friends/followers
      // and call getUserTimeline for each of them
      follower_friend.getFriends(tweet.user.id_str, 300, 'followers', city_name,needCoolDown)

    }
}



//run the streamer
startStream(CITY);
//setInterval(startStream, 900000, CITY)
