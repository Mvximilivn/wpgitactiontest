// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var plumber 		= require('gulp-plumber')
,	nunjucksRender 	= require('gulp-nunjucks-render')
,	data 			= require('gulp-data')
,   sass 			= require('gulp-sass')(require('sass'))
,	postcss 		= require('gulp-postcss')
,	sourcemaps 		= require('gulp-sourcemaps')
,	rename 			= require('gulp-rename')
,	autoprefixer 	= require('autoprefixer')
,	hoverFocus 		= require('postcss-hover-focus-visible')
,	browserify 		= require('browserify')
,	babelify   		= require('babelify')
,	uglify   		= require('gulp-uglify')
,	source     		= require('vinyl-source-stream')
,	buffer 			= require('vinyl-buffer')
,	file 			= require('file-system')
,	fs 				= require('fs');


var paths = {
	assets: '../assets',
	public: '../public',

	icomoon: 			'../assets/icomoon/symbol-defs.svg',
	icomoonSVG: 		'../assets/icomoon/SVG',
	icomoonDest: 		'../dist/icomoon',
	icomoonDestTwig: 	'../../templates/ui',

	scriptsWatchDir: 	'../assets/js/**/*',
	scriptsFile: 		'../assets/js/scripts.js',
	scriptsDest: 		'../dist/js/',

	stylesWatchDir: 	'../assets/scss/**/*',
	stylesFile: 		'../assets/scss/styles.scss',
	stylesDest: 		'../dist/css/',

	restsplainFile: 		'../assets/scss/restsplain.scss',
	restsplainDest: 		'../api-docs/',

	criticalStylesFile: '../assets/scss/criticalStyles.scss',
	criticalStylesFileDest: '../dist/css/criticalStyles.css',

	nunjucks: 			'../assets/nunjucks',
	nunjucksBuild: 		'../assets/nunjucks/pages/**/*.+(html|nunjucks|svg)',
	nunjucksTemplates: 	'../assets/nunjucks/templates',
	nunjucksPages: 		'../assets/nunjucks/pages',
	nunjucksDest: 		'../www',

	json: '../json',

	dest: '../dist',
	images: '../images',
};


// Icomoon symbol
gulp.task('icomoon', function() {
	console.log('Penser à retirer les style="fill: var(--color, #sgffgh)" sinon ça casse les vieux iPhone. Aller dans Icomoon et retirer la couleur de chaque icône avant de générer les svg.');
	return gulp.src(paths.icomoon)
		.pipe(plumber())
		.pipe(rename('symbol-defs.svg.twig'))
		.pipe(gulp.dest(paths.icomoonDest))
		.pipe(gulp.dest(paths.icomoonDestTwig));
});


// Nunjucks task which builds .html files from .nunjucks files
// With the data() pipe we can add datas to nunjucks files
// As an exemple we'll be able to use {% for city in frenchCities %} in the templates
// Here we get a json in our project folder
gulp.task('nunjucks', function() {
	return gulp.src(paths.nunjucksBuild)
		.pipe(plumber())
		/*.pipe( data(function(file){
			return {
				frenchCities: JSON.parse(fs.readFileSync(paths.json + '/french_cities.json'))
			}
		}) )*/
		.pipe(nunjucksRender( {
			path: [
				paths.nunjucksTemplates,
				paths.nunjucksPages,
				paths.icomoonDest,
				paths.icomoonSVG
			]
		} ))
		.pipe(gulp.dest(paths.nunjucksDest))
});

// Browserify : make require() works on the browser client-side
// Babelify : process script to make it works in a defined preset, like "ECMAScript 2015"
//            See `.babelrc` for the preset conf
gulp.task('browserify', function() {
	return browserify(paths.scriptsFile, {
			debug: true,
			paths: ['./node_modules']
		})
		.transform(babelify, {
			presets: ["@babel/preset-env"],
			sourceMaps: false
		})
		.bundle()
		.pipe(plumber())
		.pipe(source('scripts.js'))
		.pipe(buffer())
		// .pipe(sourcemaps.init({loadMaps: true}))
		// .pipe(uglify())
		// .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scriptsDest));
});
gulp.task('browserify-delivery', function() {
	return browserify(paths.scriptsFile, {
			debug: true,
			paths: ['./node_modules']
		})
		.transform(babelify, {
			presets: ["@babel/preset-env"],
			sourceMaps: true
		})
		.bundle()
		.pipe(plumber())
		.pipe(source('scripts.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scriptsDest));
});

// Restsplain plugin CSS
gulp.task('restsplain-css', function () {
	return gulp.src(paths.restsplainFile)
		.pipe(plumber())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss([
			autoprefixer(),
			hoverFocus({focusVisible: true, focus: false})
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.restsplainDest));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
	return gulp.src(paths.stylesFile)
		.pipe(plumber())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss([
			autoprefixer(),
			hoverFocus({focusVisible: true, focus: false})
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.stylesDest));
});

// Concatenate & Minify critical CSS (css to be inline)
gulp.task('critical-css', function () {
	return gulp.src(paths.criticalStylesFile)
		.pipe(plumber())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss([
			autoprefixer(),
			hoverFocus({focusVisible: true, focus: false})
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.stylesDest));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(paths.scriptsWatchDir, {interval: 1000, usePolling: true}, gulp.series('browserify'));
	gulp.watch(paths.stylesWatchDir, {interval: 1000, usePolling: true}, gulp.series('css'));

	//gulp.watch(paths.restsplainFile, {interval: 1000, usePolling: true}, gulp.series('restsplain-css'));

	gulp.watch(paths.icomoon, {interval: 1000, usePolling: true}, gulp.series('icomoon'));

	//gulp.watch(paths.nunjucksTemplates + '/**/*', {interval: 1000, usePolling: true}, gulp.series('nunjucks'));
	//gulp.watch(paths.nunjucksPages + '/**/*', {interval: 1000, usePolling: true}, gulp.series('nunjucks'));
});


// If you're using nunjucks you must add 'nunjucks' in 'default' task. Also uncomment the lines in the 'watch' task.

// Default Task
//gulp.task('default', gulp.series('icomoon', 'browserify', 'css', 'critical-css', 'restsplain-css', 'nunjucks', 'watch'));
gulp.task('default', gulp.series('icomoon', 'browserify', 'css', 'watch'));

gulp.task('delivery', gulp.series('icomoon', 'browserify-delivery', 'css', 'critical-css', 'restsplain-css'));
