angular
    .module('mapmaker')
    .service('MapService', ['$http', function($http) {
    	console.log('i\'m totally a thing');

    	var mapUrl = '/maps';

    	this.getMaps = function() {
    		return $http.get(mapUrl);
    	};

    	this.addMap = function(map) {
			$http.post(mapUrl, map).
				success(function(data, status, headers, config) {
			    // this callback will be called asynchronously
			    // when the response is available
			}).
			error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
    	};
    }]);