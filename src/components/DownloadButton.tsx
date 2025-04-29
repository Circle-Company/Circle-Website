interface DownloadButtonProps {
  href: string;
  className?: string;
  size?: "small" | "medium" | "large";
}

export function DownloadButton({
  href,
  className = "",
  size = "medium",
}: DownloadButtonProps) {
  // Definir classes com base no tamanho
  const sizeClasses = {
    small: "px-5 py-2 text-sm",
    medium: "px-6 py-2.5 text-sm",
    large: "px-8 py-3.5 text-base md:text-lg",
  };

  return (
    <a
      href={href}
      className={`relative group inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-blue-500/40 hover:shadow-xl active:scale-[0.98] ${sizeClasses[size]} ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:translate-x-[-250px]"></span>
      <span className="absolute inset-0 rounded-full border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
      <span className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-70"></span>
      <span className="relative flex items-center gap-1.5 font-medium">
        Download Now
        <svg
          className={`transition-transform duration-200 group-hover:translate-x-1 ${
            size === "small"
              ? "h-3.5 w-3.5"
              : size === "medium"
              ? "h-4 w-4"
              : "h-5 w-5"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
    </a>
  );
}
