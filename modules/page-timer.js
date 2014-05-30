/****************************************
	This module is responsible for capturing load times 
	for any resource requested a page
*****************************************/

var require = patchRequire(require);

var pageTime = {};

/**
    Event handler for the beginning of a page load
**/
casper.on('load.started', function() {
    var date_start = new Date();
    pageTime.start = date_start.getTime();
});

/**
    Event handler for the completion of a page load
    *** This does not account for asynch calls such as resource loads and XHR requests
**/
casper.on('load.finished', function() {
    var date_finish = new Date();
    pageTime.finish = date_finish.getTime();
    pageTime.time = pageTime.finish = pageTime.start;
});

exports.getLoadTime = function() {
    return pageTime;
};