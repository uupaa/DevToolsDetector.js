var ModuleTest = (function(global) {

return new Test({
        disable:    false,
        node:       false,
        browser:    true,
        worker:     false,
        button:     false,
        both:       false,
        primary:    global["DevToolsDetector"],
        secondary:  global["DevToolsDetector_"],
    }).add([
        testiOSDevToolsDetector,
    ]).run().clone();

function testiOSDevToolsDetector(next) {

    next && next.pass();

    var lastState = null; // true is detected

    function _proceed() {
        var spec = UserAgent(Spec());

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

