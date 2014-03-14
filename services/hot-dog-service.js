(function(){

	/*global angular, $*/
	'use strict';

	angular.module('hotDogService', [])

	.factory('hotDogService', [ function() {

		var hotDog = {

			width: 500,
			height: 500,

			backdrop: {
				images: [
					'assets/coney-island.jpg',
					'assets/ground-zero-pentagon.jpg',
					'assets/Swords_of_qadisiyah.jpg'
				],
				selected: ''
			},

			bun: {
				base: 'assets/empty-hot-dog-bun.png',
				top: 'assets/bun-top.png'
			},

			dog: {
				raw: 'assets/frank.png',
				burned: 'assets/burned.png',
				percent: 0.5
			},

			condiments: [],

			toppings: []
		};

		return hotDog;

	}]);

})();