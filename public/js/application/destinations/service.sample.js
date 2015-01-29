/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('destinations')
    .service('SampleService', [function() {
    	
    	/**
	     * Plays a sample from a buffer
	     *
	     * @param {Number} time
     	 * @param {Object} asset - the buffer
     	 * @param {Object} context 
     	 *
	     * @public
	     */

		this.playSample = function(time, asset, context) {
		    var source = context.createBufferSource();
		    source.buffer = asset;

		    /** SAMPLE COMPRESSOR **/
		    sampleCompressor = context.createDynamicsCompressor();
		    sampleCompressor.ratio.value = 30;
		    sampleCompressor.threshold.value = 500;
		    source.connect(sampleCompressor);
		    sampleCompressor.connect(context.destination);

		    source.start(time);
		};

    }]);