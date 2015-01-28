angular
	.module('mapmaker')
	.directive('nodeName', function() {
		return {
			scope: {
				//nodeName: '=',
				update: '&'
			},
			link: function(scope, element, attrs) {

				attrs.$observe('nodeName', function() {
					console.log(' name: ', attrs.nodeName);
				});

				element.on('click', function() {
					// the update attribute is set to &, which allows us to inject local stuff into the parent controller
					// http://stackoverflow.com/questions/24177470/call-method-on-directive-to-pass-data-to-controller
					scope.update({
						nodeName: element.html() + ' clicked',
						nodePosition: attrs.nodeIndex
					});
				});
			}
		};
	});