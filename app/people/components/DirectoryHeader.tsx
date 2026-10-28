import styles from "../people.module.css";

type DirectoryHeaderProps = { title: string };

export default function DirectoryHeader({ title }: DirectoryHeaderProps) {
  return (
    <header className={`${styles.header} flex h-14 items-center gap-3 border-b-[0.0625rem] px-[max(1.5rem,5.5vw)]`}>
      <span className={`${styles.mark} size-[1.125rem] rounded-sm`} aria-hidden="true" />
      {title}
    </header>
  );
}
