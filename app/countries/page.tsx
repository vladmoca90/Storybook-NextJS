import type { Metadata } from 'next';
import CountriesExplorer from './components/CountriesExplorer';

export const metadata: Metadata = {
  title: 'Europe Atlas | Countries, Capitals & Population',
  description: 'Explore every country in Europe with flags, capitals, and population estimates.',
};

export default function CountriesPage() {
  return <CountriesExplorer />;
}
