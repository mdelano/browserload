var require = patchRequire(require);

var resourcesTime = [];

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
 
casper.on('resource.received', function(resource) {
    var date_end = new Date();
 
    resourcesTime[resource.id]['end']  = date_end.getTime();
    resourcesTime[resource.id]['time'] = resourcesTime[resource.id]['end'] - resourcesTime[resource.id]['start'];
 
    /* to debug and compare */
    resourcesTime[resource.id]['id_received']  = resource.id;
    resourcesTime[resource.id]['url_received'] = resource.url;
 
});

exports.getLoadTimes = function() {
    return resourcesTime;
};