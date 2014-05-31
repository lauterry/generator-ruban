/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('First slide', function () {

	var gen;

	beforeEach(function (done) {
		gen = helpers.run(path.join( __dirname, '../app'))
			.withOptions({'skip-install' : true}) // Mock options passed in
			.withArguments([]) // Mock the arguments
		done();
	});

	describe('will be generated', function () {

		beforeEach(function (done) {
			gen.inDir(path.join( __dirname, 'temp/first-slide')) // Clear the directory and set it as the CWD
				.withPrompt({
					firstSlide : true,
					title : "Une présentation",
					author : "Thierry LAU",
					twitter : "laut3rry",
					livereload : false,
					csslint : false
				}); // Mock the prompt answers
			done();
		});

		it('creates expected files', function (done) {
			var expected = [
				'bower.json',
				'app/index.html',
				'package.json'
			];
			gen.onEnd(function () {
				helpers.assertFile(expected);
				done();
			});
		});

		it('has first slide', function (done) {
			gen.onEnd(function () {
				assert.fileContent('app/index.html', /<title>Une présentation<\/title>/);
				assert.fileContent('app/index.html', /<h1>Une présentation<\/h1>/);
				assert.fileContent('app/index.html', /Thierry LAU/);
				assert.fileContent('app/index.html', /laut3rry/);
				done();
			});
		});

		it('has expected npm dependencies', function (done) {
			gen.onEnd(function () {
				assert.noFileContent('package.json', /grunt-browser-sync/);
				assert.noFileContent('package.json', /grunt-contrib-csslint/);
				done();
			});
		});
	});

	describe('will not be generated', function () {

		beforeEach(function (done) {

			gen.inDir(path.join( __dirname, 'temp/no-first-slide')) // Clear the directory and set it as the CWD
				.withPrompt({
					firstSlide : false,
					title : "Une présentation",
					author : "Thierry LAU",
					twitter : "laut3rry",
					livereload : false,
					csslint : false
				}); // Mock the prompt answers
			done();
		});

		it('creates expected files', function (done) {
			var expected = [
				'bower.json',
				'app/index.html',
				'package.json'
			];

			gen.onEnd(function () {
				assert.file(expected);
				done();
			});

		});

		it('has not first slide', function (done) {
			gen.onEnd(function () {
				assert.fileContent('app/index.html', /<title>Une présentation<\/title>/);
				assert.noFileContent('app/index.html', /Thierry LAU/);
				assert.noFileContent('app/index.html', /laut3rry/);
				done();
			});
		});

		it('has expected npm dependencies', function (done) {
			gen.onEnd(function () {
				assert.noFileContent('package.json', /grunt-browser-sync/);
				assert.noFileContent('package.json', /grunt-contrib-csslint/);
				done();
			});
		});

	});
});
