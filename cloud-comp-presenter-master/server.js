
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
var routes = require('./server/routes/routes.js');
var cors = require('cors')

dotenv.config(); //Configuring engironment
const port = process.env.PORT; //Setting port

const server = express(); //Creating express server
server.use(cors({credentials: true, origin: true}))

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Directing incoming api requests to separate routes
server.use('/api',routes);

// Start the server
server.listen(port, function(req,res) {
	console.log("listening on port:"+port);
});

