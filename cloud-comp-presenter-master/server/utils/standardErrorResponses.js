const DB_ERR = "Database error.";
const INVALID_REQUEST = "Bad Request";

var badRequestRes = function(res) {
  res.status(400).json({ error: INVALID_REQUEST });
};

var dbErrorRes = function(res) {
  res.status(500).json({ error: DB_ERR });
};

var successNoData = function(res) {
  res.sendStatus(200);
};


module.exports.badRequestRes = badRequestRes;
module.exports.dbErrorRes = dbErrorRes;
module.exports.successNoData = successNoData;
