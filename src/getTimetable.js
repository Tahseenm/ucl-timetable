/* eslint no-restricted-syntax: 0, no-await-in-loop: 0 */
import handleErrors from './helpers/handleErrors';


/**
 * Scrape timetable for a given UCL Programme
 * @param  {Nightmare} browser
 * @param  {Object.<string, number>}  degreeInfo - Degree Programme and year
 * @param  {Object} reporter
 * @returns {Promise<>}
 */
const getTimetable = async (browser, degreeInfo, reporter) => {
  try {
    /** Exit early if timetable doesn't exist for given degree & year */
    const hasTimetable = await browser.selectDegree(degreeInfo);
    if (!hasTimetable) return null;

    reporter.scrapingAllTermDates(degreeInfo);
    const terms = await browser
      .loadTimetable()
      .extractTermInfo();

    /** For each academic week in all three terms scrape the timetable */
    for (const term of ['one', 'two', 'three']) {
      const currTerm = terms[term];

      for (let i = 0; i < currTerm.length; i += 1) {
        const currAcademicWeek = currTerm[i];

        reporter.scrapingWeeksTimetable(term, currAcademicWeek.week, degreeInfo);

        const currentWeeksTimetable = await browser
          .selectWeek(currAcademicWeek.week)
          .parseTimetable();
        currAcademicWeek.timetable = currentWeeksTimetable;
      }
    }

    reporter.timetableDone(degreeInfo);

    return { terms };
  } catch (err) {
    handleErrors(err);
    return null;
  }
};


export default getTimetable;
