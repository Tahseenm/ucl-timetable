/* eslint global-require: 0 */
const cliArgv = require('yargs').argv;


/** Use ES6 modules + async functions */
require('babel-register')({
  presets: [
    ['env', { targets: { node: 'current' } }],
  ],
});

/** Run app */
if (cliArgv.all) require('./src/all.js');
else             require('./src/single.js');
