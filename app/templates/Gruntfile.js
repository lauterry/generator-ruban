module.exports = function (grunt) {
    'use strict';

	require('load-grunt-tasks')(grunt);

    grunt.initConfig({
	    <% if (csslint) { %>
        csslint: {
            options: { csslintrc: '.csslintrc' },
            all: { src: ['<%%= assetsDir %>/css/**/*.css'] }
        },<% } %>

	    <% if (csslint && livereload) { %>
        watch: {
            css: {
                files: [
                    '**/*.css',
                    '!bower_components',
                    '!node_modules'
                ],
				tasks: ['csslint']
            }
        },<% } %>

		<% if (livereload) { %>
        browserSync: {<% if (csslint) { %>
            options: { watchTask: true },<% } %>
            dev: {
                bsFiles: {
					src: [
						'index.html',
						'*.css',
						'*.js'
					]
                }
            }
        }<% } %>
    });

    grunt.registerTask('validate', ['csslint']);

	grunt.registerTask('serve', [
        'browserSync',
        'watch'
    ]);
};