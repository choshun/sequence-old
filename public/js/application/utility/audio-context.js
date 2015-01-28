/**
 * @fileOverview - wrapper for audio context object (the object with all the cool audio stuff!)
 */

angular
    .module('utility')
    .service('AudioContextService', [function() {
    	
    	this.context = undefined;

    	// init
		angular.bind(this, setContext)();

    	/**
	     * Audio context shim
	     *
	     * @private
	     */

    	function setContext() {
			var contextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;

			if (contextClass) {
				// Web Audio API is available.
				this.context = new contextClass();
			}
    	}

		/**
	     * Returns the audio context
	     *
	     * @public
	     */

		this.getContext = function() {
			return this.context;
		};

    }]);


