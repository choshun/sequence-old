Sequencer.controller( 'Transport', [ 'SequencerService', '$scope', function(SequencerService, $scope) {
    $scope.tempo = SequencerService.tempo;
    $scope.measures = SequencerService.measures;

    $scope.updateTempo = function() {
        SequencerService.maintainTempo($scope.tempo);
    };

    $scope.updateMeasureLength = function() {
        SequencerService.maintainMeasureLength($scope.measures);
    };
}]);


Sequencer.directive('play', function(SequencerService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var playing = false;

            document.addEventListener('keyup', function(event) {
                playing = !playing;

                if (event.which === 32) {
                    time = context.currentTime;
                    console.log('TIME FROM TRANSPORT', time);
                    playing ? scheduler(SEQUENCE) : pause();
                }
            });

            elm.bind('change keyup', function() {
                alert(SequencerService.tempo);
            });

        }
    };
});