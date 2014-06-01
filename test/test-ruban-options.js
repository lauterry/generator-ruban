/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Generator ruban', function () {

	var gen;

	beforeEach(function (done) {
		gen = helpers.run(path.join( __dirname, '../app'))
			.withOptions({'skip-install' : true}) // Mock options passed in
			.withArguments([]) // Mock the arguments
		done();
	});

	describe('Options set by user', function () {


		beforeEach(function (done) {
			gen.inDir(path.join( __dirname, 'temp/ruban-options')) // Clear the directory and set it as the CWD
				.withPrompt({
					firstSlide : false,
					title : "Une présentation",
					livereload : false,
					csslint : false,
					pagination : true,
					ratio : 16/9,
					minPadding : '0.6em',
					transitionDuration : '2s',
					stripHtmlInToc : true,
					bindClicks : true,
					bindMouseWheel : true
				}); // Mock the prompt answers
			done();
		});

		it('should be passed to Ruban constructor with user values', function (done) {
			var expected = [
				'app/js/app.js'
			];
			gen.onEnd(function () {
				assert.file(expected);
				assert.fileContent('app/js/app.js', /\"pagination\": true/);
				assert.fileContent('app/js/app.js', /\"ratio\": 1\.7777777777777777/);
				assert.fileContent('app/js/app.js', /\"minPadding\": \"0\.6em\"/);
				assert.fileContent('app/js/app.js', /\"transitionDuration\": \"2s\"/);
				assert.fileContent('app/js/app.js', /\"stripHtmlInToc\": true/);
				assert.fileContent('app/js/app.js', /\"bindClicks\": true/);
				assert.fileContent('app/js/app.js', /\"bindMouseWheel\": true/);

				done();
			});
		});

	});

	describe('Options not set by user', function () {

		beforeEach(function (done) {
			gen.inDir(path.join( __dirname, 'temp/ruban-options')) // Clear the directory and set it as the CWD
				.withPrompt({
					firstSlide : false,
					title : "Une présentation",
					livereload : false,
					csslint : false
				}); // Mock the prompt answers
			done();
		});


		it('should be passed to Ruban constructor with default value', function (done) {
			var expected = [
				'app/js/app.js'
			];
			gen.onEnd(function () {
				assert.file(expected);
				assert.fileContent('app/js/app.js', /\"pagination\": false/);
				assert.fileContent('app/js/app.js', /\"ratio\": 1\.3333333333333333/);
				assert.fileContent('app/js/app.js', /\"minPadding\": \"0\.4em\"/);
				assert.fileContent('app/js/app.js', /\"transitionDuration\": \"1s\"/);
				assert.fileContent('app/js/app.js', /\"stripHtmlInToc\": false/);
				assert.fileContent('app/js/app.js', /\"bindClicks\": false/);
				assert.fileContent('app/js/app.js', /\"bindMouseWheel\": false/);

				done();
			});
		});

	});

});