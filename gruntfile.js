module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				expand: true,
				cwd: 'bower_components',
				src: '**',
				dest: 'public/libs'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
			},
            all: [
                'gruntfile.js',
                'models/*.js',
                'routes/*.js',
                'test/*.js',
                'server.js',
                'public/app/{,*/}.js',
                'public/javascripts/{,*/}.js'
            ],
            frontend: [
                'gruntfile.js',
                'public/app/{,*/}.js',
                'public/javascripts/{,*/}.js'
            ],
            backend: [
                'gruntfile.js',
                'models/*.js',
                'routes/*.js',
                'test/*.js',
                'server.js'
            ]
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'public/javascripts/<%= pkg.name %>.js',
				dest: 'public/javascripts/<%= pkg.name %>.min.js'
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					// target.css file: source.less file
					'public/stylesheets/style.css': 'public/stylesheets/style.less'
				}
			}
		},
		watch: {
			styles: {
				// Which files to watch (all .less files recursively in the less directory)
				files: ['public/stylesheets/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify', 'less', 'watch']);
};