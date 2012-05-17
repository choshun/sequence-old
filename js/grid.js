/* 
***	sequencer bindings
 */

var SQNC = SQNC || {};

(function($) {
	
	SQNC.grid = function (options){

		var self = this;
		
		var $body = $('body'), 
			$sequencer = $('#sequencer'),
			$track = $('.track');
		
		var commandKeyIsOn = false,
			sequenceWidth = $sequencer.width(),
			cursorX = 0,
			cursorY = 0;
		
		//ASSET TYPES
		/*
		***	TODO: automation
		 */
		
		//tracks
		var track = {
			type: 'track'
		}
		//END ASSET TYPES
		
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

				$body.addClass('control-on');
			}
		}

		function destroyCommandKeyStatus(e){
			if (!e.metaKey) {
				commandKeyIsOn = false;
				console.log('control off');
				$body.removeClass('control-on');
			}
		}
	
		function bindTrackActions(){
			/*
			***	TODO: break this out,
			***		use jQuery.position so cursorY is easy with multiple tracks
			 */
			//mouse move on track give offset
			
			$sequencer.on('mousemove', '.track', function(e){
				cursorX = (window.Event) ? e.pageX : event.clientX;
				cursorX = cursorX - $sequencer.offset().left;
				//TODO:height offset, pass track dimensions to global vars
				cursorY = (window.Event) ? e.pageY : event.clientY;
				//console.log(cursorX + '|' + cursorY);
			});
			//click on track add a trigger signature
			$sequencer.on('click', '.track', function(e){
				
				var $target = $(e.target)
				
				if(commandKeyIsOn){
					if($target.attr('class') === 'trigger') {
						$target.remove();
						
						var arrayIndex = $target.data('trigger-key');
						
						SQNC.sequencer.splice(arrayIndex , 1);
						triggerKey--;
						console.log(SQNC.sequencer);
						
					} else{
						addTrigger({
							velocity: 100,
							$target: $target
						});
					}
				}
			});
		}
		
		function addTrigger(options){
			console.log(cursorX);
			
			/*
			***	TODO: don't hard code trigger left offset (because of trigger div thickness)
			 */
			options.$target.append('<div class = "trigger" style="left:' + parseInt(cursorX - 5) + 'px" data-trigger-key="' + triggerKey + '"/>');
			SQNC.sequencer.push(cursorX);
			console.log(SQNC.sequencer);
			triggerKey++;
		}
		
		init();
		
	}
	
})(jQuery);