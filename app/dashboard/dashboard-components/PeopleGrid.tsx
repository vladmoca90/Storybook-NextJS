import type { Person } from "@/app/data/types/people";
import { PersonCard } from './PersonCard';

type PeopleGridProps = {
  people: Person[];
};

export function PeopleGrid({ people }: PeopleGridProps) {
  return (
    <div className={`people-grid grid [grid-template-columns:repeat(auto-fill,_minmax(20rem,_1fr))] gap-[1.5rem] [@media(max-width:48rem)]:grid-cols-[1fr]`}>
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
