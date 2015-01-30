/**
 * @fileOverview - sequencer model handling.
 */

angular
    .module('sequencer')
    .controller('SequencerCtrl', ['$scope', '$timeout', 'AudioContextService', 'BufferService', 'SampleService', function($scope, $timeout, AudioContextService, BufferService, SampleService) {

        var sequencer = this;

        function init() {
            sequencer.bufferLoad();

            // test
            setTimeout(function() {
                console.log(sequencer.bufferList, 'LIST?!?!?');

                SampleService.playSample(0.1, sequencer.bufferList[0], sequencer.context);
                SampleService.playSample(0.5, sequencer.bufferList[1], sequencer.context);
                SampleService.playSample(0.8, sequencer.bufferList[2], sequencer.context);
            }, 100);
        }

        /**
         * Callback for bufferloader, sets bufferlist used to play samples
         *
         * @param {array} audio buffers   
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
         * The paths to the samples we're using
         *
         * @type {Array}
         */

        this.samples = [
            '/samples/FH2_Kick_26.wav',
            '/samples/FH2_Hat_09.wav',
            '/samples/FH2_Snare_05.wav',
            '/samples/l960big_empty_church.wav'
        ];

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
            console.log('reload?');

        };

        // end buffer load test

    	this.model = {
    		'Rob': 'I am the captian now',
    		'I believe in alex': false,
    		'nodes': [
    			{
    				'name': 'Mexico'
    			},
    			{
    				'name': 'Fresno'
    			}
                
    		]
    	};
        
    	this.updateNodeName = function(name, index) {
    		this.model.nodes[index].name = name;
    		$scope.$apply();
    		console.log(this.model);
    	};

    	// For testing directive firing when control model changes with $observe
		$timeout(angular.bind(this, function() {
			this.model.nodes[0].name = 'snyarf';
			$scope.$apply();
		}), 3000);
		

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