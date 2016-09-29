const sinon = require('sinon');
const chai = require("chai");
const expect = chai.expect;
chai.use(require('sinon-chai'));

const Event = require('.');

describe('Syntax', function() {
    it('should do on without error', function() {
        function fn() {
            Event.on('foo');
        }
        expect(fn).to.not.throw();
    });
    it('should do off without error', function() {
        function fn() {
            Event.off('foo');
            Event.off();
            Event.off('foo', function() {});
        }
        expect(fn).to.not.throw();
    });
    it('should do trigger without error', function() {
        function fn() {
            Event.trigger('foo');
            Event.trigger('foo', function() {});
        }
        expect(fn).to.not.throw();
    });
    it('should support chaining syntax', function() {
        function fn() {
            Event.on('foo').off('foo').trigger('foo');
        }
        expect(fn).to.not.throw();
    });
});

describe('.on(), .off(), .trigger()', function() {
    beforeEach(function() {
        Event.off();
    });
    it('should trigger when registered', function() {
        var spy = sinon.spy();
        Event.on('foo', spy).trigger('foo');
        expect(spy).to.have.been.called;
    });
    it('should pass Event Object when calling handlers', function() {
        var spy = sinon.spy();
        Event.on('foo', spy).trigger('foo');
        expect(spy).to.have.been.calledWithMatch({
            type: 'foo',
            timeStamp: sinon.match.date
        });
    });
    it('should support multiple handlers for the same event', function() {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        Event.on('foo', spy1).on('foo', spy2).trigger('foo');
        expect(spy1).to.have.been.called;
        expect(spy2).to.have.been.called;
    });
    it('should call event handlers in the registered order', function() {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        Event.on('foo', spy1).on('foo', spy2).trigger('foo');
        expect(spy1).to.have.been.calledBefore(spy2);
    });
    it('should support off by event name', function() {
        var spy = sinon.spy();
        Event.on('foo', spy).off('foo').trigger('foo');
        expect(spy).to.not.have.been.called;
    });
    it('should support off all', function() {
        var spy = sinon.spy();
        Event.on('foo', spy).off().trigger('foo');
        expect(spy).to.not.have.been.called;
    });
    it('should support off by handler', function() {
        var spy1 = sinon.spy(),
            spy2 = sinon.spy();
        Event.on('foo', spy1).on('foo', spy2).off('foo', spy1).trigger('foo');
        expect(spy1).to.not.have.been.called;
        expect(spy2).to.have.been.called;
    });
});

describe('construction and parameters', function() {
    it('should accept an event Object when trigger', function() {
        var e = new Event('booom!');
        var spy = sinon.spy();
        Event.on('booom!', spy).trigger(e);
        expect(spy).to.have.been.called;
    });
    it('should pass parameters when trigger', function() {
        var spy = sinon.spy();
        Event.on('foo', spy).trigger('foo', ['bar', 'coo!']);
        expect(spy).to.have.been.calledWithMatch({
            type: 'foo'
        }, 'bar', 'coo!');
    });
});

