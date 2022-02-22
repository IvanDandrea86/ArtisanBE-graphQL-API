/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    testEnvironment: 'node',
    roots: [
      "<rootDir>/src"
    ],
    verbose:true,
    // https://jestjs.io/docs/ecmascript-modules
    transform: {},
    // https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/#use-esm-presets; 'manual configuration' didn't work
    preset: "ts-jest/presets/default-esm", // or other ESM presets
 
    setupFiles: ["./jest-setup-file.ts"],
    

}