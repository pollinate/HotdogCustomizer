(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotDogService', [])

	.factory('hotDogService', [ function() {

		var hotDog = {

			width: 500,
			height: 500,

			bun: {
				base: 'assets/empty-hot-dog-bun.png',
				top: 'assets/bun-top.png'
			},

			dog: {
				url: 'assets/frank.png'
			}
		};

		return hotDog;

	}]);

})();