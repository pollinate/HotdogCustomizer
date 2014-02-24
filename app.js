(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotdogApp.controllers', []);
	angular.module('hotdogApp.directives', []);

	angular.module('hotdogApp', [
		'hotdogApp.controllers',
		'hotdogApp.directives',
		'hotDogService'
	]);

	angular.module('hotdogApp.controllers')
	.controller('AppControls', ['$scope', 'hotDogService',
	function($scope, hotDogService){

		$scope.hotDog = hotDogService;

	}]);

})();