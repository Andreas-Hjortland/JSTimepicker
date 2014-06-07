
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			build: 'build',
			src:   'timepicker',
			js:    '<%= dirs.src %>/js',
			less:  '<%= dirs.src %>/less',
			html:  '<%= dirs.src %>/templates'
		},
		srcFiles: {
			intro:        '<%= dirs.js %>/intro.js',
			outro:        '<%= dirs.js %>/outro.js',
			htmlTemplate: '<%= dirs.html %>/timepicker.html',
			mainJS:       '<%= dirs.js %>/timepicker.js',
			mainLess:     '<%= dirs.less %>/style.less',
			gruntfile:    'Gruntfile.js'
		},
		dstFiles: {
			concatJS: '<%= dirs.build %>/<%= pkg.name %>.js',
			minJS:    '<%= dirs.build %>/<%= pkg.name %>.min.js',
			css:      '<%= dirs.build %>/<%= pkg.name %>.css',
			htmlJS:   '<%= dirs.build %>/<%= pkg.name %>.html.js',
		},
		clean: ['<%= dirs.build %>'],
		concat: {
			build: {
				options: {
					process: function(src, filepath) {
						return src.replace(/<%=([^%]*)%>/, function(match, p1, offset, string) {
							return grunt.config.get(p1.trim());
						});
					}
				},
				src: [
					'<%= srcFiles.intro %>',
					'<%= dstFiles.htmlJS %>',
					'<%= jshint.rest %>',
					'<%= srcFiles.outro %>'
				],
				dest: '<%= dstFiles.concatJS %>',
				nonull: true
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			build: {
				src:  '<%= concat.build.dest %>',
				dest: '<%= dstFiles.minJS %>'
			}
		},
		jshint: {
			gruntfile: ['<%= srcFiles.gruntfile %>'],
			rest: ['<%= srcFiles.mainJS %>']
		},
		less: {
			build: {
				options: {
					compress: true,
					cleancss: true,
					ieCompat: true,
				},
				files: {
					'<%= dstFiles.css %>': '<%= srcFiles.mainLess %>'
				}
			}
		},
		dot: {
			compile: {
				options: {
					variable: 'template',
					requirejs: false,
					node:      false

				},
				src:  ['<%= srcFiles.htmlTemplate %>'],
				dest: '<%= dstFiles.htmlJS %>'
			}
		},
		watch: {
			gruntfile: {
				files: ['<%= srcFiles.gruntfile %>'],
				tasks: ['clean', 'default']
			},
			js: {
				files: ['<%= dirs.js %>/**/*.js'],
				tasks: ['js']
			},
			css: {
				files: ['<%= dirs.less %>/**/*.less'],
				tasks: ['css']
			},
			html: {
				files: ['<%= dirs.html %>/**/*.dot'],
				tasks: ['compileHB', 'js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-dot-compiler');

	// Default task(s).
	grunt.registerTask('default', ['html', 'js', 'css']);
	grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('css', ['less:build']);
	grunt.registerTask('html', ['dot']);
};
