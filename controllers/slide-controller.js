(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers')
	.controller('SlideController', ['$scope', '$route', '$routeParams', 'slideService',
	function($scope, $route, $routeParams, slideService){
		$scope.number = $routeParams.slideId;

		$scope.slide = slideService[$routeParams.slideId-1];

	}]);
})();