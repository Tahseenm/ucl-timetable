/* eslint no-restricted-syntax: 0, no-continue: 0, no-await-in-loop: 0 */

import handleErrors from './helpers/handleErrors';
import config from '../config';
import reporter from './helpers/progress-reporter';
import { saveTimetable } from './helpers/save-timetable';
import getTimetable from './getTimetable';
import { getMode } from './helpers/cli-args';
import getNightmareBrowser from './nightmare';

import uclTimetable from '../timetables/ucl-timetable.json';


/* ------------------------------------------ *\
    Pre Scraping
\* ------------------------------------------ */

/** Show loading spinner in Terminal */
reporter.start();

/** Configuration for Nightmare constructor created given mode (--debug) from user input */
const nightmareConfig = config.nightmare(getMode());



/* ------------------------------------------ *\
    Scrape UCL Timetable
\* ------------------------------------------ */

/**
 * Timetable for every degree programme offered by UCL
 * @type {Promise<>}
 */
const fullTimetableScrape = (async function main() {
  /** Setup a Nightmare instance with its configuration */
  let browser = getNightmareBrowser(nightmareConfig);

  /** Get the Timetable for every degree programme offered by UCL */
  const degreeNameList = Object.keys(uclTimetable.degrees);
  for (const degreeName of degreeNameList) {
    const currDegree = uclTimetable.degrees[degreeName];

    /** @example `BA Ancient History` */
    const degree = `${currDegree.qualification} ${currDegree.degreeProgramme}`;
    const { duration } = currDegree;

    /** Get the Timetable for every year of degree programme */
    for (let year = 1; year <= duration; year += 1) {
      /** Timetable has already been scraped */
      if (currDegree.timetable.years[year] !== 'pending') continue;

      try {
        /** Save timetable right after scraping it */
        const timetable = await getTimetable(
          browser,
          { degree, year },
          reporter,
        );

        uclTimetable.degrees[degreeName].timetable.years[year] = timetable;
        saveTimetable(uclTimetable);
      } catch (err) {
        /** On failure retry again for given degree & year */
        browser = getNightmareBrowser(config.nightmare(getMode()));
        year -= 1;
        reporter.timetableError({ degree, year }, err);
      }
    }
  }

  /** End nightmare browser after finishing scraping timetable */
  await browser.end();
}()).catch(handleErrors);



/* ------------------------------------------ *\
    Post Scraping
\* ------------------------------------------ */

(async function postScrape() {
  /** Full UCL timetable is fully scraped */
  await fullTimetableScrape;

  reporter
    .stopSpinner()
    .logTimeTaken()
    .notify();
}()).catch(handleErrors);
