/**
    This script loads the quick link gallery page and records 
    the load times of the page itself as well as it's resources
**/


// Import dependencies
var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});

var utils  = require('utils');
var resourceTimer = require('../modules/resource-timer');
var pageTimer = require('../modules/page-timer');
var galleryAssets = require('../modules/mediasilo/quicklink-gallery-assets');

// Capture CLI args
var targetUrl = casper.cli.get('targetUrl')

var assets = [];

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
    assets = this.evaluate(galleryAssets.getAssets);
});

casper.run(function() {
    var result = {
        'pageTimer' : pageTimer.getLoadTime(),
        'resourceTimer' : resourceTimer.getLoadTimes() ,
        'assets' : assets
    }
    utils.dump(result);
    this.exit();

});