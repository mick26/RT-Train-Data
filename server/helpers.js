/* ========================================================== 



============================================================ */

'use strict';

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var request = require('request');	//for http requests to get xml
var xml2js = require('xml2js');		//convert xml
//var util = require('util');		// 
var xmlParser = new xml2js.Parser();//xml to js converter
//var _ = require('underscore');      //just for size method

/* ========================================================== 
Variables
============================================================ */
var completeResponse = "";
var trainDataObj = {};
var numTrains = 0;
var trainDataAy = [];

// var trainObj = {
// 	TrainStatus:"", 
// 	TrainLatitude:"", 
// 	TrainLongitude:"", 
// 	TrainCode:"", 
// 	TrainDate:"", 
// 	PublicMessage:"" 
// };


module.exports = {

	/**
	 * Get XML train data
	 */
	getTrainXmlData : function() {

		var xmlData = {};

		request('http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML', function (error, response, body) {
			//				
			//	console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
		    //	console.log('the decoded data is: ' + body);

			// if (!error && response.statusCode == 200) {
			// 	console.log(body)
			// }
		})


		/**
		 * Error
		 */
		.on('error', function (e) {
		    console.log('problem with request: ' + e.message);
		})

		/**
		 * A response is received
		 */
		.on('response', function(response) {
		})

		/**
		 * Response: Add another 'chunk' of data
		 */
		.on('data', function(chunk) {
			//compressed data as it is received
			//console.log('received ' + chunk.length + ' bytes of compressed data')
			completeResponse += chunk;
		})

		/**
		 * Response: All the data is got
		 */
		.on('end', function() {
			xmlData = completeResponse;
		})

		return xmlData; //return the XML data
	},



	/**
	 * Convert XML data to array of JS Objects
	 */
	parseXml : function (xml) {

		var trainAy = [];

		xmlParser.parseString(completeResponse, function(err, result) {

			var trainObj = {};

			/*
			 * Return a string representation of JS object
			 * Lets you view JS Object
			 */
			//console.log(util.inspect(result, false, null));

			if(err)
				console.log("Error parsingString " +err);

			if(result) {
				console.log("Success with parseString ");




				numTrains = result.ArrayOfObjTrainPositions.objTrainPositions.length;
				console.log("NumOfTrains=" +numTrains); //TEST


				/**
				 * Loop through array of JS Objects
				 * populate trainObj for each train and add to array
				 */
				for(var i=0; i<result.ArrayOfObjTrainPositions.objTrainPositions.length; i++) {

					/*
					 * Note the use of the condition operator: test ? expression1 : expression2
					 * Take care of case when trains are stopped/dropped e.g. at night 
					 */				
					trainObj['TrainStatus'] = (result.ArrayOfObjTrainPositions.objTrainPositions[i]) ? 
						result.ArrayOfObjTrainPositions.objTrainPositions[i].TrainStatus : "undefined";
					trainObj['TrainLatitude'] = (result.ArrayOfObjTrainPositions.objTrainPositions[i]) ?
						result.ArrayOfObjTrainPositions.objTrainPositions[i].TrainLatitude : "undefined";
					trainObj['TrainLongitude'] = (result.ArrayOfObjTrainPositions.objTrainPositions[i]) ?
						result.ArrayOfObjTrainPositions.objTrainPositions[i].TrainLongitude : "undefined";
					trainObj['TrainCode'] = (result.ArrayOfObjTrainPositions.objTrainPositions[i]) ?
						result.ArrayOfObjTrainPositions.objTrainPositions[i].TrainCode : "undefined";
					trainObj['TrainDate'] = (result.ArrayOfObjTrainPositions.objTrainPositions[i]) ?
						result.ArrayOfObjTrainPositions.objTrainPositions[i].TrainDate : "undefined";
					trainObj['PublicMessage'] = (result.ArrayOfObjTrainPositions.objTrainPositions[i]) ?
						result.ArrayOfObjTrainPositions.objTrainPositions[i].PublicMessage : "undefined";

					trainAy.push(trainObj);	//Add JS Object to Array

					trainObj = {};	//Clear Object			
				}
			}
		})	
		return trainAy; //return array of JS Objects
	}

}; // @END / module.exports

