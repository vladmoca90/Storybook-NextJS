"use client";

export function PrintButton() {
  return (
    <button
      className="cv-print inline-flex items-center gap-[0.625rem] rounded-[0.3125rem] border-[0.0625rem] px-[1.0625rem] py-[0.4375rem] max-[43.8125rem]:px-3 max-[43.8125rem]:py-[0.3125rem]"
      onClick={() => window.print()}
    >
      <svg
        width="1.0625rem"
        height="1.0625rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M7 8V3h10v5M7 17H4V8h16v9h-3M7 14h10v7H7z" />
      </svg>
      Print CV
    </button>
  );
}
