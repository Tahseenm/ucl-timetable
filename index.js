/* eslint global-require: 0 */
const cliArgv = require('yargs').argv;


/** Use ES6 modules + async functions */
require('babel-register')({
  plugins: [
    'transform-es2015-modules-commonjs',
    'transform-async-to-generator',
  ],
});

/** Run app */
if (cliArgv.all) require('./src/all.js');
else             require('./src/single.js');
