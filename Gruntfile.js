
module.exports = function(grunt) {
	var buildDir = 'dist/';
	var srcDir   = 'timepicker/';
	var jsDir    = srcDir + 'js/';
	var lessDir  = srcDir + 'less/';
	var htmlDir  = srcDir;
	var lessFiles = {};
	var handlebarsFiles = {};
	handlebarsFiles[buildDir + "timepickerTemplate.js"] = htmlDir + 'timepicker.html';
	lessFiles[buildDir + "style.css"] = lessDir + "style.less";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [buildDir],
		concat: {
			dist: {
				src: [
					buildDir + '',
					jsDir + 'timepicker.js',
					jsDir + 'main.js'
				],
				dest: buildDir + '<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: buildDir + '<%= pkg.name %>.min.js',
				dest: buildDir + '<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			gruntfile: {
				files: [
					'Gruntfile.js'
				]
			},
			rest: {
				files: [
					jsDir + '**/*.js'
				]
			}
		}
//		less: {
//			dist: {
//				options: {
//					compress: true,
//					cleancss: true,
//					ieCompat: true,
//
//				},
//				files: lessFiles
//			}
//		},
//		handlebars: {
//			compile: {
//				options: {
//					namespace: "TimepickerHTML"
//				},
//				files: [
//					''
//				]
//			}
//		},
//		watch: {
//			js: {
//				files: [srcDir + '**/*.js'],
//				tasks: ['js']
//			},
//			css: {
//				files: [srcDir + '**/*.css', srcDir + '**/*.less'],
//				tasks: ['css']
//			},
//			html: {
//				files: [srcDir + '**/*.html', srcDir + '**/*.hbs'],
//				tasks: ['compileHB', 'js']
//			}
//		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-handlebars');

	// Default task(s).
	grunt.registerTask('default', ['js', 'css']);
	grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('css', ['less:dist']);
};
