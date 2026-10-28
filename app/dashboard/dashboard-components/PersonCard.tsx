import type { Person } from "@/app/data/types/people";

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
    <div className={`person-card border-[0.0625rem] rounded-[0.5rem] p-[1.5rem]`}>
      <div className={`person-card-header flex items-center gap-[1rem] mb-[1rem] pb-[1rem] border-b-[0.125rem]`}>
        <div className={`person-avatar w-[3rem] h-[3rem] rounded-[50%] flex items-center justify-center shrink-[0]`}>{getInitials(person.name)}</div>
        <h3 className={`person-name m-[0]`}>{person.name}</h3>
      </div>

      <div className={`person-detail flex justify-between items-start [padding:0.75rem_0] [@media(max-width:48rem)]:flex-col [@media(max-width:48rem)]:gap-[0.25rem]`}>
        <span className={`detail-label min-w-[7.5rem]`}>Age:</span>
        <span className={`detail-value text-right max-w-[8.75rem] [&.status]:inline-block [&.status]:[padding:0.25rem_0.75rem] [&.status]:rounded-[0.75rem] [@media(max-width:48rem)]:text-left [@media(max-width:48rem)]:max-w-[none]`}>{person.age} years</span>
      </div>

      <div className={`person-detail flex justify-between items-start [padding:0.75rem_0] [@media(max-width:48rem)]:flex-col [@media(max-width:48rem)]:gap-[0.25rem]`}>
        <span className={`detail-label min-w-[7.5rem]`}>Job:</span>
        <span className={`detail-value text-right max-w-[8.75rem] [&.status]:inline-block [&.status]:[padding:0.25rem_0.75rem] [&.status]:rounded-[0.75rem] [@media(max-width:48rem)]:text-left [@media(max-width:48rem)]:max-w-[none]`}>{person.job}</span>
      </div>

      <div className={`person-detail flex justify-between items-start [padding:0.75rem_0] [@media(max-width:48rem)]:flex-col [@media(max-width:48rem)]:gap-[0.25rem]`}>
        <span className={`detail-label min-w-[7.5rem]`}>Nationality:</span>
        <span className={`detail-value text-right max-w-[8.75rem] [&.status]:inline-block [&.status]:[padding:0.25rem_0.75rem] [&.status]:rounded-[0.75rem] [@media(max-width:48rem)]:text-left [@media(max-width:48rem)]:max-w-[none]`}>{person.nationality}</span>
      </div>

      <div className={`person-detail flex justify-between items-start [padding:0.75rem_0] [@media(max-width:48rem)]:flex-col [@media(max-width:48rem)]:gap-[0.25rem]`}>
        <span className={`detail-label min-w-[7.5rem]`}>Status:</span>
        <span className={`detail-value text-right max-w-[8.75rem] [&.status]:inline-block [&.status]:[padding:0.25rem_0.75rem] [&.status]:rounded-[0.75rem] [@media(max-width:48rem)]:text-left [@media(max-width:48rem)]:max-w-[none] status ${person.maritalStatus}`}>
          {person.maritalStatus.charAt(0).toUpperCase() + person.maritalStatus.slice(1)}
        </span>
      </div>
    </div>
  );
}
