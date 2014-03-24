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

				scope.$emit('rendering', {name: 'dog', id: scope.$id});

				$q.all([rawPromise, burnedPromise]).then(function(){
				//wait for our images to arive before we allow these functions to call

					scope.$watch('dogData', function(newVal){
						if(newVal === undefined){return;}
						scope.$emit('rendering', {name: 'dog', id: scope.$id});
						updateDog(newVal.percent);
					}, true);

					function updateDog(percent){
						//we make a new element each time to get a new onload we can hook into (they're one-use)
						var imgElem = document.createElementNS('http://www.w3.org/2000/svg', 'image');
						var dummyImg = new Image();
						var path;

						//clear canvas, draw percentages of raw/cooked hotdog images
						
						ctx.clearRect(0,0,scope.width,scope.height);
						ctx.globalAlpha = 1-percent;
						ctx.drawImage(imgRaw,0,0,scope.width,scope.width*imgRaw.height/imgRaw.width);
						ctx.globalAlpha = percent;
						ctx.drawImage(imgBurned,0,0,scope.width,scope.width*imgBurned.height/imgBurned.width);
						ctx.globalAlpha = 1;

						$(imgElem).attr({
							width: scope.width,
							height: scope.height,
							x: scope.width*3/50,
							y: 2/5*scope.height
						});

						path = can.toDataURL();

						dummyImg.onload = function(){
							scope.$emit('complete', {name: 'dog', id: scope.$id, dataUrl: path});
						};

						imgElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);

						dummyImg.src = path;

						elem.empty().append(imgElem);
						
					}

				});

				scope.$on('$destroy', function () {
					scope.$emit('destroyed', {name: 'dog', id: scope.$id});
				});

				//This event handler is not used in the demo, but shows how a dataUrl replacement system works
				scope.$on('updateUrl', function(event, data){
					if(data.id === scope.$id){
						var tempImg = new Image();

						tempImg.onload = function(){
							scope.$emit('complete', {name: 'dog', id: scope.$id, dataUrl: undefined});
							//we emit an undefined dataUrl so that the parent directive won't try to re-render this
						};

						elem.find('image')[0].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', data.newUrl);

						tempImg.src = data.newUrl;
					}
				});
			}

		};
	}]);

})();