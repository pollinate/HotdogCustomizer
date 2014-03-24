(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers')
	.controller('DogController', ['$scope', 'hotDogService',
	function($scope, hotDogService){

		$scope.hotDog = hotDogService;

		$scope.condimentTypes = [
			{name: 'ketchup', color: 'red'},
			{name: 'mustard', color: 'yellow'},
			{name: 'mayonnaise', color: '#ffeecc'},
			{name: 'purple ketchup', color: '#993388'},
			{name: 'relish', color: '#33cc66'}
		];

		$scope.backgroundImages = [
			'assets/coney-island.jpg',
			'assets/ground-zero-pentagon.jpg',
			'assets/Swords_of_qadisiyah.jpg'
		];

		$scope.addCondiment = function(){
			var randomCondiment = $scope.condimentTypes[Math.round(Math.random($scope.condimentTypes.length-1))];
			$scope.hotDog.condiments.push({amount: 20, type: randomCondiment});
		};

		$scope.removeCondiment = function(index){
			$scope.hotDog.condiments.splice(index, 1);
		};

	}]);
})();