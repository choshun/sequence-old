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
				var theID = setting.id;
				var theHTML = '<div id=""' + theID + '""></div>';
				
			}
		}
		
		init();
		
	}	
})(jQuery)