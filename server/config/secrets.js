var config = {
	local: {
		port: process.env.PORT || 3000,
		mongoDB: process.env.MONGODB || 'mongodb://localhost:27017/portfolio-generator',
		github: {
			clientId: 'd727d15b77a4d3a01158',
			clientSecret: '305daf57c3b266f68ac9f932a64930205a1823c0'
		},
		linkedin: {
			clientId: '753ulgwtls4jdr',
			clientSecret: 'hl7yFwrqYsdZSUq8',
			callbackUrl: 'http://local-inventive.io:3000/api/linkedin/callback'
		},
		domain: 'local-inventive.io'
	},
	staging: {
		port: 9001,
		mongoDB: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/portfolio-generator',
		github: {
			clientId: '30e37859defd93ca4f0f',
			clientSecret: '6ce119a62b4313a3b67a08545df1dbc8f978ebbf'
		},
		linkedin: {
			clientId: '753ulgwtls4jdr',
			clientSecret: 'hl7yFwrqYsdZSUq8',
			callbackUrl: 'http://staging.inventive.io:9001/api/linkedin/callback'
		},
		domain: 'staging.inventive.io'
	},
	production: {
		port: 80,
		mongoDB: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/portfolio-generator',
		github: {
			clientId: '0d4b1f2056169b736e4f',
			clientSecret: 'd1a10bc32951a93f38b6f28feb8ad543052f104b'
		},
		linkedin: {
			clientId: '753ulgwtls4jdr',
			clientSecret: 'hl7yFwrqYsdZSUq8',
			callbackUrl: 'http://inventive.io/api/linkedin/callback'
		},
		domain: 'inventive.io'
	}
};

exports.config = function() {
	var node_env = process.env.NODE_ENV || 'local';
	return config[node_env];
};
