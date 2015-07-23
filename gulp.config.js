module.exports = function() {
	var clientApp = './client/src';
    var serverApp = './server';

	var config = {
		alljs: [
			'./gulpfile.js',
	    	clientApp + '/**/*.js',
	    	clientApp + '/**/**/*.js',
	    	clientApp + '/**/**/**/*.js',
	    	clientApp + '/**/**/**/**/*.js'
		],
		jsOrder: [
			'client/src/app/*.module.js',
			'client/src/app/**/*.module.js',
			'client/src/app/**/**/*.module.js',
			'client/src/app/**/**/**/*.module.js',
			'client/src/**/**/*.module.js',

			'client/src/app/*.js',
			'client/tmp/*.js',
			'client/src/app/**/*.js',
			'client/src/app/**/**/*.js',
			'client/src/app/**/**/**/*.js',
			'client/src/**/**/*.js',
			'!client/src/app/**/*.spec.js'
		],
        nodeTestWatchFiles: [
            './gulpfile.js',
            serverApp + '/**.js',
            serverApp + '/**/**.js'
        ],
        nodeTestFiles: [
            './gulpfile.js',
            serverApp + '/**.test.js',
            serverApp + '/**/**.test.js',
        ]
	};

	config.karma = getKarmaOptions();

	function getKarmaOptions() {
        var options = {
            files: [
            	'./lib/angular/angular.js',
  				'./lib/angular-mocks/angular-mocks.js',
	            clientApp + '/**/*.js',
		    	clientApp + '/**/**/*.js',
		    	clientApp + '/**/**/**/*.js',
		    	clientApp + '/**/**/**/**/*.js'
            ],
            exclude: [],
            coverage: {
                dir: 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    // reporters supporting the `file` property, use `subdir` to directly
                    // output them in the `dir` directory.
                    // omit `file` to output to the console.
                    // {type: 'cobertura', subdir: '.', file: 'cobertura.txt'},
                    // {type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt'},
                    // {type: 'teamcity', subdir: '.', file: 'teamcity.txt'},
                    //{type: 'text'}, //, subdir: '.', file: 'text.txt'},
                    { type: 'text-summary' } //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };
        // options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];

        return options;
	}

	return config;
};
