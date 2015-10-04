/**
 * @fileOverview - sequencer app and router
 */

angular.module('sequence', ['ui.router', 'utility', 'destinations', 'controllers', 'sequencer', 'scheduler'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
		    .state('home', {
				url: '/home',
				template: 'Hi there!'
		    });

		// For specific sequence
		// $stateProvider
		//     .state('sequencer', {
		// 		url: '/sequences/{id}',
		// 		templateUrl: '/js/application/sequencer/sequencer.html',
		// 		controller: 'SequencerCtrl',
		// 		controllerAs: 'sequencer'
		//     });

		$stateProvider
		    .state('sequencer', {
				url: '/sequencer',
				templateUrl: '/js/application/sequencer/sequencer.html',
				controller: 'SequencerCtrl',
				controllerAs: 'sequencer'
		    });

		$urlRouterProvider.otherwise('/sequencer');

	}]);