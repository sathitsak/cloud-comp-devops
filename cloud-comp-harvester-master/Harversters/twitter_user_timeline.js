var Twit = require('twit');
var config = require('../config.js');
var database_writer = require('../Database/database_writer.js');

// natural package
var natural = require('natural');
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
var tokenizer = new natural.WordTokenizer();
var nGrams = natural.NGrams;

//helper var for scores and cities coordinates
var helper_variables = require('./helper_variables.js')
var cities = helper_variables.cities
var scores = helper_variables.scores;

var bigInt = require("big-integer");
var failed = {
    'result': false
};


//var keywords = ['I want more money','I need more money','I want money','I need money','I want more','I need more','I want it now','I need it now','I want','I need','I don\'t care','not my responsibil', 'I\'m not responsible', 'not a big deal','not my problem','as long as','for me', 'money','dollar','gambling','casino','cash', 'deserve', 'mine'];
//check keywords
var isContain = function(text, scores) {
  for (var key in scores) {
    if (text.toLowerCase().includes(key.toLowerCase())) {
      return true;
    }
  }
  return false;
}




var getUserTimeline = function(userId, nTweets, nextPage, lastTweetId='', city,needCoolDown) {

    var T = new Twit(helper_variables.city_apis[city]);

    var params = {
            user_id: userId,
            count: nTweets,
            exclude_replies: true,
            include_rts: 1,
            tweet_mode: 'extended'
    }

    T.get('statuses/user_timeline', params).then(({data, response,needCoolDown}) => {

        var count = 0
        for (var i = 0; i < data.length; i++) {
            if(failed['result'] == true){
                break;
            }
            // write to the database
            var tweet_text = getText(data[i]);
            var tweetYear = data[i].created_at.slice(-4);    // used to filter year further than YYYY in the last request
            if (tweetYear >= 2018) {   // check isContain(tweet_text, scores) as well if needed
                count++;
                var countMap = computeCountMap(data[i]);
                var greed_map = {};
                // only add word with count to the database
                if (isContain(tweet_text, scores) == true) {
                    for (var key in countMap) {
                        if (countMap[key] !== 0) {
                            greed_map[key] = countMap[key];
                        }
                    }
                }
                var greed_score = getGreed(greed_map);

                //create a doc for this tweet
                var document = {_id:data[i].id_str, date: data[i].created_at, text: tweet_text, city: city, greed_map: greed_map, greed_score: greed_score};
                database_writer.insert_document(document, failed);
                //cool down speed of requests
                coolDownRequests(300)

            } else {
                console.log("Finished looking at timeline, found " + count + " tweets")
                break;
            }
        }


    }, err => {
        if(needCoolDown){
            needCoolDown['result'] = true
        }
    });
};

var sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function coolDownRequests(ms){
        await sleep(ms)
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


    var tweet_text = getText(tweet);

    var tokenizedText = tokenizer.tokenize(tweet_text);

    //ngrams to count for "I need", "not my respons"
    var bigramsText = nGrams.bigrams(tweet_text);   // bigrams is a list of 2 consecutive words (eg. ["I", "am"])
    var trigramsText = nGrams.trigrams(tweet_text);
    var quadgramsText = nGrams.ngrams(tweet_text, 4);

    // 1 word count
    for (var j=0;j<tokenizedText.length;j++) {
        for (key in countMap) {
          if (stemmer.stem(tokenizedText[j]) === stemmer.stem(key)) {
            countMap[key] += 1;
          }
        }
      }

    // phrase count
    countWords(bigramsText, countMap);
    countWords(trigramsText, countMap);
    countWords(quadgramsText, countMap);


    return countMap
}


var countWords = function(text, countMap) {
    for (var j=0;j<text.length;j++) {
      for (key in countMap) {
        if (stemmer.stem(text[j].join(" ")) === stemmer.stem(key)) {
          countMap[key] += 1;
        }
      }
    }
  }




// calculate the greed_score
var getGreed = function(countMap) {
    var greed_score = 0;
    for (key in countMap) {
        greed_score += countMap[key] * scores[key];
    }
    return greed_score;
}


// get the full text of a tweet
var getText = function(tweet) {
    var tweet_text = tweet.full_text;
    return tweet_text;
}



//getUserTimeline('774798827614195713', 200, false, lastTweetId='', city="Melbourne");
module.exports.getUserTimeline = getUserTimeline;
module.exports.getText = getText;
module.exports.getGreed = getGreed;
module.exports.countWords = countWords;
module.exports.isContain = isContain;
