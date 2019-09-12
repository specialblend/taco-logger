const collectCoverageFrom = ['**/*.js', '**/*.jsx'];

const coverageThreshold = {
    global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
    },
};

const coveragePathIgnorePatterns = [
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
    '<rootDir>/support/',
    '<rootDir>/coverage/',
    '<rootDir>/jest.config.js',
    '<rootDir>/rollup.config.js',
];

const globalSetup = './__mocks__/env.js';
const setupFilesAfterEnv = ['./__mocks__/setup.js'];
const testEnvironment = 'node';

module.exports = {
    collectCoverageFrom,
    coverageThreshold,
    coveragePathIgnorePatterns,
    globalSetup,
    setupFilesAfterEnv,
    testEnvironment,
};
