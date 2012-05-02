var SQNC = SQNC || {};

(function($) {	
	$(document).ready(function(){
		var theSequence = new SQNC.grid();
		theSequence.publicMethod();
		theSequence.nested.publicNestedMethod();
	});

})(jQuery);