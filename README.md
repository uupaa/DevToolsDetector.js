=========
DevToolsDetector.js
=========

Detect DevTools.

# Document

- https://github.com/uupaa/DevToolsDetector.js/wiki/DevToolsDetector

and 

- https://github.com/uupaa/WebModule and [slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
- https://github.com/uupaa/Help.js and [slide](http://uupaa.github.io/Slide/slide/Help.js/index.html)

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/DevToolsDetector.js.git
    $ cd DevToolsDetector.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`

