var assets = [];
var resourcesTime = [];
var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});
var utils  = require('utils');

var targetUrl = casper.cli.get('targetUrl')

casper.on('load.started', function(err) {
    casper.log("started");
});

casper.on('load.started', function(err) {
    casper.log("finished");
});

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

function getAssets() {
    var assets = document.querySelectorAll('.ttWrapper');
    return Array.prototype.map.call(assets, function(e) {
        return e.getAttribute('data-original-title');
    });
}

casper.start(targetUrl, function() {
    casper.viewport(1600, 700);
    casper.wait(5000, function() {
        this.echo("Loaded QL gallery page");
        var FPfilename = '/home/mike/browserautomation/fp.png';
        this.captureSelector(FPfilename, 'body');
        this.echo('snapshot taken');
    });
});

casper.then(function() {
    // aggregate results for the gallery assets
    assets = this.evaluate(getAssets);
});

casper.run(function() {
    utils.dump(resourcesTime);
    // echo results in some pretty fashion
    this.echo(assets.length + ' assets found:');
    this.echo(' - ' + assets.join('\n - ')).exit();

});