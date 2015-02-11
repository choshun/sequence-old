/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('sequencer')
    .service('SequencerService', [function() {
    	
    	var sequencerService = this;

    	this.sequence = [];

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