var Twit = require('twit');
var config = require('../config.js');
var userTimeline = require('./twitter_user_timeline')
var helper_variables = require('./helper_variables.js');


var getFriends = function(userId, count, type, city,needCoolDown) {

    var params = {
        user_id: userId,
        stringify_ids: true,
        count: count
    }

    friendsRequest(params, [], type, city,needCoolDown)
}


// get a list of user IDs the specified user is following (friends)
var friendsRequest = function(params, friendsList, type, city,needCoolDown) {

    var T = new Twit(helper_variables.city_apis[city]);

    T.get(type+'/ids', params).then(({ data, response,needCoolDown}) => {

        friendsList.push(data.ids);

        console.log("fetching friends of user")
        console.log("found: " +  friendsList[0].length + " friends")
        //slice the friendList(list of different pages of friend) into chunks with 100 elements each (to use in users/lookup count)
        var chunk = 100;
        for (var i = 0; i < friendsList.length; i++) {
            var temp = [];
            for (var j = 0; j < friendsList[i].length; j += chunk) {
                temp = friendsList[i].slice(j, j+chunk)
                    getUsersObject(temp, city,needCoolDown);
            }
        }

    }, err => {
      if(needCoolDown){
          needCoolDown['result'] = true
      }
    })


}



var getUsersObject = function(userList, city,needCoolDown) {

    var params = {
        user_id: userList
    }
    var T = new Twit(helper_variables.city_apis[city]);

    T.get('users/lookup', params).then(({data, response,needCoolDown}) =>{
        //console.log("looking up a chunk of users, size: " + data.length)

            // now for each user object, check their location
            // if they are in melbourne etc
            // get their timeline
            for (var i = 0; i < data.length; i++) {
                if (data[i].location !== null && data[i].protected == false) {
                    if (data[i].location.includes(city) == true) {
                        //console.log("getting timeline of user")
                        userTimeline.getUserTimeline(data[i].id_str, 200, false, lastTweetId='', city=city,needCoolDown);
                        coolDownRequests(1000)

                    }
                }
            }
    }, err => {
        if(needCoolDown){
            needCoolDown['result'] = true
        }

    })
}

var sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function coolDownRequests(ms){
        await sleep(ms)
}


module.exports.getFriends = getFriends;
module.exports.getUsersObject = getUsersObject;
