// Handles input and construction of automation data
// Right now it's the kaos pad thingy as the only controller, the constructed array should be able to drive any asset type, 
// as of now it's osc and canvas (canvas kind of :/)

Sequencer.controller('Automation', ['SequencerService', '$scope', function(SequencerService, $scope) {

	$scope.automation = [];

	function init() {
		$scope.createAutomation();
	}

	$scope.updateAutomation = function() {
        SequencerService.updateAutomation($scope.automation);
    };

    $scope.createAutomation = function() {

		var duration = 1,
			frequency = (lowPassIsOn) ? 2.0 * $scope.cursorY : 2.0,
			scale = 1,
			chaosFreqMultiplier = 3000 * $scope.cursorX;

		console.log(frequency);

		var valueCount = 4096;

		values = new Float32Array(valueCount);

		for (var i = 0; i < valueCount; i++) {
			var percent = (i / valueCount) * duration * frequency;
			values[i] = Math.abs(1 + (Math.sin(percent * 2 * Math.PI) * scale) * ((lowPassIsOn) ? chaosFreqMultiplier : 3000));
			// Set the last value to one, to restore playbackRate to normal at the end.
			if (i == valueCount - 1) {
				values[i] = 1 * ((lowPassIsOn) ? chaosFreqMultiplier : 3000);
			}
		}
		//console.log(values);

		$scope.automation = values;

		$scope.updateAutomation();
    };

    init();

}]);

// TODO, don't make cursorx and y scoped, just pass values to controller
Sequencer.directive('automate', function(SequencerService) {
	return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
			scope.cursorY = 0;
			scope.cursorX = 0;

			var $padWidth = elm.width(),
				$padHeight = elm.height();

			elm.mousemove(function(e){

			/** TODO: only change these when the command key is on **/

			scope.cursorX = (window.Event) ? e.pageX : event.clientX;
			scope.cursorX = scope.cursorX - elm.offset().left;
			scope.cursorY = (window.Event) ? e.pageY : event.clientY;
			scope.cursorY = scope.cursorY - elm.offset().top;

			var section = $padWidth * 30;

			scope.cursorX = Math.floor($padWidth / section * scope.cursorX) * 0.1 * 2.5 + 0.1;
			scope.cursorY = Math.floor($padWidth / section * scope.cursorY) * 0.1 * 5 + 0.1;

			//console.log('CURSOR Y' + cursorY);

			scope.createAutomation();

			});
        }
    };
});
