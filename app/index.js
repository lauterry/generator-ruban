'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');


var RubanGenerator = yeoman.generators.Base.extend({

	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				wiredep({
					directory: 'app/vendor',
					bowerJson: this.dest.readJSON('bower.json'),
					src: 'app/index.html',
					exclude: [ 'vendor/ruban/css/ruban-print.min.css' ]
				});
			};

			this.log(chalk.green("\nGreat, you're now ready to code your prez with Ruban"));
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
				type: 'confirm',
				name: 'firstSlide',
				message: 'Do you want me to generate the first slide with the title, your name et your twitter account ?',
				default: true
			},
			{
				type: 'input',
				name: 'author',
				message: "What is your name ?",
				when: function (answers) {
					return answers.firstSlide === true;
				}
			},
			{
				type: 'input',
				name: 'twitter',
				message: "What is your twitter account ?",
				when: function (answers) {
					return answers.firstSlide === true;
				}
			}
		];

		this.prompt(prompts, function (props) {
			this.firstSlide = props.firstSlide;
			this.title = props.title;
			this.author = props.author;
			this.twitter = props.twitter;

			done();
		}.bind(this));
	},

	app: function () {
		this.dest.mkdir('app');
		this.src.copy('bowerrc', '.bowerrc');
		this.template('_bower.json', 'bower.json');
		this.template('_index.html', 'app/index.html');
	},

	installDeps : function () {
		if (!this.options['skip-install']) {
			this.bowerInstall();
		}
	}

});

module.exports = RubanGenerator;
