import Nightmare from 'nightmare';
import extendWithCustomUclMethods from './extend-nightmare';


/**
 * Get a Nightmare instance extended with UCL methods
 * @param  {object} config - Nightmare configuration
 * @returns {Nightmare}
 */
export default function getNightmareBrowser(config) {
  const browser = Nightmare(config);
  extendWithCustomUclMethods(browser);

  return browser;
}
