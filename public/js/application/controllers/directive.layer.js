/**
 * @fileOverview - adding and removing triggers on layer
 *
 */

angular
	.module('controllers')
	.directive('layer', ['$window', function($window) {
		return {
			scope: {
				//nodeName: '=',
				addTrigger: '&',
				removeTrigger: '&',
				createLayers: '&'
			},
			link: function(scope, element, attrs) {

				var layer = this;

				function init() {
					bindAdd();
				}

				/**
		         * Sets properties of layers
		         * TODO: might be good to have a config with global stuff maybe, so it's set only once
		         *            
		         * @private
		         */

				function setLayerProperties() {
					layer.$sequencer = $('#sequencer');
					layer.layerWidth = $sequencer.width();
				}

				/**
		         * Binds ctrl functions to click 
		         *            
		         * @private
		         */

				function bindAdd() {
					element.on('click', function(event) {
						setLayerProperties(); // TODO: not sure why some are properties, and some are private

						var offset = $(event.target).offset().left,
							pageX = event.pageX;

						var left = pageX - offset,
							percentage = left / layer.layerWidth;

						var eventItem = {
							time: percentage * 100,
							layer: attrs.layerIndex
						};

						// for sequence to scheduler
						scope.addTrigger(eventItem);
						
						// for ui
						scope.createLayers(eventItem);
					});
				}

				// attrs.$observe('nodeName', function() {
				// 	console.log(' name: ', attrs.nodeName);
				// });

				init();
			}
		};
	}]);
