const sinon = require('sinon');
const chai = require("chai");
const expect = chai.expect;
chai.use(require('sinon-chai'));

const Emitter = require('.');

describe('Emitter', function() {
    var emitter = Emitter();
    it('on should not throw when callback empty', function() {
        function fn() {
            emitter.on('foo');
        }
        expect(fn).to.not.throw();
    });
    it('off should not throw with arbitrary arguments', function() {
        function fn() {
            emitter.off('foo');
            emitter.off();
            emitter.off('foo', function() {});
        }
        expect(fn).to.not.throw();
    });
    it('trigger should not throw with arbitrary arguments', function() {
        function fn() {
            emitter.trigger('foo');
            emitter.trigger('foo', function() {});
        }
        expect(fn).to.not.throw();
    });
    it('should support chaining syntax', function() {
        function fn() {
            emitter.on('foo').off('foo').trigger('foo');
        }
        expect(fn).to.not.throw();
    });
    it('should not conflict', function(){
        var emitter1 = new Emitter();
        var emitter2 = new Emitter();
        var spy = sinon.spy();
        emitter1.on('foo', spy);
        emitter2.trigger('foo');
        expect(spy).to.not.have.been.called;
    });
    it('should support mixin', function() {
        var obj = {};
        var spy = sinon.spy();
        Emitter.mixin(obj, ['on', 'off', 'trigger']);
        obj.on('foo', spy).trigger('foo');
        expect(spy).to.have.been.called;
    });
});

describe('Event', function() {
    var emitter = Emitter();
    it('should accept an event Object when trigger', function() {
        var e = new Emitter.Event('booom!');
        var spy = sinon.spy();
        emitter.on('booom!', spy).trigger(e);
        expect(spy).to.have.been.called;
    });
    it('should pass parameters when trigger', function() {
        var spy = sinon.spy();
        emitter.on('foo', spy).trigger('foo', ['bar', 'coo!']);
        expect(spy).to.have.been.calledWithMatch({
            type: 'foo'
        }, 'bar', 'coo!');
    });
});

describe('basic event triggering', function() {
    var emitter = Emitter();
    beforeEach(function() {
        emitter.off();
    });
    it('should trigger when registered', function() {
        var spy = sinon.spy();
        emitter.on('foo', spy).trigger('foo');
        expect(spy).to.have.been.called;
    });
    it('should pass Event Object when calling handlers', function() {
        var spy = sinon.spy();
        emitter.on('foo', spy).trigger('foo');
        expect(spy).to.have.been.calledWithMatch({
            type: 'foo',
            timeStamp: sinon.match.date
        });
    });
    it('should support multiple handlers for the same event', function() {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        emitter.on('foo', spy1).on('foo', spy2).trigger('foo');
        expect(spy1).to.have.been.called;
        expect(spy2).to.have.been.called;
    });
    it('should call event handlers in the registered order', function() {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        emitter.on('foo', spy1).on('foo', spy2).trigger('foo');
        expect(spy1).to.have.been.calledBefore(spy2);
    });
    it('should support off by event name', function() {
        var spy = sinon.spy();
        emitter.on('foo', spy).off('foo').trigger('foo');
        expect(spy).to.not.have.been.called;
    });
    it('should support off all', function() {
        var spy = sinon.spy();
        emitter.on('foo', spy).off().trigger('foo');
        expect(spy).to.not.have.been.called;
    });
    it('should support off by handler', function() {
        var spy1 = sinon.spy(),
            spy2 = sinon.spy();
        emitter.on('foo', spy1).on('foo', spy2).off('foo', spy1).trigger('foo');
        expect(spy1).to.not.have.been.called;
        expect(spy2).to.have.been.called;
    });
});

