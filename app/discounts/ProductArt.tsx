import type { ProductArtwork } from "../data/types/products";

export function ProductArt({
  type,
  accent,
}: {
  type: ProductArtwork;
  accent: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const art = {
    headphones: (
      <>
        <path {...common} d="M35 86V70a45 45 0 0 1 90 0v16" />
        <rect {...common} x="25" y="78" width="24" height="42" rx="10" />
        <rect {...common} x="111" y="78" width="24" height="42" rx="10" />
      </>
    ),
    lamp: (
      <>
        <path {...common} d="M44 67h72L98 28H62L44 67Z" />
        <path {...common} d="M80 67v55M56 122h48" />
        <circle cx="80" cy="48" r="7" fill={accent} />
      </>
    ),
    camera: (
      <>
        <rect {...common} x="27" y="47" width="106" height="72" rx="14" />
        <path {...common} d="m49 47 10-14h42l10 14" />
        <circle {...common} cx="80" cy="83" r="24" />
        <circle cx="118" cy="61" r="5" fill={accent} />
      </>
    ),
    sneakers: (
      <>
        <path
          {...common}
          d="M26 97c20-2 32-15 39-42 17 20 33 30 55 35 10 2 16 9 16 18v7H30c-8 0-10-13-4-18Z"
        />
        <path {...common} d="M59 76h32M52 88h47" />
      </>
    ),
    watch: (
      <>
        <path {...common} d="m64 43 6-20h20l6 20M64 117l6 20h20l6-20" />
        <rect {...common} x="49" y="40" width="62" height="80" rx="22" />
        <circle {...common} cx="80" cy="80" r="22" />
        <path {...common} d="M80 65v17l12 7" />
      </>
    ),
    kettle: (
      <>
        <path {...common} d="M50 56h59l9 63H43l7-63Z" />
        <path
          {...common}
          d="M55 56c2-19 48-19 50 0M109 66c25 0 33 35 9 43M43 68 22 82l24 8"
        />
        <path {...common} d="M68 42V29h24v13" />
      </>
    ),
    backpack: (
      <>
        <rect {...common} x="43" y="42" width="74" height="88" rx="20" />
        <path
          {...common}
          d="M61 42c0-21 38-21 38 0M55 83h50v34H55zM43 66H29v47h14M117 66h14v47h-14"
        />
      </>
    ),
    speaker: (
      <>
        <rect {...common} x="47" y="25" width="66" height="110" rx="18" />
        <circle {...common} cx="80" cy="91" r="27" />
        <circle {...common} cx="80" cy="51" r="9" />
        <circle cx="80" cy="91" r="8" fill={accent} />
      </>
    ),
    chair: (
      <>
        <path {...common} d="M47 26c0 0 5 55 12 71h58c9 0 15-7 15-15V58" />
        <path
          {...common}
          d="M59 97h58l-8 37M67 97l-8 37M35 62h22v35H35c-8 0-8-35 0-35Z"
        />
      </>
    ),
    bottle: (
      <>
        <path
          {...common}
          d="M66 25h28v20l9 12v66c0 8-6 13-13 13H70c-7 0-13-5-13-13V57l9-12V25Z"
        />
        <path {...common} d="M57 76h46M67 25h26" />
        <circle cx="80" cy="102" r="12" fill={accent} />
      </>
    ),
  }[type];

  return (
    <svg
      viewBox="0 0 160 160"
      role="img"
      aria-label={`${type} product illustration`}
    >
      {art}
    </svg>
  );
}
