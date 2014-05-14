// ALL THIS SHOULD DO IS PREP THE OBJECT FOR THE SCHEDULER, NO display, no adding/chaning ui,
// NOTE, there no service sequence object, shouldn't need it.

var Sequencer = angular.module('sequencer', []);

Sequencer.controller('Sequencer', ['SequencerService', '$scope', function(SequencerService, $scope) {

    // cloning SEQUENCE object so changes to $scope.sequence won't effect SEQUENCE
    $scope.sequence = JSON.parse(localStorage.getItem("SEQUENCE")) || JSON.parse(JSON.stringify(SEQUENCE));
    scheduleSequence = $scope.sequence;

    $scope.$on('measureTime.update', function(event, length) {
        $scope.sequence = JSON.parse(JSON.stringify(SEQUENCE));
        $scope.updateTempo();
    });

    // $scope.$on('sequence.update', function(event) {
    //     $scope.sequence = JSON.parse(JSON.stringify(SEQUENCE));
    // });

    $scope.updateTempo = function() {
        $scope.sequence.forEach(function(event, index) {
            event.time = SEQUENCE[index].time * SequencerService.measureLength;
        });

        scheduleSequence = $scope.sequence;
    };

    // // finds out how many bars there are in the sequence
    // $scope.findHowManyBars = function() {
    //     $scope.sequence = _.sortBy($scope.sequence, 'time');
    //     $scope.bars = Math.ceil($scope.sequence[$scope.sequence.length - 1].time);
    // }

}]);