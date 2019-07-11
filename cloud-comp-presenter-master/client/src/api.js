/*The following functions are defined to make use of api end points easy.
  Each function is associated with one api endpoint.
  To handle an api request select a function and pass in a successCallback,
  errorCallback and a payload that is defined from wherever you are */
import axios from 'axios'
var apiBaseUrl = "http://localhost:5000"
const ALL_DOCS_ENDPOINT = "/api/tweet_data/all_docs"
const greedByCityEndpoint =  '/api/tweet_data/greed_by_city'
const gamblineEndpoint = '/api/aurin_gambling_data'
const greedyEndPoint ='/api/tweet_data/greedy_keywords_count'
const greedCityYearsMonthsEndPoint = '/api/tweet_data/greed_city_years_months'
const tweetByCityEndPoint = '/api/tweet_data/tweets_by_city'
export const allDocsGET = (successCallback,errorCallback, payload) => {
  const promise = axios.get(apiBaseUrl + ALL_DOCS_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}
export const greedByCity = (successCallback,errorCallback) => {
  const promise = axios.get(apiBaseUrl + greedByCityEndpoint);
  promise.then(successCallback).catch(errorCallback);
}

export const gambling = (successCallback,errorCallback) => {
  const promise = axios.get(apiBaseUrl + gamblineEndpoint);
  promise.then(successCallback).catch(errorCallback);
}

export const greedy = (successCallback,errorCallback) => {
  const promise = axios.get(apiBaseUrl + greedyEndPoint);
  promise.then(successCallback).catch(errorCallback);
}

export const greedCityYearsMonths = (successCallback,errorCallback) => {
  const promise = axios.get(apiBaseUrl + greedCityYearsMonthsEndPoint);
  promise.then(successCallback).catch(errorCallback);
}
export const tweetByCity = (successCallback,errorCallback) => {
  const promise = axios.get(apiBaseUrl + tweetByCityEndPoint);
  promise.then(successCallback).catch(errorCallback);
}