"use client";

import { useEffect, useState } from "react";

export function ManifestoSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIndicators, setShowIndicators] = useState(false);

  const steps = [
    {
      id: 0,
      content: (
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-2xl md:text-5xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-0 max-w-[90%] md:max-w-full mx-auto">
            Você acha que precisamos de mais uma rede social como as outras?
          </p>
        </div>
      )
    },
    {
      id: 1,
      content: (
        <div className="text-center max-w-5xl mx-auto">
          <p className="text-2xl md:text-5xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-0 max-w-[90%] md:max-w-full mx-auto">
            <span className="bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">Com certeza não.</span>
          </p>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-2xl md:text-5xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-0 max-w-[90%] md:max-w-full mx-auto">
            As pessoas querem um lugar para se expressar sem algoritmos controladores...
          </p>
        </div>
      )
    },
    {
      id: 3,
      content: (
        <div className="text-center max-w-5xl mx-auto">
            <p className="text-2xl md:text-5xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-0 max-w-[90%] md:max-w-full mx-auto">
            Um lugar de conteúdo humano, e não feito por IA...
            </p>
        </div>
      )
    },
    {
      id: 4,
      content: (
        <div className="text-center max-w-5xl mx-auto">
            <p className="text-2xl md:text-5xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-0 max-w-[90%] md:max-w-full mx-auto">
            Por isso criamos o Circle App...
            </p>
        </div>
      )
    },
    {
        id: 5,
        content: (
          <div className="text-center max-w-5xl mx-auto">
              <p className="text-2xl md:text-5xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-0 max-w-[90%] md:max-w-full mx-auto">
              Aqui nós valorizamos...
              </p>
          </div>
        )
    },
    {
      id: 6,
      content: (
        <div className="text-center px-6 md:px-0">
          <h3 className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] max-w-[90%] md:max-w-full mx-auto">
            Amor
          </h3>
          <p className="text-5xl md:text-4xl bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent line-through font-semibold drop-shadow-[0_0_15px_rgba(156,163,175,0.4)] max-w-[90%] md:max-w-full mx-auto">
            não ódio
          </p>
        </div>
      )
    },
    {
      id: 7,
      content: (
        <div className="text-center px-6 md:px-0">
          <h3 className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] max-w-[90%] md:max-w-full mx-auto">
            Liberdade
          </h3>
          <p className="text-5xl md:text-4xl bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent line-through font-semibold drop-shadow-[0_0_15px_rgba(156,163,175,0.4)] max-w-[90%] md:max-w-full mx-auto">
            não controle
          </p>
        </div>
      )
    },
    {
      id: 8,
      content: (
        <div className="text-center px-6 md:px-0">
          <h3 className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] max-w-[90%] md:max-w-full mx-auto">
            Amizade
          </h3>
          <p className="text-5xl md:text-4xl bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent line-through font-semibold drop-shadow-[0_0_15px_rgba(156,163,175,0.4)] max-w-[90%] md:max-w-full mx-auto">
            não isolamento
          </p>
        </div>
      )
    },
    {
      id: 9,
      content: (
        <div className="text-center px-6 md:px-0">
          <h3 className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] max-w-[90%] md:max-w-full mx-auto">
            Comunidade
          </h3>
          <p className="text-5xl md:text-4xl bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent line-through font-semibold drop-shadow-[0_0_15px_rgba(156,163,175,0.4)] max-w-[90%] md:max-w-full mx-auto">
            não bolhas
          </p>
        </div>
      )
    },
    {
        id: 10,
        content: (
          <div className="text-center px-6 md:px-0">
            <h3 className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] max-w-[90%] md:max-w-full mx-auto">
              Experiência
            </h3>
            <p className="text-5xl md:text-4xl bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent line-through font-semibold drop-shadow-[0_0_15px_rgba(156,163,175,0.4)] max-w-[90%] md:max-w-full mx-auto">
              não algorítmos.
            </p>
          </div>
        )
    },
    {
        id: 11,
        content: (
          <div className="text-center max-w-5xl mx-auto">
              <p className="text-2xl font-bold md:text-5xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-0 max-w-[90%] md:max-w-full mx-auto">
              Conheça a comunidade Circle
              </p>
          </div>
        )
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('manifesto-section');
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
      const stepIndex = Math.floor(progress * steps.length);
      setCurrentStep(Math.min(stepIndex, steps.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar uma vez no mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  return (
    <section 
      id="manifesto-section"
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