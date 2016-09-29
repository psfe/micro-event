var Event = require('../..');

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
