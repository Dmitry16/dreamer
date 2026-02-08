module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)", "<rootDir>/src/**/*.spec.(ts|tsx)"],
  setupFiles: ["<rootDir>/jest.setup.cjs"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        useESM: true
      }
    ]
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"]
};
