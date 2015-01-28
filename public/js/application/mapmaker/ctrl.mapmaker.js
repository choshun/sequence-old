angular
    .module('mapmaker')
    .controller('MapmakerCtrl', ['$scope', '$timeout', 'MapService', function($scope, $timeout, MapService) {

    	this.model = {
    		'Rob': 'I am the captian now',
    		'I believe in alex': false,
    		'nodes': [
    			{
    				'name': 'Mexico'
    			},
    			{
    				'name': 'Fresno'
    			}
    		]
    	};

    	this.updateNodeName = function(name, index) {
    		this.model.nodes[index].name = name;
    		$scope.$apply();
    		console.log(this.model);
    	};

    	// For testing directive firing when control model changes with $observe
		$timeout(angular.bind(this, function() {
			this.model.nodes[0].name = 'snyarf';
			$scope.$apply();
		}), 3000);
		

		this.getMaps = function() {
			
			console.log('map service!');
			var mapPromise = MapService.getMaps();

			mapPromise.then(function (result) {
	            this.maps = result.data;

	            console.log('maps', this.maps);
	        });
		};

		this.getMaps();
    }]);