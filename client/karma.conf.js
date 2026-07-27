module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular'
    ],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      jasmine: {}
    },

    reporters: ['progress'],

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

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
    autoWatch: false,

    restartOnFileChange: false
  });
};