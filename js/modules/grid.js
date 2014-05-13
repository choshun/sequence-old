// Handles display and manipulation of original SEQUENCE which informs the rest of the app

Sequencer.controller( 'Grid', [ 'SequencerService', '$scope', function(SequencerService, $scope) {
    $scope.sequence = SEQUENCE;
    $scope.layerObject = [];

    function init() {
        $scope.createLayers();
    }

    $scope.showGrid = function() {
        $scope.sequence = SEQUENCE; // for when it refreshes at some point (measure selected changes etc)
    };

    $scope.createLayers = function() {
        var events = {};

        for (var timeKey in $scope.sequence) {
            var thisEvent = {};
            events = $scope.sequence[timeKey].events;

            for (var eventKey in events) {
                thisEvent = events[eventKey];

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
            var time = 0;

            elm.on('click', function(event) {
                time = (event.pageX - elm.position().left) / elm.width();

                console.log('target!:', event.target);

                SEQUENCE.push({
                    "time": time,
                    "events": [
                        {
                            "layer": 1,
                            "type": "audio",
                            "params": {
                                "sample": attrs.add,
                                "velocity": 0.5
                            }
                        }
                    ]
                });

                scope.layerObject[attrs.add].push(
                    time
                );

                scheduleSequence = SEQUENCE;
                console.log('NEW LAYER OBJECT', scope.layerObject);

                scope.$apply();
            });
        }
    };
});

Sequencer.directive('remove', function(SequencerService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.on('click', function() {
                alert('remove yo');
            });
            
        }
    };
});