const args = process.argv;
const CITY = args[2]

var interval = setInterval(function(){
  console.log(CITY)
}, 2000);
setTimeout(function() {
  clearInterval(interval);
}, 10000);
