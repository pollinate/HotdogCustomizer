(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotdogApp.directives')
	.directive('dog', ['$q', function($q){
		return {
			restrict: 'A',

			scope: {
				dogData: '=',
				width: '@',
				height: '@'
			},

			link: function(scope, elem){
				scope.$watch('dogData', function(newVal){
					if(newVal === undefined){return;}
					updateDog(newVal.percent);
				}, true);

				function updateDog(percent){
					//we make a new element each time to get a new onload we can hook into (they're one-use in Chrome)
					var imgElem = document.createElementNS('http://www.w3.org/2000/svg', 'image');
					var dummyImg = new Image();

					var can = document.createElement('canvas'),
						ctx = can.getContext('2d'),
						imgRaw = new Image(),
						imgBurned = new Image(),
						rawDefer = $q.defer(),
						rawPromise = rawDefer.promise,
						burnedDefer = $q.defer(),
						burnedPromise = burnedDefer.promise;

					can.width = scope.width;
					can.height = scope.height;

					imgRaw.onload = function(){
						rawDefer.resolve();
					};

					imgRaw.src = scope.dogData.raw;

					imgBurned.onload = function(){
						burnedDefer.resolve();
					};

					imgBurned.src = scope.dogData.burned;

					$q.all([rawPromise, burnedPromise]).then(function(){
						var path;

						ctx.globalAlpha = 1-percent;
						ctx.drawImage(imgRaw,0,0);
						ctx.globalAlpha = percent;
						ctx.drawImage(imgBurned,0,0);
						ctx.globalAlpha = 1;

						$(imgElem).attr({
							width: scope.width,
							height: scope.height,
							x: 30,
							y: 200
						});

						path = can.toDataURL();

						dummyImg.onload = function(){
							scope.$emit('complete', {name: 'dog', id: scope.$id});
						};

						imgElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);

						dummyImg.src = path;

						elem.empty().append(imgElem);
					});

				}
			}

		};
	}]);

})();