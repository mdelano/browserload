/****************************************
	Thanks to https://gist.github.com/oloynet/4740069

	This module is responsible for capturing load times 
	for any resource requested a page
*****************************************/

var require = patchRequire(require);

// We'll use this as a register for all 
// of our resource load times
var resourcesTime = [];

/**
	Event handler for any time a page resource is requested 
	(js, XHR, images, etc...)
**/
casper.on('resource.requested', function(resource) {
    var date_start = new Date();
 
    resourcesTime[resource.id] = {
        'id': resource.id,
        'id_received': '', /* to debug */
        'start': date_start.getTime(),
        'end': -1,
        'time': -1,
        'status': resource.status,
        'url': resource.url,
        'url_received': '' /* to debug */
    }
});
 
/**
	Event handler for any time a resource has been returned
**/
casper.on('resource.received', function(resource) {
    var date_end = new Date();
 
    resourcesTime[resource.id]['end']  = date_end.getTime();
    resourcesTime[resource.id]['time'] = resourcesTime[resource.id]['end'] - resourcesTime[resource.id]['start'];
 
    /* to debug and compare */
    resourcesTime[resource.id]['id_received']  = resource.id;
    resourcesTime[resource.id]['url_received'] = resource.url;
    resourcesTime[resource.id]['status'] = resource.status;
 
});

exports.getLoadTimes = function() {
    return resourcesTime;
};

exports.getSlowLoadTimes = function(threshHold) {
	var slowResourceTimes = [];

	var arrayLength = resourcesTime.length;
	slowResourceTimesCurrentIndex = 0;
	for (var i = 0; i < arrayLength; i++) {
		if(resourcesTime[i] && resourcesTime[i].time > threshHold) {
			slowResourceTimes[slowResourceTimesCurrentIndex] = resourcesTime[i];
			slowResourceTimesCurrentIndex++;
		}

		else if(resourcesTime[i] && resourcesTime[i].time == -1) {
			slowResourceTimes[slowResourceTimesCurrentIndex] = resourcesTime[i];
			slowResourceTimesCurrentIndex++;
		}
	}
    return slowResourceTimes;
};