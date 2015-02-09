// 'use strict';

module.exports = function(grunt){

	// Load grunt tasks automatically based on package.json dependancies
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Config tasks
	grunt.initConfig({

		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'public/css/sequencer.css': 'public/sass/sequencer/sequencer.scss'
				}
			}
		},

		clean: {
			content: ['../EMIT.Wave.Web/Content/'],
			coverage: ['test/coverage/'],
			vendor: ['js/vendor/'],
			js: ['../EMIT.Wave.Web/Content/js']
		},

		jshint: {
			all: ['js/application/article/article.add-buttons.directive.js'],
			options : {
				jshintrc : '.jshintrc'
			}
		},

		uglify: {
			my_target: {
				options: {
					sourceMap: true,
					sourceMapName: 'public/sourcemap.map'
				},

				files: {
					'public/js/dist/sequence.js': [
						// Vendor
						'public/js/vendor/angular/angular.js',
						'public/js/vendor/angular-ui-router/release/angular-ui-router.js',
						'public/js/vendor/jquery/dist/jquery.js',

						// Utility
						'public/js/application/utility/utility.js',
						'public/js/application/utility/service.audio-context.js',
						'public/js/application/utility/service.buffer-loader.js',

						// Destinations
						'public/js/application/destinations/destinations.js',
						'public/js/application/destinations/service.sample.js',

						// Controllers
						'public/js/application/controllers/controllers.js',
						'public/js/application/controllers/directive.layer.js',

						// Sequencer
						'public/js/application/sequencer/sequencer.js',
						'public/js/application/sequencer/ctrl.sequencer.js',

						// App
						'public/js/application/app.js'
					]
				}
			}
		},

		watch: {
			files: ['public/js/application/**/*.js'],
			tasks: ['uglify'],
			sass: {
				files: ['public/sass/**/*.{scss,sass}','public/sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			},
			livereload: {
				files: ['views/*.ejs', 'public/dist/js/*.{js,json}', 'public/css/*.css','public/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
				options: {
					livereload: true
				}
			}
		}

	});

	// grunt.registerTask('compile', ['npm-install', 'clean:vendor', 'bower:install', 'copy:fonts', 'compass', 'copy:images', 'copy:css', 'concat', 'copy:js', 'copy:fileUploadMap', 'karma:unit']);
	grunt.registerTask('default', ['watch', 'sass:dist']);
};