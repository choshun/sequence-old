/* 
***	initializer for SQC;
 */

var SQNC = SQNC || {};

(function($) {	
	$(document).ready(function(){
		
		
		/* 
		 * global variables
		 * */
		SQNC.sequencer = new Array();
		SQNC.triggerKey = 0;
		SQNC.triggerKeyCount = 0;
		SQNC.isPlaying = true;

		/* 
		 * global objects
		 * */
		SQNC.loader = new SQNC.load();
		SQNC.grid = new SQNC.grid();
		SQNC.transport = new SQNC.transport();
		

		console.log(SQNC);
	});

})(jQuery);