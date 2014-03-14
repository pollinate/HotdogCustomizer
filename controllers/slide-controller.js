(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers')
	.controller('SlideController', ['$scope', '$route', '$routeParams',
	function($scope, $route, $routeParams){
		$scope.number = $routeParams.slideId;
		$scope.slide = [
			{
				text:'lorem ipsum sit dolor amet',
				code:'$scope.number = $routeParams.slideId;'
			},
			{
				text:'but you don\'t have to take my word for it',
				image: 'http://placecage.com/c/400/400',
				code:'$scope.number = 4;'
			}
		];

	}]);
})();