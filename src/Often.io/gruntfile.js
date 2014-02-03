module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			uses_defaults: ['public/javascripts/*.js'],
			with_overrides: {
				options: {
					curly: false,
					undef: true
				},
				files: {
					src: ['public/javascripts/*.js']
				}
			}
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
					"public/stylesheets/style.css": "public/stylesheets/style.less"
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

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify', 'less', 'watch']);
};