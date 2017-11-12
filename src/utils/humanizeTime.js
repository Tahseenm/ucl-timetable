import pluralize from 'pluralize';


/**
 * Get human readable time
 * @example
 *   // returns 2 minutes 1 second
 * humaizeTime(120001)
 * @param  {number} milisecs
 * @returns {string}
 */
const humanizeTime = (milisecs) => {
  const s = Math.round(milisecs / 1000) % 60;
  const m = Math.round(milisecs / (60 * 1000)) % 60;
  const h = Math.round(milisecs / (60 * 60 * 1000)) % 24;

  let timeTaken = '';
  timeTaken += h ? `${h} ${pluralize('hour', h)} `   : '';
  timeTaken += m ? `${m} ${pluralize('minute', m)} ` : '';
  timeTaken += s ? `${s} ${pluralize('second', s)} ` : '';

  return timeTaken;
};


export default humanizeTime;
