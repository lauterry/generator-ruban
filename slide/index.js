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
				choices: [  "titleOnly", "list", "text", "end"  ],
				default: 0
			}
		];

		this.prompt(prompts, function (props) {
			this.type = props.type;
			done();
		}.bind(this));
	},


	app: function () {
		var data = {
			title : this.name
		};

		if(hasOption(this.type, 'titleOnly')) {
			this._addSlide('titleOnlySlideTemplate.html', data);
		} else if (hasOption(this.type, 'list')) {
			this._addSlide('listSlideTemplate.html', data);
		} else if (hasOption(this.type, 'end')) {
			data.twitter = this.config.get('twitter');
			this._addSlide('endSlideTemplate.html', data);
		} else {
			this._addSlide('textSlideTemplate.html', data);
		}
	},

	_addSlide : function (template, data) {
		var slide = this.engine(this.src.read(template), data);
		this.appendToFile('app/index.html', 'body', slide);
	}

});

module.exports = SlideGenerator;
