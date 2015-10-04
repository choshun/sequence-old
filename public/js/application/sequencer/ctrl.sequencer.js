/**
 * @fileOverview - sequencer model handling.
 */

// !!!: TODO: get sequence from mongo :(

angular
    .module('sequencer')
    .controller('SequencerCtrl', 
        ['$scope', '$timeout', '$stateParams', 'AudioContextService', 'BufferService', 'SampleService', 'SchedulerService', 'SequencerService', function($scope, $timeout, $stateParams, AudioContextService, BufferService, SampleService, SchedulerService, SequencerService) {

        var sequencer = this;

        function init() {

            updateGrid(sequencer.samples);
            createLayerObject(sequencer.sequence);
            sequencer.bufferLoad();

            console.log('one sequence object?', SequencerService[$stateParams.id]);
        }

        // TODO: put in a service once I figure out scheduler
        // quick test of creating grid layers based on available samples, right now just drives ui

        function updateGrid(samples) {
            var type = '';

            var i = 0,
                n = samples.length;

            for (; i < n; i++) {
                type = samples[i].type;

                // TODO: kinda tightly coupled to type, might wanna splice in events after multiple types

                if (type === 'sample') {
                    sequencer.layers.push({
                        "sample": samples[i].sample,
                        "events": []
                    });
                }
            }
        }

        // TODO: put in a service once I figure out scheduler
        // quick test of loading already created sequence to ui

        function createLayerObject(sequence) {
            var theEvent = {},
                layer = '';

            var i = 0,
                n = sequence.length;

            for (; i < n; i++) {
                
                for (var j = 0; j < sequence[i].events.length; j++) {
                    layer = sequence[i].events[j].layer;

                    sequencer.layers[layer].events.push({
                        "time": sequence[i].time * 100
                    });
                }
            }
        }

        // TODO: put in a service once I figure out scheduler
        // again quick test of creating grid layer trigger stuff from sequence object, right now just drives ui

        this.addLayerObject = function(time, layer) {
            sequencer.layers[layer].events.push({
                "time": time
            });

            // console.log('added to layer!');

            $scope.$apply(); // update view
        };

        /**
         * Callback for bufferloader, sets bufferlist used to play samples
         *
         * @param {Array} audio buffers   
         *            
         * @private
         */

        function loadCallback(buffers) {
            BufferService.updateBuffers(buffers);

            // console.log('ctrl buffers', BufferService.getBuffers());

            sequencer.bufferList = BufferService.getBuffers();
        }

        /**
         * Audio Context! The main object that lets us do all the cool audio stuff
         *
         * @type {Object}
         */

        this.context = AudioContextService.getContext();

        /**
         * The bufferlist we send off to sample.js to play, gets populated with bufferload
         *
         * @type {Array}
         */

        this.bufferList = [];

        /**
         * What layers there are in the grid
         *
         * @type {Array}
         */

        this.layers = [];

        /**
         * The paths to the samples we're using
         * TODO: should maybe be in sample service with a get and set (from mongo)
         *
         * @type {Array}
         */

        this.samples = [
            {
                "type": "sample",
                "sample": "/samples/FH2_Kick_26.wav"
            },
            {
                "type": "sample",
                "sample": "/samples/FH2_Snare_05.wav"
            },
            {
                "type": "sample",
                "sample": "/samples/FH2_Hat_09.wav"
            },
            {
                "type": "frequency response",
                "sample": "/samples/l960big_empty_church.wav"
            }
        ];

        /**
         * The sequence driving the sequencer
         * TODO: should get this with a service with a get and set (from mongo)
         *
         * @type {Array}
         */

        this.sequence = SequencerService.getSequence() || [];

        /**
         * sets sample buffers to be played
         *
         * @public
         */

        this.bufferLoad = function() {
            var bufferLoader = new BufferService.loader(
                 this.context,
                 this.samples,
                 loadCallback
            );

            bufferLoader.load();
        };

        /** //TODO: shouw really just be updateSequence, and getSequence
         * Adds a trigger to the sequence
         *
         * @param {Number} time as percent of measure
         * @param {Number} layer
         *            
         * @public
         */

        this.addTrigger = function(time, layer) {
            // TODO: also needs to add the time key if it exists across multiple layers... maybe

            SequencerService.updateSequence(sequencer.samples, time, layer);
            sequencer.sequence = SequencerService.getSequence();
        };


        /** //TODO: should really just be removeSequence, and getSequence
         * Removes a trigger from the sequence
         *            
         * @public
         */

        this.removeTrigger = function(timeString, layer, index) {
            // TODO: kinda awkward, should just add to sequence then get it back
            // TODO: removing an event without removing the sequence object might need some work
            // TODO: Should be calling two different services, one for ui, other for sequence

            var sequence = sequencer.sequence,
                layers = sequencer.layers,
                time = timeString / 100; // this is brutal, need to pass e.target from directive to remove correct itemfrom sequence

            var i = 0,
                n = sequence.length;

            // ui remove
            layers[layer].events.splice(index, 1);
            $scope.$apply();

            for (; i < n; i++) {

                console.log(sequence[i]);
                if (sequence[i].time === time) {

                    // console.log('layer', layer, 'losing battle', sequencer.sequence[i].events[0].layer, 'sequence item', sequencer.sequence[i].events);

                    if (sequence[i].events[0].layer === parseInt(layer)) {
                        console.log('yay?', sequencer.sequence[i]);
                        // sequencer.sequence[i].events.splice(0, 1);
                        sequence.splice(i, 1);
                    }
                }
            }
        };

        init();

    }]);