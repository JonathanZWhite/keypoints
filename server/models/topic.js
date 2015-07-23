/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var TopicSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    title: String
});

TopicSchema.statics.make = make;

function make(payload, callback) {
    this.create(payload, callback);
}

module.exports = mongoose.model('topic', TopicSchema);
