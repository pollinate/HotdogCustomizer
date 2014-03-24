(function(){

	/*global angular, $, canvg*/
	'use strict';

	angular.module('hotdogApp.directives')
	.directive('visualizer', [ '$timeout', function($timeout){
		return {
			restrict: 'A',

			scope: {
				hotDogData: '=' //our only input for the child directives
			},

			templateUrl: 'js/partials/vizbase.html',

			link: function(scope,elem){

				scope.activeComponents = [];

				////Emit / Broadcast monitoring system - 3 kinds of events

				scope.$on('rendering', function(event, data){
					//emitted by child directives on first postLink & on change
					var foundIndex;
					scope.activeComponents.forEach(function(component, index){
						if(component.id == data.id){
							component.done= false;
							foundIndex = index;
						}
					});
					if(foundIndex === undefined){
						scope.activeComponents.push({
							id: data.id,
							name:data.name,
							done: false
						});
					}
				});

				scope.$on('complete', function(event, data){
					//emitted by child directives when draws/loads are done
					//if we're monitoring dataUrls, this will be called a second time with no URL
					//to indicate that the directive has reloaded

					var foundIndex;
					scope.activeComponents.forEach(function(component, index){
						if(component.id == data.id){
							component.done= true;
							component.dataUrl = data.dataUrl;
							foundIndex = index;
						}
					});
					if(foundIndex === undefined){
						scope.activeComponents.push({
							id: data.id,
							done: true,
							name: data.name,
							dataUrl: data.dataUrl
						});
					}
					checkComponents();
				});

				scope.$on('destroyed', function(event, data){
					//for when a directive either fails or is destroyed
					var foundIndex;
					scope.activeComponents.forEach(function(component, index){
						if(component.id == data.id){
							foundIndex = index;
						}
					});
					if(foundIndex !== undefined){
						scope.activeComponents.splice(foundIndex,1);
					}
					checkComponents();
				});

				function checkComponents(){
					var undoneCount = 0;
					scope.activeComponents.forEach(function(component){
						if(component.dataUrl){
							/*	this would be a good place to PUT your dataUrls to a server that
								could 'reflect' them back as real files. This allows us to get
								around CORS issues from tainted canvases when rasterizing the viz.
								
								After the server responds, we can $broadcast the URL back down the
								scope along with the component ID that we started with. The directives
								can compare with their own ids, update their img src, and call 'complete' again

								The 'dog' directive has an unused event handler to demonstrate this
		
								undoneCount ++;

								when using this method, you can have the directives call 'complete'
								a second time with  no dataUrl to pass the validation check, plus
								they won't need to pass up a dataUrl anyway since they'll be using images
								from the server
							*/
						}
						if(!component.done){
							undoneCount++;
						}
					});

					if(undoneCount){
						return; //we still have things to load
					}
					else{
						$timeout(function(){
							//one Angular tick later (to make sure DOM ng-attributes are resolved)
							rasterize();
						});
					}
				}

				function rasterize(){
					var canvas = document.createElement('canvas'),
						serializer = new XMLSerializer(),
						svgElem = elem.find('svg')[0],
						svgString = serializer.serializeToString(svgElem)

						//these replaces are more for ease of debugging/svg extraction than for prepping for canvg

						.replace(/<!--[\s\S]*?-->/g, '') //remove comments
						.replace(/(\r\n|\n|\r)/gm,'') //remove newlines
						.replace(/(\s+|\t+)/g,' ') //remove excess spaces & tabs
						.replace(/\ xlink=/g, ' xmlns:xlink=', 'g') //fix for safari: xlink -> xmlns:xlink
						.replace(/\ href=/g, ' xlink:href=', 'g'); //fix for safari: href -> xlink:href

					canvas.width = scope.hotDogData.width;
					canvas.height = scope.hotDogData.height;

					canvg(canvas, svgString,
						{
							ignoreMouse: true,
							ignoreAnimation:true,
							renderCallback: function(){
								console.log(canvas.toDataURL());
							}
						});
				}

			}

		};
	}]);

})();