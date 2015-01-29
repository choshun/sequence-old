angular
    .module('sequencer')
    .controller('SequencerCtrl', ['$scope', '$timeout', 'AudioContextService', 'BufferService', 'SampleService', function($scope, $timeout, AudioContextService, BufferService, SampleService) {

        var context = AudioContextService.getContext();

        console.log(context);

        // buffer load test
        var bufferList = [];

        var sampleArray = '/samples/FH2_Kick_26.wav /samples/FH2_Hat_09.wav /samples/FH2_Snare_05.wav /samples/l960big_empty_church.wav'.split(' ');

        console.log(sampleArray);

        function bufferLoad() {
            var bufferLoader = new BufferService.loader(
                 context,
                 sampleArray,
                 loadCallback
            );

            bufferLoader.load(); // from audio-helpers.js
        }

        function loadCallback(buffers){
            bufferList = buffers;
            bufferLoaded = true;
            console.log('WE DID IT', bufferList);
            //$('.loading').addClass('hidden');
        }

        bufferLoad();
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
    }]);