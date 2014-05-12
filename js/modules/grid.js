// Manages start, stop, tempo, and measures

Sequencer.controller( 'Grid', [ 'SequencerService', '$scope', function(SequencerService, $scope) {
    $scope.sequence = SEQUENCE;
    $scope.layerObject = {};

    function init() {
        $scope.createLayers();
    }

    $scope.showGrid = function() {
        $scope.sequence = SEQUENCE; // for when it refreshes at some point (measure selected changes etc)
    };

    $scope.createLayers = function() {

        for (var timeKey in $scope.sequence) {
            var events = $scope.sequence[timeKey].events;

            for (var eventKey in events) {
                var thisEvent = events[eventKey];

                if ($scope.layerObject[thisEvent.params.sample] === undefined) {
                    $scope.layerObject[thisEvent.params.sample] = [];
                }

                $scope.layerObject[thisEvent.params.sample].push($scope.sequence[timeKey].time);
            }
        }

        console.log('SCOPE OBJECT', $scope.layerObject);
    };

    init();
    
}]);

Sequencer.directive('add', function(SequencerService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            // var playing = false;

            // document.addEventListener('keyup', function(event) {
            //     if (event.which === 32) {
            //         play();
            //     }
            // });

            // elm.on('change', function() {
            //     play();
            // });

            // function play() {
            //     playing = !playing;
            //     time = context.currentTime; // in scheduler
            //     playing ? scheduler(SEQUENCE) : pause();
            // }
        }
    };
});