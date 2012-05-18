/* 
***	initializer for SQC;
 */

var SQNC = SQNC || {};

(function($) {	
	$(document).ready(function(){
		
		//global variables
		SQNC.sequencer = new Array();
		SQNC.triggerKey = 0;
		SQNC.isPlaying = true;

		var sequencer = new SQNC.grid();
		var transport = new SQNC.transport();
		//var listener = new SQNC.listener();

		//global methods
		SQNC.play = transport.play;

	});

})(jQuery);