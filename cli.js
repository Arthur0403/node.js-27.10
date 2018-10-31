const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
  }
});

if(args.help) {
  console.log('HEEEELP');
}

console.log(args);