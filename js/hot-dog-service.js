(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotDogService', [])

	.factory('hotDogService', [ function() {

		var hotDog = {

			width: 500,
			height: 500,

			backdrop: '',

			bun: {
				base: 'assets/empty-hot-dog-bun.png',
				top: 'assets/bun-top.png'
			},

			dog: {
				raw: 'assets/frank.png',
				burned: 'assets/burned.png',
				percent: 0.5
			}
		};

		return hotDog;

	}]);

})();