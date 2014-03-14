(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers')
	.controller('BodyController', ['$scope', '$route', 'slideService',
	function($scope, $route, slideService){
		$scope.locations = [
			{
				name: 'Home',
				path: ''
			},
			{
				name: 'Demo',
				path: 'dog'
			}
		];

		slideService.forEach(function(slide, index){
			$scope.locations.push({name: slide.title, path: 'slides/' + (Number(index)+1)});
		});

	}]);
})();