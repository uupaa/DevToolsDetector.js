var ModuleTestDevToolsDetector = (function(global) {

var _inNode    = "process"        in global;
var _inWorker  = "WorkerLocation" in global;
var _inBrowser = "document"       in global;

return new Test("DevToolsDetector", {
        disable:    false,
        browser:    true,
        worker:     false,
        node:       false,
        button:     false,
        both:       false,
    }).add([
        testiOSDevToolsDetector,
    ]).run().clone();

function testiOSDevToolsDetector(next) {

    next && next.pass();

    var lastState = null; // true is detected

    function _proceed() {
        var spec = new Spec();

        DevToolsDetector(spec, function(err, yes) {
            var currentState = yes ? true : false;

            if (lastState !== currentState) {
                document.body.style.backgroundColor = currentState ? "yellow" : "blue";
                lastState = currentState;
            }
            setTimeout(_proceed, 2 * 1000);
        });
    }
    if (this.document) {
        _proceed();
    }
}

})((this || 0).self || global);

