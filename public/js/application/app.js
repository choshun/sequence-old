/**
 * @fileOverview - bootstrapping of the best risk game ever!
 */

angular.module('sequence', ['ui.router', 'utility', 'destinations', 'controllers', 'sequencer'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
		    .state('home', {
				url: '/home',
				template: 'Hi there!'
		    });

		$stateProvider
		    .state('sequencer', {
				url: '/sequencer',
				templateUrl: '/js/application/sequencer/sequencer.html',
				controller: 'SequencerCtrl',
				controllerAs: 'sequencer'
		    });

		$urlRouterProvider.otherwise('/home');
	}]);