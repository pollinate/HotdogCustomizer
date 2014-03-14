(function(){

	/*global angular*/
	'use strict';

	angular.module('slideService', [])

	.factory('slideService', [ function() {

		var slides = [
			{
				title: 'Background',
				text:'lorem ipsum sit dolor amet',
				code:'$scope.number = $routeParams.slideId;'
			},
			{
				title: 'The problem',
				text:'but you don\'t have to take my word for it',
				image: 'http://placecage.com/c/400/400',
				code:'$scope.number = 4;'
			},
			{
				title: 'Our solution',
				text: '',
				image: '',
				code: ''
			},
			{
				title: 'Structure',
				text: '',
				image: '',
				code: ''
			}
		];

		return slides;

	}]);

})();