## Harvester Component Usage

``` bash

# Install dependencies for harvester 
npm install

# Update the .env file
specify which Host and Port you would like to use.


# Run the harvester and specify your city to harvest
(Note: Before you do this, we probably have harvesters running as you read this, they are using all the api keys! Ask Marko what's up)
node Harversters/twitter_streamer.js Melbourne
node Harversters/twitter_streamer.js Sydney
node Harversters/twitter_streamer.js Brisbane
node Harversters/twitter_streamer.js Adelaide


# How to run harvesters on on final deployment:
Make sure that you this command on each server that you to deploy: 
npm install pm2 -g

Run the following command to run the harvester on a given city:
pm2 start Harversters/twitter_streamer.js --watch --name "Brisbane" -- "Brisbane"
pm2 start Harversters/twitter_streamer.js --watch --name "Sydney" -- "Sydney"
pm2 start Harversters/twitter_streamer.js --watch --name "Adelaide" -- "Adelaide"
pm2 start Harversters/twitter_streamer.js --watch --name "Melbourne" -- "Melbourne"

Confirm that its working by running the following commands manually on the server:
pm2 list
pm2 logs

```
