new Test().add([
        testiOSDevToolsDetector,
    ]).run(function(err, test) {
        if (0) {
            err || test.worker(function(err, test) {
                if (!err && typeof DevToolsDetector_ !== "undefined") {
                    var name = Test.swap(DevToolsDetector, DevToolsDetector_);

                    new Test(test).run(function(err, test) {
                        Test.undo(name);
                    });
                }
            });
        }
    });

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

