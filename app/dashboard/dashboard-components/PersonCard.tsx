import type { Person } from '@/app/data/people';

type PersonCardProps = {
  person: Person;
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

export function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="person-card">
      <div className="person-card-header">
        <div className="person-avatar">{getInitials(person.name)}</div>
        <h3 className="person-name">{person.name}</h3>
      </div>

      <div className="person-detail">
        <span className="detail-label">Age:</span>
        <span className="detail-value">{person.age} years</span>
      </div>

      <div className="person-detail">
        <span className="detail-label">Job:</span>
        <span className="detail-value">{person.job}</span>
      </div>

      <div className="person-detail">
        <span className="detail-label">Nationality:</span>
        <span className="detail-value">{person.nationality}</span>
      </div>

      <div className="person-detail">
        <span className="detail-label">Status:</span>
        <span className={`detail-value status ${person.maritalStatus}`}>
          {person.maritalStatus.charAt(0).toUpperCase() + person.maritalStatus.slice(1)}
        </span>
      </div>
    </div>
  );
}
