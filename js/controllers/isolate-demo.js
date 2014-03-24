(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers')
	.controller('IsolateDemo', ['$scope', 'hotDogService',
	function($scope, hotDogService){

		$scope.hotDog = hotDogService;

		$scope.firstHotDog = {'width':300,'height':300,'backdrop':'assets/ground-zero-pentagon.jpg','bun':{'base':'assets/empty-hot-dog-bun.png','top':'assets/bun-top.png'},'dog':{'raw':'assets/frank.png','burned':'assets/burned.png','percent':'0.1'},'condiments':[]};
		$scope.secondHotDog = {'width':300,'height':300,'backdrop':'assets/Swords_of_qadisiyah.jpg','bun':{'base':'assets/empty-hot-dog-bun.png','top':'assets/bun-top.png'},'dog':{'raw':'assets/frank.png','burned':'assets/burned.png','percent':'1'},'condiments':[]};

	}]);
})();