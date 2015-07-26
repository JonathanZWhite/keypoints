var utils = {
    removeUrlIdentifier: removeUrlIdentifier
};

function removeUrlIdentifier(url) {
    return url.substr(url.indexOf('://') + 3 );
}

module.exports = utils;
