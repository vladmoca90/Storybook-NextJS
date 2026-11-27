'use client';

import { createContext, useContext, useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { fetchApiData, type ApiData } from './api';

const DataContext = createContext<Partial<ApiData>>({});

export function useApiData<K extends keyof ApiData>(key: K): ApiData[K] {
  const value = useContext(DataContext)[key];
  if (value === undefined) throw new Error(`Missing API boundary for ${key}`);
  return value;
}

export function ApiBoundary<K extends keyof ApiData>({ name, url, children }: { name: K; url: string; children: ReactNode }) {
  const parent = useContext(DataContext);
  const [data, setData] = useState<ApiData[K]>();
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchApiData(name, url, controller.signal).then(value => {
      if (!controller.signal.aborted) setData(value);
    }).catch((reason: unknown) => {
      if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Unable to load data');
    });
    return () => controller.abort();
  }, [name, url, attempt]);

  if (error) return <div role="alert" className="p-8"><p>{error}</p><button type="button" onClick={() => { setError(''); setAttempt(value => value + 1); }}>Try again</button></div>;
  if (data === undefined) return <p role="status" className="p-8">Loading {name.replaceAll('-', ' ')}…</p>;
  return <DataContext.Provider value={{ ...parent, [name]: data }}>{children}</DataContext.Provider>;
}

export function withApiData(Component: ComponentType, name: keyof ApiData, url: string) {
  function ApiProject() {
    return <ApiBoundary name={name} url={url}><Component /></ApiBoundary>;
  }
  ApiProject.displayName = `Api(${Component.displayName ?? Component.name})`;
  return ApiProject;
}
