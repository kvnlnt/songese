'use strict';

function CompositionCtrl($scope, $http) {

	// Last key pressed
    $scope.key   = null; // last key pressed
    $scope.node  = null; // last cursor node
    $scope.ichar = null; // last cursor char
    $scope.song  = null; // song

	// Get song
    $http({  
    	method: 'GET', 
    	url: 'songs/billiejean.json', 
    	transformResponse: function(data) { 
    		$scope.song = JSON.parse(data);
    		$("#composition").html(colorize($scope.song.composition));
    	}, 
    	cache: false
    }).
    success(function(data, status) {}).
    error(function(data, status) {});

} // CompositionCtrl

CompositionCtrl.$inject = ['$scope','$http'];

function LyricsCtrl() {}
LyricsCtrl.$inject = [];

function ChordsCtrl() {}
ChordsCtrl.$inject = [];

function IdeasCtrl() {}
IdeasCtrl.$inject = [];