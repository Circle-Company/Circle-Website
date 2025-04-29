import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[10000]">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
          backgroundImage: "linear-gradient(to right, #2563eb, #3b82f6)",
          boxShadow: "0 2px 8px rgba(37, 99, 235, 0.5)",
        }}
      />
    </div>
  );
}
