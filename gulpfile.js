var $ = 					require('gulp-load-plugins')({ lazy: true });
var fs =					require('fs');
var gulp = 					require('gulp');
var LessPluginCleanCSS = 	require('less-plugin-clean-css');
var merge = 				require('merge-stream');
var path = 					require('path');
var spawn = 				require('child_process').spawn;
var del = 					require('del');
var config = 				require('./gulp.config')();
var templateCache = 		require('gulp-angular-templatecache');

var colors = $.util.colors;
var env = process.env.NODE_ENV || 'production';

gulp.task('build', ['watch'], function() {
	log('Building...');

	var msg = {
        title: 'Gulp Build',
        subtitle: 'Deployed to the build folder',
        message: 'You. are. awesome.'
    };

    log(msg);
    notify(msg);
});

gulp.task('vet', function() {
    log('Analyzing source with JSHint');

    return gulp
        .src(config.alljs)
        .pipe($.print())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('autotest', function(done) {
	startTest(false /* singeRun */, done);
});

gulp.task('autotest-node', function() {
	gulp.watch(config.nodeTestWatchFiles, ['node-test'])
		.on('change', changeEvent);
});

gulp.task('node-test', function () {
    return gulp
    	.src(config.nodeTestFiles, { read: false })
        .pipe($.mocha({ reporter: 'nyan' }));
});

gulp.task('clean-copy', function(done) {
    clean('client/dist/*.html', done);
});
gulp.task('copy', ['clean-copy'], function() {
	log('Copying index.html...');

	var index = gulp
		.src(['client/src/app/index.html'])
		.pipe(gulp.dest('client/dist/'));

	var themeScripts = gulp
		.src('server/views/libs/**.js')
		.pipe(gulp.dest('client/dist/public'));

	return merge(index, themeScripts);
});

gulp.task('bower', function() {
	return $.bower()
		.pipe(gulp.dest('lib/'));
});

gulp.task('clean-concat', function(done) {
    clean('client/dist/public/app.js', done);
});
gulp.task('concat', ['clean-concat', 'templatecache'], function() {
	log('Concatinating files...');

	return gulp
		.src(config.jsOrder)
		// .pipe($.ngAnnotate())
		// .pipe($.uglify({
		// 	mangle: false
		// }))
		.pipe($.concat('app.js'))
		.pipe(gulp.dest('client/dist/public'));
});

gulp.task('clean-images', function(done) {
    clean('client/dist/assets/images', done);
});
gulp.task('images',['clean-images'], function() {
	log('Copying images...');

	var backgrounds = gulp
		.src('client/src/assets/images/backgrounds/full/*')
		.pipe(gulp.dest('client/dist/assets/images/backgrounds/full'));

	var platform = gulp
		.src([
			'client/src/assets/images/platform/*',
			'client/src/assets/images/templates/*'
		])
		.pipe(gulp.dest('client/dist/assets/images/platform'));

	return merge(backgrounds, platform);
});

gulp.task('clean-templatecache', function(done) {
    clean('client/tmp/templates.js', done);
});
gulp.task('templatecache', ['clean-templatecache'], function() {
    log('Creating $templateCache...');

    return gulp
        .src([
        	'client/src/app/**/*.tpl.html',
			'client/src/app/**/**/*.tpl.html',
			'client/src/app/**/**/**/*.tpl.html',
			'client/src/components/**/*.tpl.html'
        ])
    	.pipe($.minifyHtml({ conditional: true, spare: true }))
        .pipe(templateCache('templates.js', {
        	module: 'app.core'
        }))
        .pipe(gulp.dest('client/tmp/'));
});

gulp.task('clean-less', function(done) {
    clean('client/dist/public/*.css', done);
});
gulp.task('less', function() {
	log('Compiling less...');

	var main = gulp
		.src('client/src/less/main.less')
		.pipe($.less())
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('client/dist/public'));

	var reset = gulp
		.src('client/src/less/reset.less')
		.pipe($.less())
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('client/dist/public'));

	return merge(main, reset);
});

gulp.task('serve', function() {
	$.nodemon({
		script: 'server/app.js',
		ignore: [
			'client/user/**'
		]
	});
});

gulp.task('watch', ['vet', 'all'], function() {
	gulp.watch('./gulpfile.js', ['reload']);

	gulp.watch([
		'client/src/*.js',
		'client/src/**/*.js',
		'client/src/**/**.js',
		'client/src/**/**/**/*.js'
	], ['concat'])
		.on('change', changeEvent);

	gulp.watch([
		'client/src/**/*.less',
		'client/src/**/**/*.less',
		'client/src/**/**/**/*.less'
	], ['less'])
		.on('change', changeEvent);

	gulp.watch([
		'server/views/**/assets/css/*.less'
	], ['less-server'])
		.on('change', changeEvent);

	gulp.watch(['client/src/app/index.html','server/views/libs/**.js'], ['copy'])
		.on('change', changeEvent);

	gulp.watch([
		'client/**/**/*.tpl.html',
		'client/**/**/*tpl.html',
		'client/**/**/**/*.tpl.html'
	], ['templatecache', 'concat'])
		.on('change', changeEvent);
});

/**
 * Log a message or series of messages using chalk's green color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}

/**
 * Show OS level notification using node-notifier
 */
function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        conseventImage: path.join(__dirname, 'gulp.png'),
        time: 5000,
        icon: path.join(__dirname, 'gulp.png')
    };
    // _.assign(notifyOptions, options);
    // notifier.notify(notifyOptions);
}

function startTest(singleRun, done) {
    var karma = require('karma').server;

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !!singleRun
    }, karmaCompleted);


    function karmaCompleted(karmaResult) {
        log('Karma completed');

        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    // var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    // log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

gulp.task('reload', ['bower', 'copy', 'images', 'concat', 'less', 'less-server']);
gulp.task('all', ['bower', 'copy', 'images', 'concat', 'less', 'serve']);
gulp.task('default', ['build']);
