/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('sequencer')
    .service('SequencerService', ['$http', function($http) {
    	
    	var sequencerService = this;

    	function order(sequence) {
    		sequence.sort(function(a, b) {
    			return a.time - b.time;
    		});

    		return sequence;
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
	     * Plays a sample from a buffer
	     *
	     * @param {Number} time
     	 * @param {Object} asset - the buffer
     	 * @param {Object} context 
     	 *
	     * @public
	     */

		this.updateSequence = function(samples, time, layer) {
			var sequenceUrl = '/sequence';

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

			// console.log(sequencerService.sequence);

			// testPost = {time: 65, events: [{ layer: 10, type: 'banana' }]};

			$http.post(sequenceUrl, sequenceItem).
				success(function(data, status, headers, config) {
			    
				console.log('post success');
			}).
			error(function(data, status, headers, config) {
			    
				console.log('post error');
			});

			console.log('ordered?', sequencerService.sequence);
		    
		};

		this.getSequence = function() {
			return sequencerService.sequence;
		};

    }]);