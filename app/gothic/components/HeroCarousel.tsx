import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { slides } from "@/app/data/gothic";
import type { HeroCarouselProps } from "@/app/data/types/gothic";
import styles from "../gothic.module.css";

export default function HeroCarousel({ browse }: HeroCarouselProps) {
  const [slide, setSlide] = useState(0);
  const touchStart = useRef(0);
  const current = slides[slide];
  return (
    <section
      className={`${styles.hero} ${styles[current.className]} relative isolate after:absolute after:inset-0 after:-z-[1] h-[550px] overflow-hidden max-[1000px]:h-[510px] max-[700px]:h-[535px] min-[1500px]:h-[620px]`}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const delta = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 50)
          setSlide(
            (s) => (s + (delta > 0 ? 1 : slides.length - 1)) % slides.length,
          );
      }}
    >
      <div
        className={`${styles.heroPhoto} absolute inset-0 -z-[2]`}
        style={{ backgroundImage: `url("${current.image}")` }}
      />
      <div
        className={`${styles.heroContent} px-[6.3%] pt-[76px] pb-[70px] max-[1000px]:pt-20 max-[700px]:px-[7%] max-[700px]:pt-[130px] max-[700px]:pb-20 max-[700px]:text-center min-[1500px]:pt-[95px]`}
        key={slide}
        aria-live="polite"
      >
        <h1 className="mb-5 max-w-[680px] max-[700px]:mx-auto max-[700px]:max-w-[330px]">
          {current.title}
        </h1>
        <p className="mb-[23px]">{current.description}</p>
        <button
          className={`${styles.primary} inline-flex items-center justify-center gap-6 border px-[25px] py-[10px] max-[700px]:gap-5 max-[700px]:px-5 max-[700px]:py-[14px]`}
          onClick={() => browse(current.filter)}
        >
          {current.cta}
          <ArrowUpRight size={17} />
        </button>
      </div>
      <div
        className={`absolute right-[3.1%] bottom-6 left-[3.1%] flex items-center justify-between max-[700px]:right-[6%] max-[700px]:bottom-[23px] max-[700px]:left-[7%]`}
      >
        <div className={`${styles.dots} flex items-center gap-3`}>
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={slide === i ? "true" : undefined}
              className={`${slide === i ? styles.activeDot : ""} relative before:absolute before:-inset-[9px] h-[11px] w-[11px] rounded-full border p-0`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
        <div
          className={`${styles.arrows} flex items-center gap-[22px] max-[700px]:gap-[15px]`}
        >
          <button
            className="grid h-[39px] w-[39px] place-items-center rounded-full border"
            aria-label="Previous slide"
            onClick={() =>
              setSlide((s) => (s + slides.length - 1) % slides.length)
            }
          >
            <ArrowLeft size={18} />
          </button>
          <span>
            0{slide + 1} <i className="ml-1">/ 03</i>
          </span>
          <button
            className="grid h-[39px] w-[39px] place-items-center rounded-full border"
            aria-label="Next slide"
            onClick={() => setSlide((s) => (s + 1) % slides.length)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
