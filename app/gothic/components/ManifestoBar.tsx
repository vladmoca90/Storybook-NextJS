import styles from "../gothic.module.css";

export default function ManifestoBar() {
  return (
    <div
      className={`${styles.manifesto} flex h-[44px] items-center justify-center gap-11 border-y max-[1000px]:gap-[25px] max-[700px]:h-[42px] max-[700px]:gap-4`}
    >
      <span>GOTHIC BY NATURE.</span>
      <i>/</i>
      <span>NOT JUST FOR HALLOWEEN.</span>
      <i>/</i>
      <span>MADE TO BE DIFFERENT.</span>
    </div>
  );
}
