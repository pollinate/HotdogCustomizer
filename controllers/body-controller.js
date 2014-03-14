(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers')
	.controller('BodyController', ['$scope', '$route',
	function($scope, $route){
		$scope.locations = [
			{
				name: 'Home',
				path: ''
			},
			{
				name: 'Dog Customizer',
				path: 'dog'
			},
			{
				name: 'Slide 1',
				path: 'slides/1'
			},
			{
				name: 'Slide 2',
				path: 'slides/2'
			}
		];

	}]);
})();