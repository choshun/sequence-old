/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('sequencer')
    .service('SequencerService', [function() {
    	
    	var sequencerService = this;

    	this.sequence = [];

    	// for testing
    	this.sequence = [
    		{
		        "time": 0,
		        "events": [
		            {
		                "layer": 0,
		                "type": "audio"
		            },
		            {
		                "layer": 3,
		                "type": "audio"
		            }
		        ]
		    },
		    {
		        "time": 0.25,
		        "events": [
		            {
		                "layer": 2,
		                "type": "audio"
		            }
		        ]
		    },
		    {
		        "time": 0.5,
		        "events": [
		            {
		                "layer": 0,
		                "type": "audio"
		            },
		            {
		                "layer": 1,
		                "type": "audio"
		            }
		        ]
		    },
		    {
		        "time": 0.75,
		        "events": [
		            {
		                "layer": 1,
		                "type": "audio"
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
		    sequencerService.sequence = sequence;
		};

		this.getSequence = function() {
			return sequencerService.sequence;
		};

    }]);