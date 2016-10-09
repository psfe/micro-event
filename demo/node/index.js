var Emitter = require('../..');
var emitter = Emitter();

emitter
    .on('boom!', function(e){
        console.log(e.type, e.timeStamp);
    })
    .trigger('boom!')
    .trigger(new Emitter.Event('boom!'));

emitter
    .on('ha!', function(e, foo, bar){
        console.log(e.type, foo, bar);
    })
    .trigger('ha!', ['foo', 'bar']);
