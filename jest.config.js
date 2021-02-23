const { mergeDeepRight } = require('ramda');

module.exports = mergeDeepRight(require('@centreon/frontend-core/jest'), {
  roots: ['<rootDir>/www/front_src/src/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/setupTest.js',
  ],
  testEnvironment: 'jest-environment-jsdom-sixteen',
});
