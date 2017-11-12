const config = Object.freeze({
  /**
   * @param {string} mode
   * @returns {object} - Nightmare config object
   */
  nightmare(mode) {
    const defaultConf = {
      /** 5 minutes */
      waitTimeout: (5 * 60 * 1E3),
      gotoTimeout: (5 * 60 * 1E3),
    };

    /** Show Electron browser while scraping in Debug Mode */
    const debugConf = {
      show: true,
      openDevTools: true,
      width:  1140,
      height:  720,

      /** 60 minutes */
      waitTimeout: (60 * 60 * 1E3),
      gotoTimeout: (60 * 60 * 1E3),
    };

    return mode === 'debug'
      ? debugConf
      : defaultConf;
  },
});


export default config;
