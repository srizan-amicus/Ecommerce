import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",

  testEnvironment: "jsdom",

  extensionsToTreatAsEsm: [".ts", ".tsx"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.test.json",
      },
    ],
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testMatch: ["**/src/__tests__/**/*.test.ts?(x)"],

  clearMocks: true,

  collectCoverageFrom: [
    "src/components/Product/ProductCard.tsx",
    "src/components/Cart/Cart.tsx",
    "src/hooks/useCart.ts",
  ],

  coverageDirectory: "coverage",

  coverageReporters: ["text", "lcov"],
};

export default config;
