'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var RubanGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	askFor: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the marvelous Ruban generator!'));

		var prompts = [
			{
				type: 'input',
				name: 'title',
				message: 'What is the title of your prez ?',
				default: 'A great prez'
			},
			{
				type: 'input',
				name: 'author',
				message: "What is your name ?"
			},
			{
				type: 'input',
				name: 'twitter',
				message: "What is your twitter account ?"
			}
		];

		this.prompt(prompts, function (props) {
			console.log(JSON.stringify(props));
			done();
		}.bind(this));
	},

	app: function () {
		this.mkdir('app');
		this.mkdir('app/templates');

		this.copy('_package.json', 'package.json');
		this.copy('_bower.json', 'bower.json');
	},

	projectfiles: function () {
		this.copy('editorconfig', '.editorconfig');
		this.copy('jshintrc', '.jshintrc');
	}
});

module.exports = RubanGenerator;
