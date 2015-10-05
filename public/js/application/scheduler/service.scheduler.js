/**
 * @fileOverview - wrapper for audio buffer loading, based on http://webaudioapi.com/samples/shared.js
 * @requires window.AudioContext
 * !!!TODO: cleanup vars, rename them to be more accurate, make scheduler public, so service.transport can handle play
 */

angular
    .module('scheduler')
    .service('SchedulerService', ['AudioContextService', 'SequencerService', 'BufferService', 'SampleService', function(AudioContextService, SequencerService, BufferService, SampleService) {
		
		var context = AudioContextService.getContext();

		/**
         * The time th while loop will look ahead to see what to schedule
         *
         * @type {Number} in s
         */
		var scheduleAheadTime = 0.1;

		/**
         * About resolution at which js will check what to schedule, fine if it drifts.
         * the important thing is that it's smaller enough than the lookahead to accomodate event cycle clogging
         *
         * @type {Number} in ms
         */
		var lookahead = 25, // var lookahead = 25; in ms
			timerID = 0;

		var index = 0;
		var eventTime = 0;

		// new
		var trigger = {},
		    type = '',
		    eventKey = '';

		// TODO: should be in transport
		var loopIndex = 0;
		var time = 0;
		var pauseTime = 0;

		var measureLength = 1;

		function init() {

			setTimeout(function() {
				// console.log('sequence?', SequencerService.getSequence());
				
				scheduler(); // TODO: NEEDS to wait till buffers are loaded, also need to pass in sequence from service
				
			}, 200);
		}

		function scheduler() {
	    	while (eventTime < context.currentTime + scheduleAheadTime) {
		        
		        if (SequencerService.getSequence()[index] !== undefined) {

		        	//console.log('sceduler update?', SequencerService.getSequence());
		            trigger = SequencerService.getSequence()[index];
		            eventTime = trigger.time + loopIndex + time;

		            for (eventKey in trigger.events) {
		                if (trigger.events[eventKey].type === 'sample') {

		                    scheduleEvent(eventTime, BufferService.getBuffers()[trigger.events[eventKey].layer]);

		                } else {
		                    //playOsc(eventTime);
		                }
		            }

		            index++;
		        } else {
		            index = 0;
		            loopIndex += measureLength;
		            // console.log('NEW MEASURE', measureLength);
		        }
		    }

		    timerID = window.setTimeout(function() {
		        scheduler();
		    }, lookahead);
		}

		function pause() {
		    clearTimeout(timerID);
		    loopIndex = 0;
		}

		function scheduleEvent(time, bufferSound) {
		    SampleService.playSample(time, bufferSound, context);
		}

		init();

    }]);