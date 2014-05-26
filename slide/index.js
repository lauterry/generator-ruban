'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk')
var wiredep = require('wiredep');

var hasOption = function (options, option) {
	if(options){
		return options.indexOf(option) !== -1;
	} else {
		return false;
	}
};

var SlideGenerator = yeoman.generators.NamedBase.extend({

	init: function () {

		this.on('end', function () {
			this.log(chalk.green("Your slide has been added."));
		});
	},

	askFor: function () {
		var done = this.async();

		var prompts = [
			{
				type: "list",
				name: 'type',
				message: 'What kind of slide do you want ?',
				choices: [  "titleOnly", "list", "text"  ],
				default: 0
			}
		];

		this.prompt(prompts, function (props) {
			this.type = props.type;
			done();
		}.bind(this));
	},

	app: function () {
		if(hasOption(this.type, 'titleOnly')) {
			this._generateTitleOnly();
		} else if (hasOption(this.type, 'list')) {
			this._generateList();
		} else {
			this._generatedText();
		}

	},

	_generateTitleOnly : function () {
		this.appendToFile('index.html', 'body', '\n<section>\n\t<h1>' + this.name + '</h1>\n</section>\n');
	},

	_generateList: function () {
		this.appendToFile('index.html', 'body', '\n<section>\n\t<h1>' + this.name + '</h1>\n\t<ul class="steps">\n\t\t<li></li>\n\t\t<li></li>\n\t</ul>\n</section>\n');
	},

	_generatedText: function () {
		this.appendToFile('index.html', 'body', '\n<section>\n\t<h1>' + this.name + '</h1>\n\t<p>Lorem ipsum dolor sit amet.</p>\n</section>\n');
	}

});

module.exports = SlideGenerator;
