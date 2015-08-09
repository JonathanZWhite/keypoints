// revealing module see:
// http://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript
var Store = (function() {
    var store = {
        getKeypoint: getKeypoint,
        setKeypoint: setKeypoint
    };
    var _keypoint = null;

    return store;

    function getKeypoint() {
        return _keypoint;
    }

    function setKeypoint(keypoint) {
        _keypoint = keypoint;
    }
}());

module.exports = Store;
