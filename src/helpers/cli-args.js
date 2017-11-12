import yargs from 'yargs';
import color from 'chalk';
import logSymbols from 'log-symbols';
import { isUndefined as isUndef } from 'lodash';


/**
 * @returns {string | null}
 */
export const getMode = () => (yargs.argv.debug ? 'debug' : null);


/**
 * Get and Validate command line options. When Invalid arguments are given
 * display a error message
 * @returns {Object} - Degree & year
 */
export const getTimetableOpts = () => {
  const { degree, year } = yargs.argv;
  const isInvalidYear = yr => yr < 1 || yr > 6;

  if (isUndef(degree) || isUndef(year) || isInvalidYear(year)) {
    console.error(`
${logSymbols.error} Timetable Argument Error
${color.red('Please provide a valid UCL Degree and Year to get the Timetable')}`);
    process.exit(1);
  }

  return { degree, year };
};
