// Manages start, stop, tempo, and measures

Sequencer.controller( 'Transport', [ 'SequencerService', '$scope', function(SequencerService, $scope) {
    $scope.tempo = SequencerService.tempo;
    $scope.measures = SequencerService.measures;

    $scope.updateTempo = function() {
        SequencerService.maintainTempo($scope.tempo);
    };

    $scope.updateMeasureLength = function() {
        SequencerService.maintainMeasureLength($scope.measures);
    };

    $scope.$on('measureTime.update', function(event, length) {
        measureLength = length; // in scheduler
    });
}]);

Sequencer.directive('play', function(SequencerService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var playing = false;

            document.addEventListener('keydown', function(event) {
                if (event.which === 32) {
                    event.preventDefault();

                    play();
                }
            });

            elm.on('change', function() {
                play();
            });

            function play() {
                playing = !playing;
                time = context.currentTime; // in scheduler
                if (playing) {
                    scheduler(SEQUENCE);
                    canvasTest();
                } else {
                    pause();
                    cancelAnimationFrame(rFrame);
                }
            }

            function init(SEQUENCE) {
                scheduler(SEQUENCE);
                
            }
        }
    };
});