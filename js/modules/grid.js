// Handles display and manipulation of original SEQUENCE which informs the rest of the app

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

Sequencer.directive('addTrigger', function(SequencerService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.on('click', function() {
                alert('heeeeeey buddy');
            });
        }
    };
});