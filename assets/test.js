function testiOSDevToolsDetector() {
    var spec = Device(Spec());
    var lastState = false; // true is detected

    function _proceed() {
        DevToolsDetector(spec, function(err, yes) {
            if (err) {
                ;
            } else {
                var currentState = yes ? true : false;

                if (lastState !== currentState) {
                    document.body.style.backgroundColor = currentState ? "yellow" : "blue";
                    lastState = currentState;
                }
                setTimeout(_proceed, 1000); // after 1000 ms
            }
        });
    }
    _proceed();
}

window.addEventListener("load", testiOSDevToolsDetector);

