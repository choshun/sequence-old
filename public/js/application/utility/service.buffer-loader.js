/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('utility')
    .service('BufferService', [function() {
    	
    	var bufferService = this;

    	/**
	     * Returns an array of sample paths from a sample object
	     *
	     * @param {Object} samples
     	 *
	     * @private
	     */

    	function getUrlList(samples) {
    		var urlList = [];

    		var i = 0,
    			n = samples.length;

    		for (; i < n; i++) {
    			urlList.push(samples[i].sample);
    		}

    		return urlList;
    	}

		/**
	     * Constructor for the audio loader
	     *
	     * @param {Object} audio context
     	 * @param {Array} list of sample urls
     	 * @param {function} callback after buffer load success 
     	 *
	     * @public
	     */

		this.loader = function(context, samples, callback) {
			this.context = context;
		    this.urlList = getUrlList(samples);
		    this.onload = callback;
		    this.bufferList = [];
		    this.loadCount = 0;
		};

		/**
	     * Loops through loader.urlList and fires loadbuffer
     	 *
	     * @public
	     */

		this.loader.prototype.load = function() {
		    var i = 0,
		    	n = this.urlList.length;

		    for (; i < n; i++){
		        this.loadBuffer(this.urlList[i], i);
		    }
		};

		/**
	     * Requests file, and sets an audio buffer to call on later
	     *
	     * @param {String} url
     	 * @param {Number} index
     	 *
	     * @public
	     */

		this.loader.prototype.loadBuffer = function(url, index) {
		    // Load buffer asynchronously
		    var request = new XMLHttpRequest();
		    request.open("GET", url, true);
		    request.responseType = "arraybuffer";

		    var loader = this;

		    request.onload = function() {
		        // Asynchronously decode the audio file data in request.response
		        loader.context.decodeAudioData(
		        request.response,
		        function(buffer) {
		            if (!buffer) {
		                alert('error decoding file data: ' + url);
		                return;
		            }

		            loader.bufferList[index] = buffer;
		            if (++loader.loadCount === loader.urlList.length)
		                loader.onload(loader.bufferList);
		            },
		            function(error) {
		                console.error('decodeAudioData error', error);
		            }
		        );
		    };

			request.onerror = function() {
				alert('BufferLoader: XHR error');
		    };

		    request.send();
		};

		this.updateBuffers = function(buffers) {
			console.log('update?');
			bufferService.buffers = buffers;
		};

		this.getBuffers = function() {
			// console.log('return!', bufferService.buffers);
			return bufferService.buffers;
		};

    }]);


