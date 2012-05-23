/* 
*** this loads track assets, fired from grid.js's bindings
	TODO: maybe nest this in SQNC.grid?
 */

var SQNC = SQNC || {};

(function($) {
	SQNC.load = function (options){
		var audio=document.createElement("audio");
		var self = this;
		var defaults = {};
		var settings = {};
		$.extend(settings, defaults, options);
		
		//private

		var $sequencer = $('#sequencer');
		
		console.log(settings);
		
		init = function(){
			createAudioFile();

		}
		
		function createTrackHTML(settings){
			if(settings.asset.type === 'track'){
				var theID = settings.id;
				var theHTML = '<div id="' + theID + '" class="track" />';
				$sequencer.append(theHTML);
				alert('here');
			}
		}

		function createAudioFile(){
		    
			audio.preload="auto";
			audio.setAttribute('type', 'audio/mp3');
			audio.appendChild(audioMP3=document.createElement("source"));
			audioMP3.src="samples/brokencigerrette.mp3";
			document.body.appendChild(audio)
		    
		}

		init();

		//public
		return{
			audio: audio, 
			createTrackHTML : createTrackHTML
		}

	}	
})(jQuery)


