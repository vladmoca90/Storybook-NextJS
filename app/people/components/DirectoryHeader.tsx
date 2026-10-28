import styles from "../people.module.css";

type DirectoryHeaderProps = { title: string };

export default function DirectoryHeader({ title }: DirectoryHeaderProps) {
  return (
    <header className={`${styles.header} flex h-14 items-center gap-3 border-b px-[max(24px,5.5vw)]`}>
      <span className={`${styles.mark} size-[18px] rounded-sm`} aria-hidden="true" />
      {title}
    </header>
  );
}
