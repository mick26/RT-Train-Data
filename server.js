/*=========================================================
Michael Cullen
server.js
2014

Working - (Tá se ag obair)

Ref.
https://github.com/request/request
http://nodejs.org/api/util.html
============================================================*/

'use strict';

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var http = require('http');
var express = require('express');
var app = express(); 				//Create a new application with Express
var httpServ = http.Server(app);
var io = require('socket.io')(httpServ);
var colours = require('colors');
var logger = require('morgan');
var errorHandler = require('errorhandler');

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var helpers = require('./server/helpers.js');


/* ========================================================== 
Variables
I was going to use a const for POLL_INTERVAL but it 
generates an error with 'use strict'
============================================================ */
var numberOfTrains = 0;
var POLL_INTERVAL = 20000; //20 seconds

/* ========================================================== 
Port the server will listen on
============================================================ */
app.set('port', process.env.PORT || 3000);

/* ==========================================================
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public'));


//development only
if (app.get('env') === 'development') {
    app.use(errorHandler());
    app.use(logger('dev')); //log every request to the console in dev
};

//production only
if (app.get('env') === 'production') {
};



/* ==========================================================
Periodically 
- get Train data in XML format via Irish Rail API
- convert XML data to Javascript Objects
- Send each trains info to client in seperate Socket.io packets
============================================================ */
setInterval(function() {

	/**
	 * Get Train XML data
	 */
	var xml = helpers.getTrainXmlData()
	

	if(xml) {
		
		/**
	 	 * Parse the XML data into an Array of Javascript Objects
	 	 */		
		var trainDataAy = helpers.parseXml();

		if(trainDataAy) {

			numberOfTrains = trainDataAy.length;
			console.log("XML has been parsed");

			//Loop through the array
			for(var i=0; i<numberOfTrains; i++) {
				var txData = trainDataAy[i];

				/**
				 * Send each Object in a separate Socket.io packet
				 * Socket.io serialises data to JSON automatically
				 */
				io.sockets.emit('trainData', txData)
			}
		}
	}
}, POLL_INTERVAL);



/* ========================================================== 
Start server listening on a port
============================================================ */
httpServ.listen(app.get('port'), function(req, res) {
    console.log('Express server listening on port ' .green + app.get('port') );
});



