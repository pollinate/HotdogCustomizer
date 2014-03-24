(function(){

	/*global angular*/
	'use strict';

	angular.module('hotdogApp.controllers', []);
	angular.module('hotdogApp.directives', []);

	angular.module('hotdogApp', [
		'hotdogApp.controllers',
		'hotdogApp.directives',
		'hotDogService'
	]);

})();