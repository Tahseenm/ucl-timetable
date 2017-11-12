import color from 'chalk';
import logSymbols from 'log-symbols';

import reporter from './progress-reporter';


/** Handle errors and log to console */
const handleErrors = (error) => {
  reporter.stopSpinner();

  console.error(logSymbols.error, 'Search Failed');
  console.error(color.red(error));

  process.exit(1);
};


export default handleErrors;
