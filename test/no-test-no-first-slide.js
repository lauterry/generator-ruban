/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('No first slide', function () {

	before(function (done) {

		helpers.run(path.join( __dirname, '../app'))
			.inDir(path.join( __dirname, 'temp/no-first-slide')) // Clear the directory and set it as the CWD
			.withOptions({'skip-install' : true}) // Mock options passed in
			.withArguments([]) // Mock the arguments
			.withPrompt({
				firstSlide : false,
				title : "Une présentation",
				author : "Thierry LAU",
				twitter : "laut3rry",
				livereload : false,
				csslint : false
			}) // Mock the prompt answers
			.onEnd(done)

	});

	it('creates expected files', function (done) {
		var expected = [
			'bower.json',
			'app/index.html',
			'package.json'
		];
		assert.file(expected);
		done();
	});

	it('has not first slide', function (done) {
		assert.fileContent('app/index.html', /<title>Une présentation<\/title>/);
		assert.noFileContent('app/index.html', /Thierry LAU/);
		assert.noFileContent('app/index.html', /laut3rry/);
		done();
	})

	it('has expected npm dependencies', function (done) {
		assert.noFileContent('package.json', /grunt-browser-sync/);
		assert.noFileContent('package.json', /grunt-contrib-csslint/);
		done();
	})

});
