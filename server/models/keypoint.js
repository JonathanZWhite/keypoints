/*jslint node: true */
'use strict';

var Keypoint;
var KeypointSchema;
var TagSchema;
var _ = require('lodash-node');
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

TagSchema = new Schema({
    name: String
});

KeypointSchema = new Schema({
    created: { type : Date, default: Date.now },
    updated: { type : Date, default: Date.now },
    topic: { type : mongoose.Schema.ObjectId, ref : 'topic' },
    contentType: String,
    keypoint: String,
    image: String,
    user: { type : mongoose.Schema.ObjectId, ref : 'user' },
    tags: [TagSchema]
});

KeypointSchema.statics.add = add;
KeypointSchema.statics.edit = edit;
KeypointSchema.statics.get = get;
Keypoint = mongoose.model('keypoint', KeypointSchema);

function add(data, callback) {
    Keypoint.create(data, callback);
}

function edit(oldData, newData, callback) {
    var updated = _.extend(oldData, newData);
    updated.save(callback);
}

function get(data, callback) {
    Keypoint
        .find(data)
        .sort('created')
        .populate('topic')
        .exec(callback);
}

KeypointSchema.pre('save', function(next){
    this.updated = Date.now();
    next();
});

module.exports = Keypoint;
