/*

Ref.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
https://groups.google.com/forum/#!topic/leaflet-js/zi52_SaCHFM
http://geojson.org/
http://civicdataprod1.cloudapp.net/storage/f/2014-03-21T12%3A29%3A10.664Z/busstops.geojson
https://github.com/codeforamerica/openbus-api
https://www.mapbox.com/mapbox.js/example/v1.0.0/live-data-marker/
http://www.gps.ie/gps-lat-long-finder.htm
http://yasassriratnayake.blogspot.ie/2014/09/developping-web-bases-realtime-updating.html
https://github.com/ycrnet/Real_Time_Updating_Map
http://vimeo.com/106234599
https://github.com/thesteve0/presentations
https://github.com/browniefed/livemet
http://www.dailywireless.org/2013/05/09/real-time-transit-maps/
http://erica.altschul.info/Tutorial_XML-to-Leaflet.pdf
http://jsfiddle.net/abdmob/gtLBx/15/
*/


'use strict';

/*================================================
Module - for Controllers
================================================ */
angular.module('myApp.controllers', [])


/*================================================
Controller
================================================ */
.controller('MainCtrl', function ($scope, $http, socket) {


	/* ================================================
	Declare Variables
	================================================ */
	$scope.dataObj = {};			//JS object


    /*
     *I have set Connolly station as the map center location and then set a zoom value. 
     *Another method would be to set bounds for the map using 
     *map.fitBounds([southWestBound, northEastBound]);
     */
 

    /*
     * Connolly Station the map center point for DART Trains
     */
    var ConnollyLatLng = [53.35245, -6.24727];


    /*
     * Create the map object. Initialize the map and set its view
     */
	var map = L.map('map', {center: ConnollyLatLng, zoom: 10})

    /*
     * Create Realtime Object
     * Note getFeatureId is used to get the specific train index within the features array
     * This will enable to retrieve a specific trains properties
     */
    var realtime = L.realtime({
    	getFeatureId: function(f) { return f.id; },
    	start: false,
        crossOrigin: true,
        type: 'json'
    })


    realtime.addTo(map);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);


    /*
     * Called when update() is called.
     */ 
	realtime.on('update', function(data) {


	    var popupContent = function(fId) {
            var formattedMsg = "";
            var feature = data.features[fId];


            /*
             * Fix format of PublicMessage - remove \n characters from string & replace with newline character
             * using split("\\n") to convert string into an array of substrings
             */
            var message = (feature.properties.PublicMessage).toString().split("\\n");
            var strInMsg = message.length;

            
            //start on index 1 as done need train id again
            for(var i=1; i<message.length; i++) {
                formattedMsg += message[i]  + '<br/>';
            }

            /*
             * Build the Popup content
             */
            return '<h4>' + feature.properties.id + '</h4>' +
                feature.properties.direction + '<br/>' +
                feature.properties.TrainStatus + '<br/>' +
                feature.properties.TrainDate + '<br/>' +
                formattedMsg;
        };


	    var bindFeaturePopup = function(fId) {
            realtime.getLayer(fId).bindPopup(popupContent(fId));
        };

	    var updateFeaturePopup = function(fId) {
            realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
        };


    	Object.keys(data.enter).forEach(bindFeaturePopup);
    	Object.keys(data.update).forEach(updateFeaturePopup);
    });


	/*
	 * Check for 'trainData' socket.io packet from server
	 */
	socket.on('trainData', function(data) {

		realtime.update(data); 
		//realtime.remove(data);				
	
	});  //@ END
});
