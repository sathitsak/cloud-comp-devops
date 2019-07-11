var express = require('express');
var tweetDataExtractor = require('../controllers/tweetDataExtractor.js');
var router = express.Router();

// Test API
router.get('/', function(req, res) {
    res.json({ message: 'Looking good! ;)' });
});


//ROUTES
router.get('/tweet_data/greed_by_city', tweetDataExtractor.greedByCity);
//router.get('/tweet_data/greed_by_year', tweetDataExtractor.greedByYear);
router.get('/tweet_data/greed_city_years_months', tweetDataExtractor.greedYearlyMonthlyByCity);
router.get('/aurin_gambling_data', tweetDataExtractor.aurinGamblingData);
router.get('/tweet_data/greedy_keywords_count', tweetDataExtractor.greedyKeywordsCountData);
router.get('/tweet_data/tweets_by_city', tweetDataExtractor.tweetByCityData);


module.exports = router;
