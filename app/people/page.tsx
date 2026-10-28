import type { Metadata } from 'next';
import PeopleDirectory from './PeopleDirectory';

export const metadata: Metadata = {
  title: 'People directory',
  description: 'Browse 20 fictional people, ten at a time.',
};

export default function PeoplePage() {
  return <PeopleDirectory />;
}
