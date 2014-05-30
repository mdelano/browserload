/****************************************
	Thanks to https://gist.github.com/oloynet/4740069

	This module is responsible for capturing load times 
	for any resource requested a page
*****************************************/

var require = patchRequire(require);

exports.getAssets = function() {
    var assets = document.querySelectorAll('.ttWrapper');
    return Array.prototype.map.call(assets, function(e) {
        return e.getAttribute('data-original-title');
    });
};