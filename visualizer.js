(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotdogApp.directives')
	.directive('visualizer', [ function(){
		return {
			restrict: 'A',

			scope: {
				hotDogData: '='
			},

			templateUrl: 'vizbase.html',

			link: function(scope){

				scope.$watch('hotDogData', function(newVal){
					if(newVal === undefined){return;}
				}, true);

			}

		};
	}]);

})();