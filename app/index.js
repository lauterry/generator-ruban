'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk')
var wiredep = require('wiredep');


var RubanGenerator = yeoman.generators.Base.extend({

	init: function () {

		this.on('end', function () {
			if (!this.options['skip-install']) {
				wiredep({
					directory: 'bower_components',
					bowerJson: this.dest.readJSON('bower.json'),
					src: 'app/index.html',
					exclude: [ 'bower_components/ruban/css/ruban-print.min.css' ]
				});
			};

			this.log(chalk.green("\nGreat, you're now ready to code your prez with Ruban"));
			this.log(chalk.green("\nStart the server (with livereload) by running :"));
			this.log(chalk.bgGreen("\n      grunt serve"));
			this.log(chalk.green("\nYou can add a slide by running :"));
			this.log(chalk.bgGreen("\n      yo ruban:slide 'a slide title'"));
			this.log(chalk.blue("\nFor more details, please visit " + chalk.underline("http://loicfrering.github.io/ruban/#/getting-started") + '\n'));
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
			}, {
				type: 'confirm',
				name: 'pagination',
				message: 'Do you want to display pagination ?',
				default: false
			}, {
				type: 'list',
				name: 'ratio',
				message: 'In which ratio do you want to display your slide ?',
				choices: ['4/3', '16/9', 'IMAX'],
				default: 0
			}, {
				type: 'input',
				name: 'minPadding',
				message: 'What is the minimum padding around your slides ?',
				default: '0.4em'
			}, {
				type: 'input',
				name: 'transitionDuration',
				message: "What is the duration of the ruban's scrolling effect ?",
				default: '1s'
			}, {
				type: 'confirm',
				name: 'stripHtmlInToc',
				message: "Should HTML tags be stripped when generating the TOC ?",
				default: false
			}, {
				type: 'confirm',
				name: 'bindClicks',
				message: "Use left and right clicks to navigate through the ruban ?",
				default: false
			}, {
				type: 'confirm',
				name: 'bindMouseWheel',
				message: "Use the mouse wheel to navigate through the ruban ?",
				default: false
			}, {
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
			this.config.set('twitter', this.twitter);
			this.livereload = props.livereload;
			this.csslint = props.csslint;

			this.rubanOptions = JSON.stringify({
				pagination : props.pagination,
				ratio : +props.ratio,
				minPadding : props.minPadding,
				transitionDuration : props.transitionDuration,
				stripHtmlInToc : props.stripHtmlInToc,
				bindClicks : props.bindClicks,
				bindMouseWheel : props.bindMouseWheel
			}, '', 18);

			done();
		}.bind(this));
	},

	app: function () {
		this.dest.mkdir('app');
		this.template('_index.html', 'app/index.html');
		this.template('_bower.json','bower.json');
		this.template('_package.json','package.json');
		if (this.csslint) {
			this.src.copy("csslintrc", ".csslintrc");
		}
	},

	generateGruntfile: function () {

		if (this.csslint) {
			this.gruntfile.insertConfig('csslint', JSON.stringify(
				{
					options: {
						csslintrc: '.csslintrc'
					},
					all : {
						src : ['app/**/*.css']
					}
				}
			));
			this.gruntfile.registerTask('validate', 'csslint');
      		this.gruntfile.loadNpmTasks('grunt-contrib-csslint');
		}

		if (this.livereload) {
			this.gruntfile.insertConfig('watch', JSON.stringify(
				{
					css : {
						files : ['app/**/*.css']
					}
				}
			));
			this.gruntfile.insertConfig('browserSync', JSON.stringify(
				{
					options: {
						watchTask: true,
						server: {
							baseDir: ".",
							index: 'app/index.html'
						}
					},
					dev : {
						bsFiles : {
							src : ['app/**/*.html', 'app/**/*.css', 'app/**/*.js']
						}
					}
				}
			));
			this.gruntfile.registerTask('serve', ['browserSync', 'watch']);
			this.gruntfile.loadNpmTasks('grunt-contrib-watch');
			this.gruntfile.loadNpmTasks('grunt-browser-sync');
		}

	},

	installDeps : function () {
		if (!this.options['skip-install']) {
			this.installDependencies();
		}
	}

});

module.exports = RubanGenerator;
