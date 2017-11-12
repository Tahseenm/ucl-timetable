import { getTimetableOpts, getMode } from './helpers/cli-args';
import handleErrors from './helpers/handleErrors';
import config from '../config';
import reporter from './helpers/progress-reporter';
import getNightmareBrowser from './nightmare';
import { saveDegreeTimetable } from './helpers/save-timetable';
import getTimetable from './getTimetable';


/* ------------------------------------------ *\
    Pre Scraping
\* ------------------------------------------ */

/** Get User input from terminal */
const mode = getMode();
const { degree, year } = getTimetableOpts();

/** Show loading spinner in Terminal */
reporter.start();

/** Setup a Nightmare instance with its configuration */
const browser = getNightmareBrowser(config.nightmare(mode));



/* ------------------------------------------ *\
    Scrape Timetable
\* ------------------------------------------ */

(async function main(degreeInfo) {
  const timetable = await getTimetable(browser, degreeInfo, reporter);

  if (!timetable) {
    reporter
      .stopSpinner()
      .logNoTimetable(degreeInfo);
    process.exit();
  }

  reporter.savingData();
  await browser.end();
  saveDegreeTimetable(timetable, degreeInfo);

  reporter
    .stopSpinner()
    .logTimeTaken()
    .notify();
}({ degree, year }))
  .catch(handleErrors);
