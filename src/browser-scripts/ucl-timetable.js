/* eslint strict: 0, no-use-before-define: 0, no-underscore-dangle: 0 */

(function UCL() {
  'use strict';

  /**
   * Determine current Javascript enviroment
   * @returns {string}
   */
  const getEnv = () => {
    if (
      typeof exports === 'object' &&
      exports !== null &&
      typeof exports.nodeName !== 'string'
    ) return 'Node';

    if (
      typeof window === 'object' &&
      typeof document === 'object'
    ) return 'Browser';

    return null;
  };

  /**
   * Node
   */
  if (getEnv() === 'Node') {
    module.exports = {
      hasTimetable,
      toggleChangeDisplayTab,
      getTermInfo,
      removeTimetableCont,
      parseCurrentWeeksTimetable,
    };
  }

  /**
   * Browser
   */
  let $;
  if (getEnv() === 'Browser') {
    const global = window;

    /** `jQuery` does not exist in node */
    $ = global.jQuery;

    /** Attach UCL functions to a namespace */
    global._NM = {
      toggleChangeDisplayTab,
      getTermInfo,
      removeTimetableCont,
      parseCurrentWeeksTimetable,
      hasTimetable,
    };
  }



  /* ------------------------------------------ *\
      #hasTimetable
  \* ------------------------------------------ */

  /**
   * A invalid degree / year input causes submit button to remain disabled
   * @returns {boolean}
   */
  function hasTimetable() {
    const timetableAvailable = !$('#btnRunRouteTimet').hasClass('disable');
    return timetableAvailable;
  }



  /* ------------------------------------------ *\
      #ToggleChangeDisplayTab
  \* ------------------------------------------ */

  /** @HACK Clicking `Change Display` tab on the timetable page doesn't change tab */
  function toggleChangeDisplayTab() {
    $('#chngDispDrop').removeClass('hide');
    $('#chngDispDrop').css('display', 'block');
  }



  /* ------------------------------------------ *\
      #GetTermInfo
  \* ------------------------------------------ */

  /**
   * For a given term week element from timetable calendar get embedded start/end
   * dates and week number
   * @param  {number} idx
   * @param  {HTMLElement} weekElement
   * @returns {Object.<string, number>} - Term Week Dates
   */
  const scrapeTermWeekInfo = (idx, weekElement) => {
    let [_weekIdx, _weekDateRange] = weekElement.childNodes;
    _weekIdx       = parseInt(_weekIdx.data, 10);
    _weekDateRange = _weekDateRange.innerText.split(' - ');

    const week = _weekIdx;
    const [startDate, endDate] = _weekDateRange;

    return { startDate, endDate, week };
  };

  /**
   * Scrape Academic Term dates from Timetable page for degree
   * @returns {object} - Term dates
   */
  function getTermInfo() {
    const $termCont  = $('#yearCalendarWeekContainer');
    const $termOne   = $('.weekTermOne',   $termCont);
    const $termTwo   = $('.weekTermTwo',   $termCont);
    const $termThree = $('.weekTermThree', $termCont);

    /** Get all Term weeks */
    const termInfo = {};
    termInfo.one   = Array.from($termOne.map(scrapeTermWeekInfo));
    termInfo.two   = Array.from($termTwo.map(scrapeTermWeekInfo));
    termInfo.three = Array.from($termThree.map(scrapeTermWeekInfo));

    return termInfo;
  }



  /* ------------------------------------------ *\
      #RemoveTimetableCont
  \* ------------------------------------------ */

  /**
   * @HACK Required to detect timetable is loaded when changing from week to week
   * since it is loaded dynamically
   */
  function removeTimetableCont() {
    $('#timetableContainer').remove();
  }



  /* ------------------------------------------ *\
      #ParseCurrentWeeksTimetable
  \* ------------------------------------------ */

  /**
   * Get Module ID's from jQuery object
   * @param {jQuery} $moduleIDs - from popup
   * @returns {string[]}
   */
  const getModuleIDs = ($moduleIDs) => {
    const moduleIDs = Array.from($moduleIDs.map((_, e) => e.innerText));
    return moduleIDs;
  };

  /**
   * Get Module names from jQuery object
   * @param {jQuery} $moduleNames - from popup
   * @returns {string[]}
   */
  const getModuleNames = ($moduleNames) => {
    const moduleNames = $moduleNames.text().split(' / ');
    return moduleNames;
  };

  /**
   * Get class day and time from jQuery object
   * @param {jQuery} $time - from popup
   * @returns {string[]} - day of Week and start/end time
   */
  const getTime = ($time) => {
    const time = $time.text().split(', ');
    return time;
  };

  /**
   * Get lecturers from jQuery object
   * @param {jQuery} $lecturers - from popup
   * @returns {string[]}
   */
  const getLecturers = ($lecturers) => {
    if ($lecturers.text() === 'Missing lecturer name') return false;

    const lecturers = $lecturers.text()
      .split('), ')
      .map(l => (l.slice(-1) !== ')' ? `${l})` : l));

    return lecturers;
  };

  /**
   * Get last modified day and time for class time change
   * @param {jQuery} $lastModified - from popup
   * @returns {Object.<string>}
   */
  const getLastModified = ($lastModified) => {
    const [day, time] = $lastModified.text().split(' ');
    return { day, time };
  };

  /**
   * Match Module ID's with module names
   * @param {string[]} ids
   * @param {string[]} names
   * @returns {Array<{}>}
   */
  const getModules = (ids, names) => {
    if (ids.length === names.length) {
      const getNameForModuleId = (id, idx) => ({ id, name: names[idx] });
      return ids.map(getNameForModuleId);
    }

    if (ids.length > 1 && names.length === 1) {
      return ids.map(id => ({ id, name: names[0] }));
    }

    return ids.concat(names);
  };

  /**
   * Scrape class information from the popup after clicking cell element
   * @param {number} idx
   * @param {HTMLElement} classCellElem - that will be clicked
   * @returns {Object}
   */
  const getClassInfo = (idx, classCellElem) => {
    /** Clicking class shows a modal which contains all information */
    classCellElem.click();

    const $popupTitle = $('#popup_title');
    const $popupBody  = $('#popup_body');

    /** Elements containing the class information to parse */
    const $type         = $('.evname', $popupTitle);
    const $moduleIDs    = $('.moduleLink', $popupTitle);
    const $moduleNames  = $('.title', $popupBody);
    const $time         = $('.time', $popupBody);
    const $lecturers    = $('dt:contains(lecturer)', $popupBody).next();
    const $room         = $('dt:contains(room)', $popupBody).next();
    const $lastModified = $('dt:contains(last modified date)', $popupBody).next();

    /** Get class content from HTML element nodes */
    const type         = $type.text();
    const [day, time]  = getTime($time);
    const lecturers    = getLecturers($lecturers);
    const room         = $room.text();
    const lastModified = getLastModified($lastModified);
    const modules      = getModules(getModuleIDs($moduleIDs), getModuleNames($moduleNames));

    /** Close Popup modal */
    $('.close .a_popup_close').click();

    const classInfo = {
      type,
      modules,
      day,
      time,
      lecturers,
      room,
      lastModified,
    };

    return classInfo;
  };

  /**
   * Scrape current weeks timtable
   * @returns {Array<{}>}
   */
  function parseCurrentWeeksTimetable() {
    const $classes = $('.cell');
    const timetable = Array.from($classes.map(getClassInfo));

    return timetable.length > 0 ? timetable : 'No Classes';
  }
}());
