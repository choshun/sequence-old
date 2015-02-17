/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('sequencer')
    .service('SequencerService', [function() {
    	
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

		this.updateSequence = function(sequence) {
			console.log('ordered?', order(sequence));

		    sequencerService.sequence = order(sequence);
		};

		this.getSequence = function() {
			return sequencerService.sequence;
		};

    }]);