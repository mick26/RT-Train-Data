
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
	$scope.dataAy = [];

	socket.on('trainData', function(data) {
		$scope.dataObj = data;
		$scope.dataAy.push(data);
		

		console.log(data.TrainStatus);
		console.log(data.TrainLatitude);
		console.log(data.TrainLongitude);
		console.log(data.TrainCode);
		console.log(data.TrainDate);
		console.log(data.PublicMessage);
		
	});  //@ END
});