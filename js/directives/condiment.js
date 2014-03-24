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

				scope.$emit('rendering', {name: 'condiment', id: scope.$id});

				$http.get('assets/condiments.svg').success(function(data){
					var parser = new DOMParser();
					var svgElem = parser.parseFromString(data, 'image/svg+xml');

					//IE uses an ActiveX method for DOM Parsing - left as an exercise for the coder.

					var paths = $(svgElem).find('path');
					elem.append(paths.eq(Math.round(Math.random()*(paths.length-1))));

					scope.$watch('condimentData', function(newVal){
						if(newVal === undefined){return;}
						scope.$emit('rendering', {name: 'condiment', id: scope.$id});
						updateCondiment();
					}, true);

					function updateCondiment(){
						elem.find('path').attr({
							x: scope.width/20,
							y: scope.height/5,
							stroke: function(){
								if(scope.condimentData.type && scope.condimentData.type.color){
									return scope.condimentData.type.color;
								}
								return 'rgba(255,255,255,0.25)';
							},
							'stroke-linecap': 'round',
							'stroke-width': scope.condimentData.amount || 1
						});
						scope.$emit('complete', {name: 'condiment', id: scope.$id});
					}
				});

				scope.$on('$destroy', function () {
					scope.$emit('destroyed', {name: 'condiment', id: scope.$id});
				});
			}

		};
	}]);

})();