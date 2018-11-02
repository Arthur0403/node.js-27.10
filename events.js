const EventEmitter = require('events').EventEmitter;

class Kettle extends EventEmitter {
  constructor() {
    super();

    process.nextTick(() => {this.emit('created');});
  }

  start() {
    setTimeout(() => {
      this.emit('ready');
    }, 1000);
  }
}

const k = new Kettle();

k.on('created', () => {
  console.log('Чайник создался');
});

k.start();

k.on('ready', (event) => {
  console.log('Чайник скипел');
});

setTimeout(() => { console.log('setTimeout') }, 0);
setImmediate(() => { console.log('setImmediate') });
process.nextTick(() => { console.log('process.nextTick') });