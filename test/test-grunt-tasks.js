/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('grunt tasks', function () {

	before(function (done) {
		helpers.run(path.join( __dirname, '../app'))
			.inDir(path.join( __dirname, 'temp/grunt-tasks')) // Clear the directory and set it as the CWD
			.withOptions({'skip-install' : true}) // Mock options passed in
			.withArguments([]) // Mock the arguments
			.withPrompt({
				firstSlide : false,
				title : "Une présentation",
				author : "Thierry LAU",
				twitter : "laut3rry",
				livereload : true,
				csslint : false
			}) // Mock the prompt answers
			.onEnd(done)

	});

	it('creates expected files', function (done) {
		var expected = [
			'bower.json',
			'app/index.html',
			'package.json',
			'Gruntfile.js'
		];
		helpers.assertFile(expected);
		done();
	});

	it('has first slide', function (done) {
		assert.fileContent('Gruntfile.js', /browserSync/);
		assert.noFileContent('Gruntfile.js', /csslint/);
		done();
	})

	it('has expected npm dependencies', function (done) {
		assert.fileContent('package.json', /grunt-browser-sync/);
		assert.noFileContent('package.json', /grunt-contrib-csslint/);
		done();
	})

});
