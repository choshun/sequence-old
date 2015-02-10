/**
 * @fileOverview - sequencer model handling.
 */

angular
    .module('sequencer')
    .controller('SequencerCtrl', ['$scope', '$timeout', 'AudioContextService', 'BufferService', 'SampleService', function($scope, $timeout, AudioContextService, BufferService, SampleService) {

        var sequencer = this;

        function init() {
            sequencer.bufferLoad();
            createLayers(sequencer.samples);

            // test
            setTimeout(function() {
                console.log(sequencer.bufferList, 'LIST?!?!?');

                SampleService.playSample(0.1, sequencer.bufferList[0], sequencer.context);
                SampleService.playSample(0.5, sequencer.bufferList[1], sequencer.context);
                SampleService.playSample(0.8, sequencer.bufferList[2], sequencer.context);
            }, 100);
        }

        // TODO: put in a service once I figure out scheduler
        // quick test of creating grid layers based on available samples, right now just drives ui

        function createLayers(samples) {
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
        // again quick test of creating grid layer trigger stuff from sequence object, right now just drives ui

        this.createLayerObject = function(time, layer) {
            sequencer.layers[layer].events.push({
                "time": time
            });

            $scope.$apply(); // so sad I need this. Though model is updated, view doesn't update
        };

        /**
         * Callback for bufferloader, sets bufferlist used to play samples
         *
         * @param {Array} audio buffers   
         *            
         * @private
         */

        function loadCallback(buffers) {
            sequencer.bufferList = buffers;
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
                "sample": "/samples/FH2_Hat_09.wav"
            },
            {
                "type": "sample",
                "sample": "/samples/FH2_Kick_26.wav"
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

        this.sequence = [];

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

        /**
         * Adds a trigger to the sequence
         *
         * @param {Number} time as percent of measure
         * @param {Number} layer
         *            
         * @public
         */

        this.addTrigger = function(time, layer) {
            sequencer.sequence.push({
                "time": time,
                "events": [
                    {
                        "layer": layer,
                        "type": sequencer.samples[layer].type // sets type based on layer object
                    }
                ]
            });

            console.log(sequencer.sequence);
        };

        /**
         * Callback for bufferloader, sets bufferlist used to play samples
         *
         * @param {Number} time as percent of measure
         * @param {Number} layer
         *            
         * @public
         */
        
    	this.updateNodeName = function(name, index) {
    		this.model.nodes[index].name = name;
    		$scope.$apply();
    		console.log(this.model);
    	};

    	// For testing directive firing when control model changes with $observe
		// $timeout(angular.bind(this, function() {
		// 	this.model.nodes[0].name = 'snyarf';
		// }), 3000);
		

		this.getMaps = function() {
			
			// console.log('map service!');
			// var mapPromise = MapService.getMaps();

			// mapPromise.then(function (result) {
	  //           this.maps = result.data;

	  //           console.log('maps', this.maps);
	  //       });
		};

		//this.getMaps();
        

        init();

    }]);