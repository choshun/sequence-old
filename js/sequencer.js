/* 
***	initializer for SQC;
 */

var SQNC = SQNC || {};

(function($) {	
	$(document).ready(function(){
		
		//global
		SQNC.sequencer = new Array();
		SQNC.triggerKey = 0;
		
		var sequencer = new SQNC.grid();
		var transport = new SQNC.transport();
		//var listener = new SQNC.listener();
	});

})(jQuery);