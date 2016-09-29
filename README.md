# logger

[![NPM version](https://img.shields.io/npm/v/micro-event.svg?style=flat)](https://www.npmjs.org/package/micro-event)
[![Build Status](https://travis-ci.org/psfe/micro-event.svg?branch=master&foo)](https://travis-ci.org/psfe/micro-event)
[![Coverage Status](https://coveralls.io/repos/github/psfe/micro-event/badge.svg?branch=master&foo)](https://coveralls.io/github/psfe/micro-event?branch=master)
[![Dependency manager](https://img.shields.io/david/psfe/micro-event.svg?style=flat)](https://david-dm.org/psfe/micro-event)

## Installation

### Node.js

```bash
npm install micro-event
```

### Browser

```html
<script src="dist/micro-event.min.js"></script>
```

## Usage

### Node.js

```javascript
var Event = require('micro-event');

Event
    .on('boom!', function(e){
        console.log(e.type, e.timeStamp);
    })
    .trigger('boom!')
    .trigger(new Event('boom!'));

Event
    .on('ha!', function(e, foo, bar){
        console.log(e.type, foo, bar);
    })
    .trigger('ha!', ['foo', 'bar']);
```

A demo can be found [here](demo/node).
 
### AMD

[dist/micro-event](dist/micro-event.min.js) supports AMD envirenment,
as long as loaded into your HTML:

```javascript
require(['MicroEvent'], function(Event) {
    Event.on('...').off('...');
});
```

A demo can be found [here](demo/browser/amd.html).
 
### Global Object

[dist/micro-event](dist/micro-event.min.js) **will** export a
`window.MicroEvent` object if there's no `require` or `module` defined.

```javascript
var Event = window.MicroEvent;
Event.on('...').off('...');
```

A demo can be found [here](demo/browser/global.html).

## API

### new MicroEvent(eventType)

* `eventType`: Required, `String`, the event type to be created.

Create and returns a `MicroEvent` instance of the specified `eventType`.

### .on(eventType, handler)

* `eventType`: Required, `String`, the event type to be triggered.
* `handler`: Required, `Function`, the handler to be called when event occurs.

Register a handler to the event specified by `eventType`.

### .trigger(eventType[, extraParameters])

* `eventType`: Required, `String`, the event type to be triggered.
* `extraParameters`: Optional, `Array`, extra params passed to the `handler` above.

Trigger the event specified by `eventType`, and optionaly pass `extraParameters` to the `handler`.

### .trigger(event[, extraParameters])

* `event`: Required, `Event`, the `MicroEvent` instance to be triggered.
* `extraParameters`: Optional, `Array`, extra params passed to the `handler` above.

Trigger the `event`, and optioanly pass `extraParameters` to the `handler`.

### .off()

Clear all event handlers for all event types.

### .off(eventType [, handler])

* `eventType`: Required, `String`, the event type to `off`.
* `handler`: Optional, `Function`, the handler to `off`.

Remove the `handler` for the event specified by `eventType`.
If `handler` is `undefined`, MicroEvent clears all handlers for the `eventType`.

