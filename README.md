=========
DevToolsDetector.js
=========

![](https://travis-ci.org/uupaa/DevToolsDetector.js.png)

Detect DevTools.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [DevToolsDetector.js wiki](https://github.com/uupaa/DevToolsDetector.js/wiki/DevToolsDetector)


# How to use

```js
<script src="lib/Spec.js">
<script src="lib/UserAgent.js">
<script src="lib/DevToolsDetector.js">
<script>

    var spec = UserAgent(Spec());
    var lastState = null; // true is detected

    function _proceed() {
        DevToolsDetector(spec, function(err, yes) {
            var currentState = yes ? true : false;

            if (lastState !== currentState) {
                document.body.style.backgroundColor = currentState ? "yellow" : "blue";
                lastState = currentState;
            }
            setTimeout(_proceed, 2 * 1000);
        });
    }
    _proceed();

</script>
```
