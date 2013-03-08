'use strict';

// App & load ui module
var songese = angular.module('songese', ['songese.directives', 'ngSanitize']);

// Declare app level module which depends on filters, and services
songese.
  config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/',       { templateUrl: 'partials/composition.html', controller: CompositionCtrl});
    $routeProvider.when('/lyrics', { templateUrl: 'partials/lyrics.html',      controller: LyricsCtrl});
    $routeProvider.when('/chords', { templateUrl: 'partials/chords.html',      controller: ChordsCtrl});
    $routeProvider.when('/ideas',  { templateUrl: 'partials/ideas.html',       controller: IdeasCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);