import type { Preview } from '@storybook/nextjs-vite'
import { apiFixtures, fixtureFetch } from '../test-support/api-fixtures';

// Stories exercise the same asynchronous loading and validation as the app,
// with local API fixtures so a separate Next server is not required.
const originalFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, window.location.origin);
  const key = url.pathname.replace('/api/', '');
  return url.pathname.startsWith('/api/') && Object.hasOwn(apiFixtures, key)
    ? fixtureFetch(input, init)
    : originalFetch(input, init);
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
