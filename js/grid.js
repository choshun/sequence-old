var SQNC = SQNC || {};

(function($) {
	
	SQNC.grid = function (options){

		var self = this;
		
		//types of stuff to make
		var track = {
			type: 'track'
		}
		
		function init(){
			makeGrid();
		}
		
		function makeGrid(){
			var loader = new SQNC.load({
				id: 'track1',
				asset: track
			});
			
		}
		
		init();
		
	}
	
})(jQuery);