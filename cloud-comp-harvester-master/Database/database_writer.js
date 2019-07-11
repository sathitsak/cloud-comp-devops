var dbConnect = require('./connect.js');
var couchAuth = dbConnect.couchAuth;
var COUCH_DB_NAME = dbConnect.couchDbName;

var insert_document = function(document,failed){
  couchAuth.insert(COUCH_DB_NAME, document).then(({data, headers, status,failed,couchAuth} ) => {
      console.log(data)
  }, err => {
      failed["result"] = true;
      if(err.code = 'ESOCKETTIMEDOUT'){
        console.log("ESCOKETTIMEDOUT: reconnecting database!")
        couchAuth = dbConnect.connectDB()
      }else if(err.code = 'ETIMEDOUT'){
        console.log("ETIMEDOUT: need to restart the harvester!")
        process.exit(1);
      }
  });
}


module.exports.insert_document = insert_document;
