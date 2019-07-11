const NodeCouchDb = require('node-couchdb');
const couchDbName = 'tweet_store'
const dotenv = require('dotenv');
dotenv.config();
const host = process.env.COUD_DB_HOST;
const port = process.env.COUD_DB_PORT;
const username = process.env.COUD_DB_USERNAME;
const password = process.env.COUD_DB_PASSWORD;

const couchAuth = new NodeCouchDb({
  host: host,
  protocol: 'http',
  port: port,
  auth:{
      user:username,
      password:password
  }
})



module.exports.couchAuth = couchAuth
module.exports.couchDbName = couchDbName
