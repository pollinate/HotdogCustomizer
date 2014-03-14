(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers', []);
	angular.module('hotdogApp.directives', []);

	angular.module('hotdogApp', [
		'hotdogApp.controllers',
		'hotdogApp.directives',
		'hotDogService',
		'ngRoute'
	],
	function($routeProvider, $locationProvider){

		$routeProvider.when('/', {
			templateUrl: 'partials/title.html'
		})

		.when('/dog', {
			templateUrl: 'partials/dogCustomizer.html',
			controller: 'DogController'
		})

		.when('/slides/:slideId', {
			templateUrl: '/partials/slideTemplate.html',
			controller: 'SlideController'
		});

		$locationProvider.html5Mode(true);
	});

})();