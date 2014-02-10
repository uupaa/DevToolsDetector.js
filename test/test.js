new Test().add([
        testiOSDevToolsDetector,
    ]).run() /*.worker(function(err, test) {
        if (!err) {
            var undo = Test.swap(DevToolsDetector, DevToolsDetector_);

            new Test(test).run(function(err, test) {
                undo = Test.undo(undo);
            });
        }
    });
    */

function testiOSDevToolsDetector(next) {

    /*
    if (true) {
        console.log("testXxx ok");
        next && next.pass();
    } else {
        console.log("testXxx ng");
        next && next.miss();
    }
     */
    next && next.pass();


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

