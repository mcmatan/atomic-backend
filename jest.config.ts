import type { Config } from '@jest/types';

process.env.DATABASE_URL='postgresql://prisma:prisma@localhost:5432/tests';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  automock: false,
  clearMocks: true,
  resetModules: true,
  testMatch: ['**/*.spec.ts'],
  testTimeout: 10000,
};

export default config;
