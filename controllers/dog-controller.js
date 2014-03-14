(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotdogApp.controllers')
	.controller('DogController', ['$scope', 'hotDogService',
	function($scope, hotDogService){

		$scope.hotDog = hotDogService;

		$scope.addCondiment = function(){
			$scope.hotDog.condiments.push({
				name: '',
				color: 'yellow',
				amount: 3
			});
		};

		$scope.removeCondiment = function(index){
			$scope.hotDog.condiments.splice(index, 1);
		};

		$scope.condimentTypes = [
			{name: 'ketchup', color: 'red'},
			{name: 'mustard', color: 'yellow'},
			{name: 'mayonnaise', color: '#ffeecc'},
			{name: 'purple ketchup', color: '#993388'},
			{name: 'relish', color: '#33cc66'}
		];

	}]);
})();