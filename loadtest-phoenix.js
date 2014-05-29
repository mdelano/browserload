// Read the Phantom webpage '#intro' element text using jQuery and "includeJs"

var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open("https://p-api.mediasilo.com/v3/status", function(status) {
    if ( status === "success" ) {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
            page.evaluate(function() {
                console.log("$(document).text() -> " + $(document).text());
            });
            phantom.exit();
        });
    }
});

