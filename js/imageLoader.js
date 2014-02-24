(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotdogApp.directives')
	.directive('imageLoader', [ function(){
		return {
			restrict: 'A',

			scope: {
				url: '=',
				width: '@',
				height: '@',
				name: '@'
			},

			link: function(scope, elem){
				scope.$watch('url', function(newVal){
					if(newVal === undefined || !newVal.length){return;}
					updateUrl(newVal);
				});

				function updateUrl(path){
					//we make a new element each time to get a new onload we can hook into (they're one-use in Chrome)
					var imgElem = document.createElementNS('http://www.w3.org/2000/svg', 'image');
					var dummyImg = new Image();

					$(imgElem).attr({
						width: scope.width,
						height: scope.height,
						x: 0,
						y: 0
					});

					dummyImg.onload = function(){
						scope.$emit('complete', {name: scope.name, id: scope.$id});
					};

					imgElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);

					dummyImg.src = path;

					elem.empty().append(imgElem);
				}
			}

		};
	}]);

})();