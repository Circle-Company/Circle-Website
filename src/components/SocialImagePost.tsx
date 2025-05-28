"use client";

import { useEffect, useState } from "react";

export function SocialImagePost() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIndicators, setShowIndicators] = useState(false);

  // Definição das etapas (steps) - igual ao ManifestoSection
  const steps = [
    {
      id: 0,
      content: (
        <div className="flex items-center justify-center w-full h-full">
          <video
            src="/videos/CIRCLE_APP_MOVIE.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-[90vw] min-w-[320px] max-w-[700px] h-[80vh] min-h-[550px] max-h-[900px] sm:w-[550px] sm:max-w-[550px] md:w-[650px] md:max-w-[650px] lg:w-[750px] lg:max-w-[750px] object-contain rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] mx-auto"
          />
        </div>
      )
    },
    {
      id: 1,
      content: (
        <div className="text-center max-w-5xl font-bold mb-4 mx-auto space-y-4 font-bold mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl italic font-bold leading-[0.9] mb-10 tracking-tight font-bold mb-4 bg-gradient-to-b from-gray-200 to-gray-700 bg-clip-text text-transparent">Circle App,</h2>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[70px] font-bold leading-[0.9] tracking-tight text-neutral-200">Sua</h2>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-neutral-300">Experiência</h2>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-neutral-400">Social</h2>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-neutral-500">Reimaginada</h2>
        </div>
      )
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('social-image-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Mostrar indicadores apenas quando a seção chegar no topo da tela
      const isAtTop = rect.top <= 0 && rect.bottom > windowHeight;
      setShowIndicators(isAtTop);
      
      // Só começar a animação quando a seção estiver visível
      if (rect.top > windowHeight || rect.bottom < 0) {
        return;
      }
      
      // Calcular o progresso do scroll dentro da seção
      // Começar quando a seção entra na tela e terminar quando sai
      const scrollStart = Math.max(0, -rect.top);
      const scrollEnd = sectionHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
      
      setScrollProgress(progress);
      
      // Determinar qual step mostrar baseado no progresso
      // Distribuir os steps uniformemente ao longo do scroll
      const stepIndex = Math.floor(progress * steps.length * 1.8);
      setCurrentStep(Math.min(stepIndex, steps.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar uma vez no mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  return (
    <section 
      id="social-image-section"
      className="relative bg-black text-white"
      style={{ height: '1000vh' }} // Altura maior para scroll mais controlado
    >
      {/* Conteúdo fixo no centro */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
        <div className="container mx-auto px-4">
          {steps.map((step, index) => {
            // Calcular estado da animação para cada step
            const isActive = index === currentStep;
            const isPast = index < currentStep;
            const isFuture = index > currentStep;
            
            // Animações de entrada e saída
            let stepOpacity = 0;
            let stepScale = 0.8;
            let stepBlur = 3;
            let stepTranslateY = 20;
            
            if (isActive) {
              // Step ativo: totalmente visível
              stepOpacity = 1;
              stepScale = 1;
              stepBlur = 0;
              stepTranslateY = 0;
            } else if (isPast) {
              // Step passado: desaparece para cima
              stepOpacity = 0;
              stepScale = 0.8;
              stepBlur = 25;
              stepTranslateY = -80;
            } else if (isFuture) {
              // Step futuro: aguardando embaixo
              stepOpacity = 0;
              stepScale = 0.8;
              stepBlur = 3;
              stepTranslateY = 30;
            }
            
            return (
              <div
                key={step.id}
                className="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out"
                style={{
                  opacity: stepOpacity,
                  transform: `translateY(${stepTranslateY}px) scale(${stepScale})`,
                  filter: `blur(${stepBlur}px) brightness(${isActive ? 1 : 0.7})`,
                }}
              >
                {step.content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 