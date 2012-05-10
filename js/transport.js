var SQNC = SQNC || {};

(function($) {
	SQNC.transport = function (options){
		
		var self = this;
		var defaults = {};
		var settings = {};
		$.extend(settings, defaults, options);
		
		var start = new Date().getTime(),
		  	interval = 100,
	        time = 0,  
	        elapsed = '.0',
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
			
	        var diff = (new Date().getTime() - start) - time;
			
			document.title = elapsed;  
			//console.log(diff);  
			
			window.setTimeout(grain, (interval - diff));
			
			makeBeat();
	    }
		
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
			
			if((((aBeat * elapsedInTempo) / aMeasure) * sequencerWidth) < aMeasure){
				reset++;
				if(reset ===1){
					//count++;

					reset++;
					fire = 0;
					console.log('fire!');
				}
				//console.log('before');
			}
			reset = 0;
		}
		
		init();
		
	}	
})(jQuery)