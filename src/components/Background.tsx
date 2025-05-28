import Image from "next/image";
import { useEffect, useState } from "react";

export function Background() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset / 2); // Velocidade do parallax reduzida para 0.3
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div
        className="relative w-full h-[120vh]"
        style={{
          transform: `translate3d(0, -${offset}px, 0)`,
          transition: "transform 0.05s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px]">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/emojis-background-blur.png"
              alt="Background Emojis"
              fill
              className="object-contain opacity-50"
              priority
              quality={100}
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
