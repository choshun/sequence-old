var SQNC = SQNC || {};

(function($) {
	
	SQNC.grid = function (options){

		var self = this;
		
		var $sequencer = $('#sequencer'),
			$track = $('.track');
		
		var commandKeyIsOn = false;
		
		//tracks, TODO: automation
		var track = {
			type: 'track'
		}
		
		function init(){
			var initTrack = new SQNC.load({
				id: 'track1',
				asset: track
			});

			bindWindowForTrackActions();
			bindTrackActions();
		}
	
		function bindWindowForTrackActions(){
			$(document).on('keydown', function(e){
				checkCommandKeyStatus(e);
			});
			$(document).on('keyup', function(e){
				destroyCommandKeyStatus(e);
			});
		}
		
		function checkCommandKeyStatus(e){
			if (e.metaKey) {
				commandKeyIsOn = true;
				console.log('control on');
				$('body').css('cursor','pointer');
			}
		}

		function destroyCommandKeyStatus(e){
			if (!e.metaKey) {
				commandKeyIsOn = false;
				console.log('control off');
				$('body').css('cursor','default');
			}
		}
	
		function bindTrackActions(){
			$sequencer.on('click', '.track', function(e){
				if(commandKeyIsOn){
					alert(e.target.id);
				}
			});
		}
		
		init();
		
	}
	
})(jQuery);