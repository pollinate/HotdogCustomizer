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

				scope.$emit('rendering', {name: scope.name, id: scope.$id});

				scope.$watch('url', function(newVal){
					if(newVal === undefined || !newVal.length){return;}
					scope.$emit('rendering', {name: scope.name, id: scope.$id});
					updateUrl(newVal);
				});

				function updateUrl(path){
					//we make a new <img> element each time to get a new onload we can hook into (they're one-use)
					//SVG <image> tags have no onload
					var imgElem = document.createElementNS('http://www.w3.org/2000/svg', 'image');
					var dummyImg = new Image();

					$(imgElem).attr({
						width: scope.width,
						height: scope.height,
						x: 0,
						y: 0
					});

					dummyImg.onload = function(){
						scope.$emit('complete', {name: scope.name, id: scope.$id, dataUrl: path});
					};

					imgElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);

					dummyImg.src = path;

					elem.empty().append(imgElem);
				}

				scope.$on('$destroy', function () {
					scope.$emit('destroyed', {name: scope.name, id: scope.$id});
				});
			}

		};
	}]);

})();