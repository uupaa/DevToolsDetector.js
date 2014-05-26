(function(global) {

// --- dependency module -----------------------------------
var Blob = global["Blob"] || global["webkitBlob"];
var URL  = global["URL"]  || global["webkitURL"];

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;
var _workerScoreCache = 0;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function DevToolsDetector(spec,       // @arg SpecObject - spec.OS.TYPE
                          callback) { // @arg Function   - callback(err:Error, has:Boolean)
    if (spec["OS"]["TYPE"] === "iOS") {
        _has_iOSDevTools(callback);
    } else {
        callback(null, false);
    }
}

DevToolsDetector["repository"] = "https://github.com/uupaa/DevToolsDetector.js";

// --- implement -------------------------------------------
function _has_iOSDevTools(callback) {

    var task = new Task(2, function(err, buffer) {
        if (err) {
            callback(err, false);
        } else {
            var hasDevTools = Math.abs(buffer[0] - buffer[1]) >= 10000;

            callback(null, hasDevTools);
        }
    });

    if (_workerScoreCache) {
        task["push"](_workerScoreCache)["pass"]();
    } else {
        _getWorkerScore(function(err, score, time) {
            _workerScoreCache = score;
            task["push"](score)["done"](err);
        });
    }
// keep
//        _getIFrameScore(function(err, score, time) {
//            task["set"]("iframe", score)["done"](err);
//        });
    _getScore(function(err, score, time) {
        task["push"](score)["done"](err);
    });
}

// --- for Browser -----------------------------------------
function _getScore(callback) {
    function _recursive(i) {
        return _recursive(score = ++i);
    }
    var time = Date.now();
    var score = 0;
    try { _recursive(0); } catch (err) {}

    callback(null, score, Date.now() - time);
}

// --- for WebWorkers --------------------------------------
function _getWorkerScore(callback) {
    var script = _inlineWorkerSource();
    var blob = new Blob([ script ], { "type": "text/javascript" });
    var src = URL["createObjectURL"](blob);
    var worker = new Worker(src);

    worker["onmessage"] = function(event) {
        URL["revokeObjectURL"](src); // [!] GC
        callback(null, event["data"]["score"], event["data"]["time"]);
    };
    worker["postMessage"]();
}

function _inlineWorkerSource() {
    return '\
onmessage = function(event) {\
    function _getScore(callback) {\
        function _recursive(i) {\
            return _recursive(score = ++i);\
        }\
        var time = Date.now();\
        var score = 0;\
        try { _recursive(0); } catch (err) {}\
\
        callback(null, score, Date.now() - time);\
    }\
\
    _getScore(function(err, score, time) {\
        self.postMessage({ "from": "worker", "score": score, "time": time });\
    });\
};'
}

// --- for iframe ------------------------------------------
/* keep
function _getIFrameScore(callback) {
    var iframe = document.createElement("iframe");

    function _handleMessageEvent(event) {
        global.removeEventListener("message", _handleMessageEvent);
        document.head.removeChild(iframe);

        if (event.data.from === "iframe") {
            callback(null, event.data.score, event.data.time);
        }
    }
    global.addEventListener("message", _handleMessageEvent);

    document.head.appendChild(iframe);
    iframe.contentWindow.document.writeln( _inlineIFrameSource() );
}

function _inlineIFrameSource() {
    return '\
<body><script>' + _getScore + ';\
    _getScore(function(err, score, time) {\
        parent.window.postMessage({ "from": "iframe", "score": score, "time": time }, "*");\
    });\
</script></body>';
}
 */

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = DevToolsDetector;
}
global["DevToolsDetector" in global ? "DevToolsDetector_" : "DevToolsDetector"] = DevToolsDetector; // switch module. http://git.io/Minify

})((this || 0).self || global);

