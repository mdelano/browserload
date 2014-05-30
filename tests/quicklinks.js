/**
    This script loads the quick link gallery page and records 
    the load times of the page itself as well as it's resources
**/


// Import dependencies
var casper = require('casper').create({
    verbose: true,
    logLevel: 'warning'
});

var utils  = require('utils');
var resourceTimer = require('../modules/resource-handler');
var pageTimer = require('../modules/page-timer');
var galleryAssets = require('../modules/mediasilo/quicklink-gallery-assets');

// Capture CLI args
var targetUrl = casper.cli.get('targetUrl')
var resourceLoadThreshold = casper.cli.get('resourceLoadThreshold') == null ? 1000 : casper.cli.get('resourceLoadThreshold')

var assets = [];

casper.start(targetUrl, function() {
    casper.viewport(1600, 700);
    casper.wait(5000, function() {
        var FPfilename = '/home/mike/browserautomation/fp.png';
        //this.captureSelector(FPfilename, 'body');
    });
});

casper.then(function() {
    // aggregate results for the gallery assets
    assets = this.evaluate(galleryAssets.getAssets);
});

casper.run(function() {
    var result = {
        'pageTimer' : pageTimer.getLoadTime(),
        'resourceTimer' : resourceTimer.getSlowLoadTimes(resourceLoadThreshold) ,
        'assets' : assets
    }

    // Log any slow load times
    var slowResourceTimerLength = result.resourceTimer.length;
    for (var i = 0; i < slowResourceTimerLength; i++) {
        var logLevel = 'warning';
        if(!result.resourceTimer[i].status || result.resourceTimer[i].status >= 400) {
            logLevel = 'error';  
        }
        casper.log('The resource at ' + result.resourceTimer[i].url + ' was too slow: ' + result.resourceTimer[i].time + 'ms. Returned ' + result.resourceTimer[i].status, logLevel);
    }

    this.exit();
});
