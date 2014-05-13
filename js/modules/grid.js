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

    $scope.updateSequence = function() {
        SequencerService.updateSequence();
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
                if (event.target.classList[0] !== 'trigger') {
                    time = (event.pageX - elm.position().left) / elm.width();

                    // TODO: should prolly be in controller
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

                    // anything that changes scheduled sequence should go in sequence.js
                    scope.updateSequence();

                    scheduleSequence = SEQUENCE;
                    console.log('NEW LAYER OBJECT', scope.layerObject);

                    scope.$apply();
                }
            });
        }
    };
});

Sequencer.directive('remove', function(SequencerService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.on('click', function() {
                var layer = elm.parent().attr('add'),
                    trigger = attrs.remove;
                
                //should be in a controller
                scope.layerObject[layer].splice(
                    trigger, 1
                );

                // anything that changes scheduled sequence should go in sequence.js
                SEQUENCE.forEach(function(item, index) {
                    if (item.time === attrs.timeId - 0) {
                        SEQUENCE.splice(index, 1);
                        scheduleSequence = SEQUENCE;

                        return;
                    }
                });
            });
        }
    };
});