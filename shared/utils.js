var utils = {
    removeUrlIdentifier: removeUrlIdentifier
};

function removeUrlIdentifier(url) {
    if (!url) return;
    return url.replace('http://', '').replace('https://', '').replace('www.', '');
}

module.exports = utils;
