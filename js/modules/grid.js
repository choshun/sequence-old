// Handles display and manipulation of original SEQUENCE which informs the rest of the app

Sequencer.controller( 'Grid', [ 'SequencerService', '$scope', function(SequencerService, $scope) {
    //$scope.sequence = JSON.parse(localStorage.getItem("SEQUENCE")) || SEQUENCE;
    $scope.sequence = SEQUENCE;
    $scope.layerObject = [];

    function init() {
        $scope.createLayers();
        canvasTest();
    }

    function canvasTest() {
        var canvas = document.getElementById('canvas'),
            canvasContext = canvas.getContext('2d');

        var wrapper = getComputedStyle(document.getElementById('canvas-wrapper'));

        var height = parseInt(wrapper.getPropertyValue('height')),
            width = parseInt(wrapper.getPropertyValue('width'));

        console.log(height, width);

        canvas.width = width;
        canvas.height = height;

        canvasContext.beginPath();
        canvasContext.moveTo(0, 50);
        canvasContext.lineTo(width, 50);
        canvasContext.moveTo(50, 0);
        canvasContext.lineTo(50, height);
        canvasContext.stroke();
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

            //not dry
            SEQUENCE = JSON.parse(localStorage.getItem("SEQUENCE")) || SEQUENCE;

            elm.on('click', function(event) {
                if (event.target.classList[0] !== 'trigger') {
                    time = (event.pageX - elm.position().left) / elm.width();

                    // TODO: should prolly be in controller with base object
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
                
                // doesn't work/not dry
                //SEQUENCE = JSON.parse(localStorage.getItem("SEQUENCE")) || SEQUENCE;

                //should be in a controller
                scope.layerObject[layer].splice(
                    trigger, 1
                );

                // anything that changes scheduled sequence should go in sequence.js
                SEQUENCE.some(function(item, index) {
                    if (item.time === attrs.timeId - 0) {
                        SEQUENCE.splice(index, 1);
                        scheduleSequence = SEQUENCE;

                        //return item.time === attrs.timeId - 0;
                    }
                });

                localStorage.setItem('SEQUENCE', JSON.stringify(SEQUENCE));
            });
        }
    };
});