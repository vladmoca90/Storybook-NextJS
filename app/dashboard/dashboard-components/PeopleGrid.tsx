import type { Person } from '@/app/data/people';
import { PersonCard } from './PersonCard';

type PeopleGridProps = {
  people: Person[];
};

export function PeopleGrid({ people }: PeopleGridProps) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
