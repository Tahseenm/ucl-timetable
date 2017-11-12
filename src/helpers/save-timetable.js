import jsonFs from 'jsonfile';


/**
 * Save timtable to disk as a JSON File
 * @param  {object} timetable
 * @param  {Object.<string>} degreeInfo
 */
export const saveDegreeTimetable = (timetable, degreeInfo) => {
  const { degree, year } = degreeInfo;

  // @example-file-ouput: BSc-Neuroscience_year-1.json
  const fileName = `${degree.replace(' ', '-')}_year-${year}`;
  jsonFs.writeFileSync(
    `timetables/degree/${fileName}.json`,
    timetable,
    { spaces: 2 },
  );
};

/**
 * Save whole UCL timtable to disk as a JSON File
 * @param  {object} timetable
 */
export const saveTimetable = (timetable) => {
  jsonFs.writeFileSync(
    'timetables/ucl-timetable.json',
    timetable,
    { spaces: 2 },
  );
};
