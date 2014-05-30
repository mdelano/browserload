var assets = [];
var casper = require('casper').create();
var targetUrl = casper.cli.get('targetUrl')

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
    // echo results in some pretty fashion
    this.echo(assets.length + ' assets found:');
    this.echo(' - ' + assets.join('\n - ')).exit();
});