/**
 * @fileOverview - bootstrapping of the best risk game ever!
 */

angular.module('warshark', ['ui.router', 'mapmaker'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
		    .state('home', {
				url: '/home',
				template: 'Hi there!'
		    });

		$stateProvider
		    .state('mapmaker', {
				url: '/mapmaker',
				templateUrl: '/js/application/mapmaker/mapmaker.html',
				controller: 'MapmakerCtrl',
				controllerAs: 'map'
		    });

		$urlRouterProvider.otherwise('/home');
	}]);