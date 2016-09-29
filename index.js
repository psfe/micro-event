(function() {
    var events = {};

    function Event(type) {
        this.type = type;
        this.timeStamp = new Date();
    }

    Event.on = function(type, handler) {
        if (events.hasOwnProperty(type)) {
            events[type].push(handler);
        } else {
            events[type] = [handler];
        }
        return Event;
    };

    Event.off = function(type, handler) {
        if (arguments.length === 0) {
            return _offAll();
        }
        if (handler === undefined) {
            return _offByType(type);
        }
        return _offByHandler(type, handler);
    };

    Event.trigger = function(event, args) {
        if (!(event instanceof Event)) {
            event = new Event(event);
        }
        return _dispatch(event, args);
    };

    function _dispatch(event, args) {
        if (!events.hasOwnProperty(event.type)) return;
        args = args || [];
        args.unshift(event);

        var handlers = events[event.type] || [];
        handlers.forEach(handler => handler.apply(null, args));
        return Event;
    }

    function _offByHandler(type, handler) {
        if (!events.hasOwnProperty(type)) return;
        var i = events[type].indexOf(handler);
        if (i > -1) {
            events[type].splice(i, 1);
        }
        return Event;
    }

    function _offByType(type) {
        if (events.hasOwnProperty(type)) {
            delete events[type];
        }
        return Event;
    }

    function _offAll() {
        events = {};
        return Event;
    }


    // CommonJS
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Event;
    }
    // Browser
    else if (typeof define === 'function' && define.amd) {
        define('MicroEvent', [], function() {
            return Event;
        });
    } else {
        window.MicroEvent = Event;
    }
})();
