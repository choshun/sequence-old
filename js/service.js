Sequencer.service('SequencerService', ['$rootScope', function($rootScope) {
    return {
        tempo: 120,
        measures: 1,
        measureLength: 1,
        maintainTempo: function(item) {
            this.tempo = item;
            this.computeMeasureTime(this.tempo);
        },
        maintainMeasureLength: function(item) {
            this.measures = item;
            this.computeMeasureTime(this.tempo);
        },
        computeMeasureTime: function(tempo) {
			this.measureLength = 30 / this.tempo;
			$rootScope.$broadcast('measureTime.update', this.measureLength);
			console.log('MULTIPLIER', this.measureLength);
        },
        updateSequence: function() {
			SEQUENCE.sort(function(a, b) {
				return a.time - b.time;
			});

			localStorage.setItem('SEQUENCE', JSON.stringify(SEQUENCE));
			SEQUENCE = JSON.parse(localStorage.getItem("SEQUENCE"));
			//$rootScope.$broadcast('sequence.update');
        }
    };
}]);