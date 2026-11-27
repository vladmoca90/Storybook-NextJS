import "@testing-library/jest-dom";
import { fixtureFetch } from './test-support/api-fixtures';

beforeEach(() => {
  globalThis.fetch = jest.fn(fixtureFetch);
});
