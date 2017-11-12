import terminalSpinner from 'ora';
import color from 'chalk';
import logSymbols from 'log-symbols';
import notifier from 'node-notifier';
import { sample, partial } from 'lodash';

import humanizeTime from '../utils/humanizeTime';


/**
 * Get a random ora terminal spinner color
 * @returns {string} spinner color
 */
const randomColor = partial(
  sample,
  ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'],
);


/**
 * Keep the user updated using the cli and OS notifications
 */
const reporter = {
  startTime: null,
  spinner:   null,

  start() {
    this.startTime = Date.now();
    this.spinner = terminalSpinner('Selecting degree').start();

    return this;
  },

  scrapingAllTermDates({ degree, year }) {
    const detail = color.bold.white(`${degree} [year ${year}]`);
    this.spinner.text = `Scraping Academic Term Dates for ${detail}`;
    this.spinner.color = 'magenta';

    return this;
  },

  scrapingWeeksTimetable(term, week, { degree, year }) {
    const randColor = color.bold[randomColor()];

    const detail = color.bold.white(`${degree} [year ${year}] Term ${randColor(term)} Week ${randColor(week)}`);
    this.spinner.text = `Scraping Timetable for ${detail}`;
    this.spinner.color = randomColor();

    return this;
  },

  timetableDone({ degree, year }) {
    const detail = color.bold.white(`${degree} [year ${year}]`);
    this.spinner.text = `Finished loading timetable for ${detail}`;

    this.spinner
      .succeed()
      .start();
    this.spinner.text = 'Loading';

    return this;
  },

  timetableError({ degree, year }) {
    this.spinner.text = `Error loading timetable for ${degree} [year ${year}]`;
    this.spinner
      .fail()
      .start();
    this.spinner.text = 'Loading';

    return this;
  },

  savingData() {
    this.spinner.text = 'Saving Timetable Data as a JSON file';

    return this;
  },

  stopSpinner() {
    this.spinner.stop();

    return this;
  },

  logTimeTaken() {
    const timeTaken = Date.now() - this.startTime;
    console.log(color.green(`✨  Done in ${humanizeTime(timeTaken)}`));

    return this;
  },

  notify() {
    notifier.notify({
      title: 'UCL Timetable Scrape',
      message: 'Check the `timetables` Directory for the JSON file',
      sound: 'Ping',
    });

    return this;
  },

  logNoTimetable({ degree, year }) {
    console.error(logSymbols.error, `No timetable found for ${degree} [year ${year}]`);
  },
};


export default reporter;
