(function(){

	/*global angular*/
	'use strict';

	angular.module('slideService', [])

	.factory('slideService', [ function() {

		var slides = [
			{
				title: 'Background',
				text:'Product customizers require visualization elements.',
				image: '',
				code:''
			},
			{
				title: 'The problem',
				text:'How to visualize a product with complex logic?',
				image: 'http://placecage.com/c/400/400',
				code:''
			},
			{
				title: 'Our solution',
				text: 'Create directives within an SVG to manage visualization',
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