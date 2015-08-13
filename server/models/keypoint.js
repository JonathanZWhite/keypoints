/*jslint node: true */
'use strict';

var async = require('async');
var Keypoint;
var KeypointSchema;
var TagSchema;
var _ = require('lodash-node');
var mongoose =  require('mongoose');
var errorhandler = require('../utils').errorhandler;
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
KeypointSchema.statics.getDistinct = getDistinct;
KeypointSchema.statics.updateField = updateField;
Keypoint = mongoose.model('keypoint', KeypointSchema);

function add(data, callback) {
    Keypoint.create(data, callback);
}

function edit(oldData, newData, callback) {
    var updated = _.extend(oldData, newData);
    updated.save(callback);
}

/**
 * ## Get
 * Finds all keypoints that matches query
 * @param {object} data
 * @param {Function} callback
 */
function get(data, callback) {
    Keypoint
        .find(data)
        .sort('created')
        .populate('topic')
        .exec(callback);
}

function getDistinct(data, field, callback) {
    Keypoint
        .find(data)
        .distinct(field)
        .exec(callback);
}

/**
 * ## UpdateField
 * updates specific field of a keypoint
 * @param  {Integer} keypointId
 * @param  {Object} data
 * @param  {String} field
 * @param  {Function} callback
 */
function updateField(keypointId, data, field, callback) {
    var tasks;

    function getKeypoint(next) {
        Keypoint.findById(keypointId, function(err, keypoint) {
            if (err) return errorhandler(err);
            next(null, keypoint);
        });
    }

    function updateKeypoint(keypoint, next) {
        keypoint[field] = data;
        keypoint.save(function(err, updatedKeypoint) {
            if (err) return errorhandler(err);
            next(null, updatedKeypoint);
        });
    }

    tasks = [
        getKeypoint,
        updateKeypoint
    ];

    async.waterfall(tasks, function(err, results) {
        if (err) return errorhandler(err);
        callback(results);
    });
}

KeypointSchema.pre('save', function(next){
    this.updated = Date.now();
    next();
});

module.exports = Keypoint;
