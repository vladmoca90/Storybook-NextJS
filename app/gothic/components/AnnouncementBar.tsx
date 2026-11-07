import styles from "../gothic.module.css";

export default function AnnouncementBar() {
  return (
    <div
      className={`${styles.announcement} grid h-[31px] place-items-center text-center max-[700px]:h-[27px]`}
    >
      For the beautifully strange.
    </div>
  );
}
