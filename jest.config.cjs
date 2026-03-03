module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/src/test/styleMock.js',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/fileMock.js'
    }
};
