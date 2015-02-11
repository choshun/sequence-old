/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 */

angular
    .module('scheduler')
    .service('SchedulerService', ['AudioContextService', 'SequencerService', function(AudioContextService, SequencerService) {
    	// Scheduling vars
		var context = AudioContextService.getContext();

		var isPlaying = false,
			scheduleAheadTime = 0.1, //var scheduleAheadTime = 0.1; in secs
			lookahead = 25, // var lookahead = 25; in ms
			timerID = 0;

		var index = 0;
		var eventTime = 0;

		// new
		var trigger = {},
		    type = '',
		    eventKey = '';

		var addedTime = 0;

		var currentBeat = 1;

		//ghettoooo
		var loopIndex = 0;
		var time = 0;
		var pauseTime = 0;

		var measureLength = 1;
		var scheduleSequence = {};

		function init() {
			//scheduler();
			console.log('sequence?', SequencerService.getSequence());

			setTimeout(function() {
				console.log('sequence?', SequencerService.getSequence());
			}, 4000);

		}

		function scheduler() {
	    	while (eventTime < context.currentTime + scheduleAheadTime) {

	    		console.log('blarg');

		        if (scheduleSequence[index] !== undefined) {
		            trigger = scheduleSequence[index];
		            eventTime = trigger.time + loopIndex + time;

		            // TODO: make this seperate where you just pass in the callback object
		            for (eventKey in trigger.events) {
		                if (trigger.events[eventKey].type === 'audio') {
		                    scheduleEvent(eventTime, bufferList[trigger.events[eventKey].params.sample]);
		                    //console.log(index, eventTime);
		                } else {
		                    playOsc(eventTime);
		                }
		            }

		            // // NEW:
		            // // INSTEAD of having next not/check beat etc, just have the unchanged scheduleSequence, then a prepped cropped version that loops if needed

		            index++;
		        } else {
		            //console.log('next event:', eventTime);
		            index = 0;
		            loopIndex += measureLength;
		            console.log('NEW MEASURE', measureLength);
		        }
		    }

		    timerID = window.setTimeout(function() {
		        scheduler(scheduleSequence);
		    }, lookahead);
		}

		function pause() {
		    clearTimeout(timerID);
		    loopIndex = 0;
		}

		function scheduleEvent(time, bufferSound) {
		    playSample( time, bufferSound );
		}

		init();

    	/**
	     * Plays a sample from a buffer
	     *
	     * @param {Number} time
     	 * @param {Object} asset - the buffer
     	 * @param {Object} context 
     	 *
	     * @public
	     */


		// this.playSample = function(time, asset, context) {
		//     var source = context.createBufferSource();
		//     source.buffer = asset;

		//     /** SAMPLE COMPRESSOR **/
		//     sampleCompressor = context.createDynamicsCompressor();
		//     sampleCompressor.ratio.value = 30;
		//     sampleCompressor.threshold.value = 500;
		//     source.connect(sampleCompressor);
		//     sampleCompressor.connect(context.destination);

		//     source.start(time);
		// };

    }]);