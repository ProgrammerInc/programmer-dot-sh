module.exports = {
  displayName: 'api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  "reporters": [
    "default",
    [
      "jest-html-reporter",
      {
        "pageTitle": "<programmer>._ API Test Report",
        "outputPath": "../../coverage/apps/api/index.html"
      }
    ]
  ]
};
