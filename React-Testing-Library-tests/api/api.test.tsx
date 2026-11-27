import { fireEvent, render, screen } from '@testing-library/react';
import { fetchApiData, parseApiResponse, type ApiData } from '@/lib/api';
import { ApiBoundary, useApiData } from '@/lib/api-client';
import { apiFixtures, fixtureResponse } from '@/test-support/api-fixtures';

describe('API contracts', () => {
  it.each(Object.keys(apiFixtures) as (keyof ApiData)[])('validates the %s dataset', key => {
    expect(parseApiResponse(key, fixtureResponse(key))).toEqual(apiFixtures[key]);
    expect(() => parseApiResponse(key, { body: apiFixtures[key] })).toThrow('Invalid');
    expect(() => parseApiResponse(key, { ...fixtureResponse(key), body: null })).toThrow('Invalid');
  });

  it('rejects malformed records and unknown enum values before filtering', () => {
    const car = apiFixtures.cars[0];
    for (const invalid of [{ ...car, price: 'free' }, { ...car, fuel: 'Water' }, { ...car, features: [null] }]) {
      expect(() => parseApiResponse('cars', { ...fixtureResponse('cars'), body: [invalid] })).toThrow('Invalid');
    }
  });

  it('rejects HTTP failures', async () => {
    jest.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 503 } as Response);
    await expect(fetchApiData('cars', '/api/cars')).rejects.toThrow('503');
  });

  it('shows loading, prevents malformed data reaching consumers, and retries', async () => {
    jest.mocked(fetch).mockResolvedValueOnce({ ok: true, json: async () => ({ body: 'invalid' }) } as Response);
    function Cars() {
      const cars = useApiData('cars');
      return <p>{cars.length} cars loaded</p>;
    }
    render(<ApiBoundary name="cars" url="/api/cars"><Cars /></ApiBoundary>);
    expect(screen.getByRole('status')).toHaveTextContent('Loading cars');
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid cars API response');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByText(`${apiFixtures.cars.length} cars loaded`)).toBeInTheDocument();
  });

  it('accepts empty lists and cancels requests on unmount', async () => {
    expect(parseApiResponse('cars', { ...fixtureResponse('cars'), body: [] })).toEqual([]);
    jest.mocked(fetch).mockImplementationOnce(() => new Promise(() => {}));
    const { unmount } = render(<ApiBoundary name="cars" url="/api/cars"><p>Loaded</p></ApiBoundary>);
    const signal = jest.mocked(fetch).mock.calls[0][1]?.signal;
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});
