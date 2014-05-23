'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk')
var wiredep = require('wiredep');


var RubanGenerator = yeoman.generators.Base.extend({

	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {

			if (!this.options['skip-install']) {
				wiredep({
					directory: 'bower_components',
					bowerJson: this.dest.readJSON('bower.json'),
					src: 'index.html'
				});
			};

			this.log(chalk.green("\nFélicitation, vous êtes désormais prêt à coder votre présentation avec Ruban"));
			this.log(chalk.blue("Pour plus détails, visitez " + chalk.underline("http://loicfrering.github.io/ruban/#/getting-started") + '\n'));
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
			},
			{
				type: 'confirm',
				name: 'livereload',
				message: 'Do you want livereload ?',
				default: false
			},
			{
				type: 'confirm',
				name: 'csslint',
				message: 'Do you want to lint your css ?',
				default: false
			}
		];

		this.prompt(prompts, function (props) {
			this.firstSlide = props.firstSlide;
			this.title = props.title;
			this.author = props.author;
			this.twitter = props.twitter;
			this.livereload = props.livereload;
			this.csslint = props.csslint;
			done();
		}.bind(this));
	},

	app: function () {
		this.template('_index.html', 'index.html')
		this.template('_bower.json','bower.json');
		this.template('_package.json','package.json');

	},

	generateGruntfile: function () {

		if (this.csslint) {
			this.gruntfile.insertConfig('csslint', "{ options: { csslintrc: '.csslintrc' }, all : { src : ['<%%= assetsDir %>/css/**/*.css']}}");
		}

		if (this.livereload) {
			this.gruntfile.insertConfig('browserSync', "{ dev : { bsFiles : { src : ['**/*html', '**/*.css', '**/*js', '!bower_components', '!node_modules'] }}}");
		}

	},

	installDependencides : function () {
		if (!this.options['skip-install']) {
			this.installDependencies({
				callback: function () {
					this.log("FINISHED");
				}.bind(this)
			});
		}
	}

});

module.exports = RubanGenerator;
