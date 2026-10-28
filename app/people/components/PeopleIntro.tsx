import styles from "../people.module.css";

type PeopleIntroProps = { title: string; description: string; totalPeople: number };

export default function PeopleIntro({ title, description, totalPeople }: PeopleIntroProps) {
  return (
    <div className={`${styles.intro} mb-10 flex items-start justify-between gap-6 max-[40.0625rem]:mb-[1.625rem] max-[40.0625rem]:gap-3`}>
      <div>
        <h1 className="mt-0 mb-1">{title}</h1>
        <p className="m-0 max-[40.0625rem]:max-w-60">{description}</p>
      </div>
      <span className={`${styles.count} pt-5 whitespace-nowrap max-[40.0625rem]:pt-3`}>{totalPeople} people</span>
    </div>
  );
}
