/* 
***	this sets the grain for time elapsed for the sequence
*** when time elapsed is greater than the next sequencer trigger event, it fires
*** TODO: the keeping time and ordering the sequence array should stay here, 
***  	  but the firing should not (eventually writeOSC.js, or something to that effect)
 */

var SQNC = SQNC || {};

(function($) {
	SQNC.transport = function (options){
		
		var self = this;
		var defaults = {};
		var settings = {};
		$.extend(settings, defaults, options);
		
//(elapsed === 0) ? elapsed = '.0' : elapsed = elapsed)

		var start = new Date().getTime(),
		  	nextGrain = null,
		  	interval = 25,
	        time = 0,  
	        elapsed = elapsed || '.0',
			tempo = 60;
		
		var $sequencer = $('#sequencer');
		var sequencerWidth = $sequencer.width();
		
		console.log(settings);
		
		init = function(){
			keepTime();
		}
		
		function keepTime(){
		    grain();
		}
		
		function grain() {  
			time += interval;  
	        elapsed = Math.floor(time / 100) / 10;  
	        if (Math.round(elapsed) === elapsed) { 
				elapsed += '.0'; 
			}  
			
			document.title = elapsed;  
			//console.log(diff);  
			//alert(SQNC.isPlaying);
			if(SQNC.isPlaying === true){
				
				self.play();
				
			} 
	    }
		
		//public method
	    self.play = function(){
	    	//alert('playing?');
	    	var diff = (new Date().getTime() - start) - time;
			window.setTimeout(grain, (interval - diff));
			makeBeat();
	    }
	    //end public method

		var fire = 0;
		var aBeat = 60 / tempo;
		var elapsedInTempo = 0;
		var aMeasure = 4;
		
		function makeBeat(){
			elapsedInTempo = (elapsed % (aBeat * aMeasure)) ;
			convertElapsedToCursorX();
		}
		
		var count = 0;
		var reset = 0;
		function convertElapsedToCursorX(){
			//console.log((((aBeat * elapsedInTempo) / aMeasure) * sequencerWidth) + '|||'+ sequencer[count]);
			//console.log(elapsedInTempo);
			var cursorXtobeatPosition = (((aBeat * elapsedInTempo) / aMeasure) * sequencerWidth);
			//console.log(cursorXtobeatPosition);
			
			/*
			*** every measure reset, clean up sequence array
			*/
			if( cursorXtobeatPosition < aMeasure){
				reset++;
				if(reset === 1){

					reset++;
					fire = 0;
					//console.log('fire!');
					//TODO: sort sequence array
					//TODO: reset trigger indexes to reflect order (they are data attributes)
					
					//TODO: mod trigger index to amount of triggers. the following works .. but probably won't
					triggerKey = 0;
					
				}
				//console.log('before');
				
			}
			
			
			reset = 0;
			
			
			//fire when cursorXtobeatPosition is greater than the the indexed xvalue (trigger)
			if (cursorXtobeatPosition > SQNC.sequencer[triggerKey]){
				console.log(SQNC.sequencer[triggerKey] + ' | ' + cursorXtobeatPosition);
				//bump up to next trigger
				triggerKey++;
			}
			
		}
		
		init();
		
	}	
})(jQuery)