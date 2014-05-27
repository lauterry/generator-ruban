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

	<% if (csslint) { %>grunt.registerTask('validate', ['csslint']);<% } %>

	<% if (livereload) { %>
	grunt.registerTask('serve', [
        'browserSync'<% if (csslint && livereload) { %>,
        'watch'<% } %>
    ]);<% } %>
};