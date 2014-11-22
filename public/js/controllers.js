
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

	socket.on('trainData', function(data) {
		console.log("Geo JSON Train data got from Node server");
		$scope.dataObj = data;		
	});  //@ END
});