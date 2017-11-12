/* eslint no-underscore-dangle: 0 */

/* ------------------------------------------ *\
    Select Degree
\* ------------------------------------------ */

/**
 * From the UCL timetable homepage enter the provided <degree, year> and then load
 * yearly timtable
 * @param  {Object.<string>} degreeInfo - degree and year
 * @returns {Function}
 */
const selectDegree = degreeInfo => browser =>
  browser
    .goto('https://timetable.ucl.ac.uk/')
    .inject('js', 'src/browser-scripts/vendor/jquery.js')
    .inject('js', 'src/browser-scripts/ucl-timetable.js')
    .click('a[href="#routeTimetSection"]')
    .type('#courseName', degreeInfo.degree)
    .type('#courseYear', '')
    .type('#courseYear', degreeInfo.year)
    .evaluate(() => window._NM.hasTimetable());



/* ------------------------------------------ *\
    Load Timetable from timetable homepage
\* ------------------------------------------ */

/**
 * After inserting degree and year, load timetable
 * @returns {Function}
 */
const loadTimetable = () => browser =>
  browser
    .click('#btnRunRouteTimet')
    .wait('#timetableContainer');



/* ------------------------------------------ *\
    Extract Degree Term Informatiom
\* ------------------------------------------ */

/**
 * From the timetable page get all the academic term weeks and dates
 * @returns {Function}
 */
const extractTermInfo = () => browser =>
  browser
    .inject('js', 'src/browser-scripts/vendor/jquery.js')
    .inject('js', 'src/browser-scripts/ucl-timetable.js')
    .evaluate(() => window._NM.toggleChangeDisplayTab())
    .wait('#yearCalendarWeekContainer .weekTermThree span')
    .evaluate(() => window._NM.getTermInfo());



/* ------------------------------------------ *\
    Select Timetable by week
\* ------------------------------------------ */

/**
 * Change to a given week's timetable page
 * @param  {number} week
 * @returns {Function}
 */
const selectWeek = week => browser =>
  browser
    .inject('js', 'src/browser-scripts/vendor/jquery.js')
    .inject('js', 'src/browser-scripts/ucl-timetable.js')
    .evaluate(() => {
      window._NM.removeTimetableCont();
      window._NM.toggleChangeDisplayTab();
    })
    .type('#weekRange', '')
    .type('#weekRange', week)
    .click('img.arrow')
    .wait('#timetableContainer tbody #trWeekday_Fri_0');



/* ------------------------------------------ *\
    Parse timetable
\* ------------------------------------------ */

/**
 * Get current the week's timetable from the page
 * @returns {Function}
 */
const parseTimetable = () => browser =>
  browser
    .inject('js', 'src/browser-scripts/vendor/jquery.js')
    .inject('js', 'src/browser-scripts/ucl-timetable.js')
    .evaluate(() => window._NM.parseCurrentWeeksTimetable());



/* -------------------------------------------------------------------------- *\
    Extend Nightmare Instance
\* -------------------------------------------------------------------------- */

/**
 * Extend Nightmare instance with custom UCL timetable scraping methods
 * @param  {Nightmare} nightmare
 */
const extendNightmareWithUCL = (nightmare) => {
  const uclMethods = [
    selectDegree,
    loadTimetable,
    extractTermInfo,
    selectWeek,
    parseTimetable,
  ];

  uclMethods.forEach((method) => {
    if (nightmare[method.name]) throw new Error(`${method.name} method alredy exists on Nightmare. Choose a different name.`);

    // eslint-disable-next-line
    nightmare[method.name] = (...args) => nightmare.use(method(...args));
  });
};


export default extendNightmareWithUCL;
