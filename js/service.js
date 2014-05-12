Sequencer.service('SequencerService', ['$rootScope', function($rootScope) {
    return {
        tempo: 60,
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
			this.measureLength = 60 / this.tempo;
			$rootScope.$broadcast('measureTime.update', this.measureLength);
			console.log('MULTIPLIER', this.measureLength);
        }
    };
}]);