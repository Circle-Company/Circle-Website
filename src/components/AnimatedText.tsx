import { useEffect, useState } from "react";

export function AnimatedText() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Making the World More Human";

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      // Velocidade de digitação aleatória para parecer mais natural
      const typingSpeed = Math.random() * 50 + 100;
      // Velocidade mais lenta para backspace
      const deletingSpeed = typingSpeed / 2;

      if (!isDeleting && currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeText, typingSpeed);
      } else if (isDeleting && currentIndex > 0) {
        setText(fullText.slice(0, currentIndex));
        currentIndex--;
        timeoutId = setTimeout(typeText, deletingSpeed);
      } else if (currentIndex === 0) {
        isDeleting = false;
        timeoutId = setTimeout(typeText, typingSpeed * 2);
      } else {
        isDeleting = true;
        timeoutId = setTimeout(typeText, 2000); // Pausa antes de começar a apagar
      }
    };

    timeoutId = setTimeout(typeText, 500); // Pequena pausa inicial

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <p
        className="text-2xl text-white font-light tracking-wider animate-glow"
        style={{
          textShadow: "0 0 15px rgba(255,255,255,0.05)",
        }}
      >
        {text}
        <span
          className={`animate-blink ml-1 ${
            text.length === fullText.length ? "opacity-0" : ""
          }`}
        >
          |
        </span>
      </p>
    </div>
  );
}
