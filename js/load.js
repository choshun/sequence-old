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
			//loadJsOrCssfile('css/testLoad.css','css');
			
			createTrackHTML();
		}
		
		function createTrackHTML(){
			if(settings.asset.type === 'track'){
				var theID = setting.id;
				var theHTML = '<div id=""' + theID + '""></div>';
				
			}
		}

		function loadJsOrCssfile(filename, filetype){
			
			if (filetype=="js"){
			 	var fileref=document.createElement('script')
				
				fileref.setAttribute("type","text/javascript")
				fileref.setAttribute("src", filename)
			
			} else if (filetype=="css"){
				
				var fileref=document.createElement("link");
				
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", filename);
			}
			
			document.getElementsByTagName("head")[0].appendChild(fileref);
			
		}
		
		init();
		
	}	
})(jQuery)