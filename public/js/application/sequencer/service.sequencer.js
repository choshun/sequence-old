/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('sequencer')
    .service('SequencerService', ['$http', '$stateParams', function($http, $stateParams) {
    	
    	var sequencerService = this;

    	function order(sequence) {
    		return sequence.sort(function(a, b) {
    			return a.time - b.time;
    		});
    	}

    	this.sequence = [];

    	// for testing
    	this.sequence = [
    		{
		        "time": 0,
		        "events": [
		            {
		                "layer": 0,
		                "type": "sample"
		            }
		        ]
		    },
		    {
		        "time": 0.25,
		        "events": [
		            {
		                "layer": 2,
		                "type": "sample"
		            }
		        ]
		    },
		    {
		        "time": 0.5,
		        "events": [
		            {
		                "layer": 0,
		                "type": "sample"
		            }
		        ]
		    },
		    {
		        "time": 0.5,
		        "events": [
		            {
		                "layer": 1,
		                "type": "sample"
		            }
		        ]
		    },
		    {
		        "time": 0.75,
		        "events": [
		            {
		                "layer": 2,
		                "type": "sample"
		            }
		        ]
		    }
    	];

    	/**
	     * Adds to sequence object
	     *
	     * @param {Array} samples - object with sample info
     	 * @param {Number} time
     	 * @param {Number} layer 
     	 *
	     * @public
	     */

		this.updateSequence = function(samples, time, layer) {

			var sequenceItem = {
                "time": time / 100, // turn back to seconds
                "events": [
                    {
                        "layer": parseInt(layer),
                        "type": samples[layer].type // sets type based on layer object
                    }
                ]
            };
			
            sequencerService.sequence.push(sequenceItem);
			sequencerService.sequence = order(sequencerService.sequence);

			// var sequenceUrl = '/sequences/' + $stateParams.id + '/' + sequenceItem.time;

			// TODO: make this a private function, dthat's used by add and remove
			// $http.put(sequenceUrl, sequenceItem).success(function(data, status, headers, config) {
			    
			// 	console.log('post success');
			// }).
			// error(function(data, status, headers, config) {
			    
			// 	console.log('post error');
			// });

			var sequenceUrl = '/sequence';

			console.log('item?', sequenceItem);

			$http.post(sequenceUrl, sequenceItem).success(function(data, status, headers, config) {
			    
				console.log('post success');
			}).
			error(function(data, status, headers, config) {
			    
				console.log('post error');
			});

			// console.log('ordered?', sequencerService.sequence);
		};

		this.getSequence = function() {
			var sequenceUrl = '/sequences/' + $stateParams.id;

			var promise = $http.get(sequenceUrl);

			promise.then(function(result) { 
				console.log('data?!?!?!?!?!', result.data);

				return result.data; 
			});

			return sequencerService.sequence;
		};

    }]);