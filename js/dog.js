(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotdogApp.directives')
	.directive('dog', [ function(){
		return {
			restrict: 'A',

			scope: {
				dogData: '=',
				width: '@',
				height: '@'
			},

			link: function(scope, elem){
				scope.$watch('dogData', function(newVal){
					if(newVal === undefined || !newVal.hasOwnProperty('url')){return;}
					updateUrl(newVal.url);
				});

				scope.$watchCollection('[width, height]', function(newVals){
					if(typeof newVals[0] === 'number' && typeof newVals[1] === 'number'){
						elem.find('image').attr({
							width: newVals[0],
							height: newVals[1]
						});
					}
					
				}, true);

				function updateUrl(path){
					//we make a new element each time to get a new onload we can hook into (they're one-use in Chrome)
					var imgElem = document.createElementNS('http://www.w3.org/2000/svg', 'image');
					var dummyImg = new Image();

					$(imgElem).attr({
						width: scope.width,
						height: scope.height,
						x: 10,
						y: 20
					});

					dummyImg.onload = function(){
						scope.$emit('complete', {name: 'bun', id: scope.$id});
					};

					imgElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);

					dummyImg.src = path;

					elem.empty().append(imgElem);
				}
			}

		};
	}]);

})();