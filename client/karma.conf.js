process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: [
      'jasmine'
    ],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-first-run',
          '--no-default-browser-check'
        ]
      }
    },

    browsers: [
      'ChromeHeadlessCI'
    ],

    singleRun: true,

    autoWatch: false,

    browserDisconnectTimeout: 10000,

    browserDisconnectTolerance: 1,

    browserNoActivityTimeout: 10000,

    captureTimeout: 10000,

    reporters: [
      'progress'
    ]

  });
};