var SQNC = SQNC || {};

(function($) {
	
	SQNC.grid = function (options){

		var self = this;
		
		var track = {
			type: 'track'
		}
		
		function init(){
			makeGrid();
		}
		
		//Private
		function makeGrid(){
			var loader = new SQNC.load({
				id: 'track1',
				asset: track
			});
			
		}
		
		//Public
		this.publicMethod = function() {
			//alert('not nested Public');
		}
		
		//Nested Public
		self.nested = (function() {
			return {
				publicNestedMethod: function() {
	          		//alert('public nested');
	        	}
	    	};	
		})();
		
		init();
		
	}
	
})(jQuery);