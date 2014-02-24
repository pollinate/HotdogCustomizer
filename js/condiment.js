(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotdogApp.directives')
	.directive('condiment', ['$http', function($http){
		return {
			restrict: 'A',

			scope: {
				condimentData: '='
			},

			link: function(scope, elem){

				$http.get('assets/condiments.svg').success(function(data){
					var parser = new DOMParser();
					var svgElem = parser.parseFromString(data, 'image/svg+xml');
					var paths = $(svgElem).find('path');
					elem.append(paths.eq(Math.round(Math.random()*(paths.length-1))));
				});

				scope.$watch('condimentData', function(newVal){
					if(newVal === undefined){return;}
					updateCondiment();
				}, true);

				function updateCondiment(){
					elem.find('path').attr({
						x: Math.round(Math.random()*20-10),
						y: Math.round(Math.random()*20-10),
						stroke: function(){
							if(scope.condimentData.type && scope.condimentData.type.color){
								return scope.condimentData.type.color;
							}
							return 'rgba(255,255,255,0.25)';
						},
						'stroke-linecap': 'round',
						'stroke-width': scope.condimentData.amount || 1
					});
				}
			}

		};
	}]);

})();