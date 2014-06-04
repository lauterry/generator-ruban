'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var RubanGenerator = yeoman.generators.Base.extend({

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
	}

});

module.exports = RubanGenerator;
