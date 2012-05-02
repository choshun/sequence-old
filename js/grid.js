var SQNC = SQNC || {};

(function($) {
	
	SQNC.grid = function (options){

		var self = this;
		
		alert('sup');
		
		//Private
		function doThis(){
			alert('Public');
		}
		
		//Public
		self.publicMethod = function() {
			alert('not nested Public');
		}
		
		//Nested Public
		self.nested = (function() {
			return {
				publicNestedMethod: function() {
	          		doThis();
	        	}
	    	};	
		})();
		
	}
	
})(jQuery);