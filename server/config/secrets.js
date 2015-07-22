module.exports = {
	local: {
		port: process.env.PORT || 3000,
		mongoDB: process.env.MONGODB || 'mongodb://localhost:27017/keypoints'
	},
	staging: {
		port: 9001,
		mongoDB: process.env.MONGOHQ_URL || 'mongodb://localhost/keypoints',
	},
	production: {
		port: 80,
		mongoDB: process.env.MONGOHQ_URL || 'mongodb://localhost/keypoints'
	}
}[process.env.NODE_ENV || 'local'];
