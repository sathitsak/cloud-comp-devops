var config = require('../config.js');

//Weightings for tokens that represent "Greed"
var scores = {
  "I want": 3*20,
  "I need": 2.7*20,
  "want": 1*20,
  "need": 0.7*20,
  "I don't care": 3.5*20,
  "mine": 1.5*20,
  "money": 3.7*20,
  "cash": 3.2*20,
  "gambling": 4*20,
  "casino": 4.5*20,
  "do it for me": 2.5*20,
  "not my problem": 2.8*20,
  "not a big deal": 2*20,
  "not my responsibility": 3*20,
  "I\'m not responsible": 2.7*20,
  "as long as": 2*20,
  "entitled": 1*20,
  "more": 0.4*20,
  "self interested": 1.7*20,
  "I am selfish": 2.3*20,
  "deserving": 1.8*20,
  "lotto": 2.2*20,
  "bankroll": 2*20,
  "pokies": 2*20,
  "slot machine": 2.9*20,
  "blackjack": 1.5*20,
  "baccarat": 1*20,
  "slots": 1*20,
  "betting": 2*20,
  "spend": 0.8*20,
  "diamond": 1.6*20,
  "gold": 1.5*20,
  "buy": 0.4*20,
  "get": 0.4*20,
  "bank": 1*20,
  "coin": 0.4*20,
  "rack": 0.8*20,
  "dollar": 1*20,
  "rich": 1.3*20,
  "take": 0.5*20,
  "now": 0.2*20,
  "demand": 1.4*20,
  "expect": 1.3*20,
  "benefit": 1.2*20,
  "claim": 1*20,
  "wanna": 2.2*20,
  "finna": 2.7*20,
  "got": 1.3*20,
  "bust out": 3*20,
  "catch": 2.1*20,
  "steal": 4*20,
  "rob": 4*20,
  "nab": 4*20,
  "snatch": 3.8*20,
  "immediately": 1.3*20,
  "desire": 1.5*20,
  "possess": 1.8*20,
  "cheat": 2.6*20,
  "fraud": 2.8*20,
  "jewellary": 1.9*20
}

var city_apis = {
  "Melbourne" :config.MelbourneKeys,
  "Sydney" :config.SydneyKeys,
  "Adelaide" :config.AdelaideKeys,
  "Brisbane" :config.BrisbaneKeys,
  "Melbourne1": config.trung2
}


// bounding_box has to be less than 40x40km rectangle
// So, we may have to divide a city into multiple boxes like in assignment 1
// and then search for every boxes to get all tweets in that city
// long-lat, gonna be a list of strings,
// each string represents one 40x40km box area of melbourne
var cities = {
                "Melbourne" : ['[144.833450 -37.856423 145.048370 -37.737598]'],
                "Sydney" : ['[151.159859 -33.928263 151.283798 -33.850316]'],
                "Canberra" : ['[149.081726 -35.323249 149.162579 -35.244357]'],
                "Adelaide" : ['[138.494682 -34.987253 138.706512 -34.812958]'],
                "Brisbane" : ['[152.977753 -27.507053 153.100491 -27.419167]'],
                "Perth" : ['[115.754013 -32.017683 116.012192 -31.864146]']
             }


var citiesStream = {
                "Melbourne" : ['144.352112,-38.216604,145.697937,-37.524975'],
                "Sydney" : ['150.776367,-33.996319,151.322250,-33.679783'],
                "Adelaide" : ['138.459320,-35.185033,138.749084,-34.663711'],
                "Brisbane" : ['152.775879,-27.710279,153.293610,-27.252188'],
                "World" : ['-180,-90,180,90'],
                "Melbourne1": ['144.352112,-38.216604,145.697937,-37.524975']
}


var citiesRadius = {
                "Melbourne" : [''],
                "Sydney" : [''],
                "Adelaide" : [''],
                "Brisbane" : [''],
}


module.exports.city_apis = city_apis
module.exports.scores = scores
module.exports.cities = cities
module.exports.citiesStream = citiesStream
