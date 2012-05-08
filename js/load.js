var SQNC = SQNC || {};

(function($) {
	SQNC.load = function (options){
		
		var self = this;
		var defaults = {};
		var settings = {};
		$.extend(settings, defaults, options);
		
		var $sequencer = $('#sequencer');
		
		console.log(settings);
		
		init = function(){
			createTrackHTML();
		}
		
		function createTrackHTML(){
			if(settings.asset.type === 'track'){
				var theID = settings.id;
				var theHTML = '<div id="' + theID + '" class="track" />';
				$sequencer.append(theHTML);
			}
		}
		
		init();
		
	}	
})(jQuery)