var utils = {
    removeUrlIdentifier: removeUrlIdentifier
};

function removeUrlIdentifier(url) {
    return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '');
}

module.exports = utils;
