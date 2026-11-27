# Project data APIs

Each `route.ts` implements GET and returns `{ body, path, query, cookies }` with status 200. Local endpoints use `http://localhost:3000/api/<name>`:

| Endpoint | Consumer |
| --- | --- |
| `/api/airlines` | Departures board |
| `/api/cars` | Car search and car detail pages |
| `/api/countries` | Country explorer |
| `/api/currencies` | Currency dataset |
| `/api/people` | People directory |
| `/api/dashboard` | Dashboard's original sample people |
| `/api/products` | Discount shop |
| `/api/wines` | Wine shop |
| `/api/gothic` | Products, carousel slides and categories |
| `/api/medals` | Chart records, medal types and colours |
| `/api/cv` | Experience and skills |
| `/api/reading-pharmacies` | Pharmacy snapshot |
| `/api/quick-list` | Initial list items (empty by default) |

Project components declare a named URL, such as `airlinesUrl`. Browser URLs follow the current origin; `NEXT_PUBLIC_API_BASE_URL` can override the origin. Car detail pages fetch at request time and share the request between metadata and page rendering.

`lib/api.ts` defines response types, checks HTTP status, parses JSON as unknown, validates the envelope and every record, and extracts `body`. `lib/api-client.tsx` provides loading, errors, retry and request cancellation. Consumers only mount after validation, so their maps, filters, pagination and initial state use validated data. Quick-list edits remain local to the current session; its GET endpoint supplies initial items only.

Data modules are imported by routes. Client components only import types, enum definitions and standalone formatting/calculation helpers. Gothic slide text uses newline characters rather than React elements so it can be serialized as JSON.

Tests and Storybook mock the HTTP boundary with `test-support/api-fixtures.ts`; they still exercise response parsing and validation. Run `npm test -- --runInBand` for API contracts and project interactions.
