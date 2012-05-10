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
			tempo = 120;
			
		var aBeat = 60 / tempo;
		var elapsedInTempo = 0;
		
		var testNumber = 1.1;
		
		var $sequencer = $('#sequencer');
		
		console.log(settings);
		
		init = function(){
			keepTime();
			//makeLoop();
			
			// setInterval(function(){
			// 				convertElapsedToCursorX();
			// 				console.log(elapsedInTempo)
			// 			
			// 			},500);
			//alert('asd')
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
			
			// I need to check if elapsed converted to Cursor x is greater than what's it the array,
			// if so fire on
			
			convertElapsedToCursorX();
			
			//only for testing
			
	    }
		
		function convertElapsedToCursorX(){
			//one beat, then increment
			elapsedInTempo = elapsed % aBeat;
			console.log(elapsedInTempo);
		}
		
		function makeBeat(){
			if(tempo / (elapsed % 60) === parseInt(tempo / (elapsed % 60))){
				console.log(elapsed);
			}
			//var beat = (tempo / (elapsed % 60));
			//console.log(beat);
		}
		
		init();
		
	}	
})(jQuery)