module.exports = function (config) {
  config.set({

    frameworks: [
      'jasmine'
    ],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      }
    },

    browsers: ['ChromeHeadlessCI'],

    singleRun: true,
    autoWatch: false

  });
};