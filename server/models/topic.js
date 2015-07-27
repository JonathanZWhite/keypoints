/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var Topic;

var TopicSchema = new Schema({
    url: String,
    title: String,
    image: String,
    description: String,
    user: { type : mongoose.Schema.ObjectId, ref : 'user' }
});

TopicSchema.statics.make = make;

function make(payload, callback) {
    Topic.create(payload, callback);
}

Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;
